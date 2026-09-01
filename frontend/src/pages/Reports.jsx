import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

import {
  FaFilePdf,
  FaFileExcel,
  FaFileCsv,
  FaDownload,
} from "react-icons/fa";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Reports() {

  const [brand, setBrand] = useState("Apple");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // =====================================================
  // GENERATE BRAND REPORT
  // =====================================================

  const generateReport = async () => {

    if (!brand.trim()) {
      alert("Please enter a brand name.");
      return;
    }

    try {

      setLoading(true);

      const response = await api.get(
        `/analyze/${encodeURIComponent(brand.trim())}`
      );

      setResult(response.data);

    } catch (error) {

      console.error("Report Error:", error);

      alert(
        "Unable to generate report. Make sure the backend is running."
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // EXPORT PDF
  // =====================================================

  const exportPDF = () => {

    if (!result) {
      alert("Please generate a brand report first.");
      return;
    }

    const doc = new jsPDF();

    const articles = result.articles || [];

    // ---------------------------------------------------
    // TITLE
    // ---------------------------------------------------

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");

    doc.text(
      "SentinelX AI - Brand Sentiment Report",
      20,
      20
    );

    // ---------------------------------------------------
    // BRAND
    // ---------------------------------------------------

    doc.setFontSize(16);
    doc.text(
      `Brand: ${result.brand}`,
      20,
      35
    );

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      20,
      43
    );

    // ---------------------------------------------------
    // SENTIMENT SUMMARY
    // ---------------------------------------------------

    autoTable(doc, {

      startY: 52,

      head: [
        [
          "Positive",
          "Neutral",
          "Negative",
          "Reputation Score"
        ]
      ],

      body: [
        [
          `${result.positive}%`,
          `${result.neutral}%`,
          `${result.negative}%`,
          `${result.score}/100`
        ]
      ],

      theme: "grid",

    });


    // ---------------------------------------------------
    // AI SUMMARY
    // ---------------------------------------------------

    let summaryY =
      doc.lastAutoTable.finalY + 15;

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");

    doc.text(
      "AI Sentiment Insight",
      20,
      summaryY
    );

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    const summaryLines = doc.splitTextToSize(
      result.summary || "No summary available.",
      170
    );

    doc.text(
      summaryLines,
      20,
      summaryY + 8
    );


    // ---------------------------------------------------
    // ARTICLES
    // ---------------------------------------------------

    const articleStartY =
      summaryY + 8 + summaryLines.length * 5 + 10;

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");

    doc.text(
      "Latest Brand News",
      20,
      articleStartY
    );


    const tableData = articles.map((article) => {

      return [

        article.title || "",

        article.source || "",

        article.sentiment || "",

        `${article.confidence || 0}%`,

        article.publishedAt
          ? new Date(
              article.publishedAt
            ).toLocaleDateString()
          : "",

      ];

    });


    autoTable(doc, {

      startY: articleStartY + 5,

      head: [
        [
          "Article",
          "Source",
          "Sentiment",
          "Confidence",
          "Date"
        ]
      ],

      body: tableData,

      theme: "striped",

      styles: {
        fontSize: 8,
        cellPadding: 3,
      },

      columnStyles: {

        0: {
          cellWidth: 70
        },

        1: {
          cellWidth: 30
        },

        2: {
          cellWidth: 25
        },

        3: {
          cellWidth: 25
        },

        4: {
          cellWidth: 25
        },

      },

    });


    // ---------------------------------------------------
    // DOWNLOAD
    // ---------------------------------------------------

    const filename =
      `${result.brand}_Sentiment_Report.pdf`;

    doc.save(filename);

  };


  // =====================================================
  // EXPORT CSV
  // =====================================================

  const exportCSV = () => {

    if (!result) {
      alert("Please generate a brand report first.");
      return;
    }

    const articles = result.articles || [];

    const rows = [

      [
        "Title",
        "Source",
        "Sentiment",
        "Confidence",
        "Published Date",
        "URL"
      ],

      ...articles.map((article) => [

        article.title || "",

        article.source || "",

        article.sentiment || "",

        article.confidence || "",

        article.publishedAt || "",

        article.url || "",

      ])

    ];


    const csv = rows
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");


    const blob = new Blob(
      [csv],
      {
        type: "text/csv;charset=utf-8;"
      }
    );


    const url =
      URL.createObjectURL(blob);


    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `${result.brand}_Sentiment_Report.csv`;

    link.click();

    URL.revokeObjectURL(url);

  };


  // =====================================================
  // EXPORT EXCEL
  // =====================================================

  const exportExcel = () => {

    if (!result) {
      alert("Please generate a brand report first.");
      return;
    }

    const articles = result.articles || [];

    let csv =

      "Brand,Positive,Neutral,Negative,Reputation Score\n" +

      `${result.brand},${result.positive}%,${result.neutral}%,${result.negative}%,${result.score}/100\n\n` +

      "Title,Source,Sentiment,Confidence,Published Date,URL\n";


    articles.forEach((article) => {

      csv +=

        `"${(article.title || "").replace(/"/g, '""')}",` +

        `"${(article.source || "").replace(/"/g, '""')}",` +

        `"${article.sentiment || ""}",` +

        `"${article.confidence || ""}",` +

        `"${article.publishedAt || ""}",` +

        `"${article.url || ""}"\n`;

    });


    const blob = new Blob(
      [csv],
      {
        type:
          "application/vnd.ms-excel;charset=utf-8;"
      }
    );


    const url =
      URL.createObjectURL(blob);


    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `${result.brand}_Sentiment_Report.xls`;

    link.click();

    URL.revokeObjectURL(url);

  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <MainLayout>

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Reports
        </h1>

        <p className="text-gray-500 mt-2">
          Generate and export real-time sentiment analysis reports.
        </p>

      </div>


      {/* GENERATE REPORT */}

      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-2xl font-bold mb-5">
          Generate Brand Report
        </h2>


        <div className="flex gap-4">

          <input
            type="text"
            value={brand}
            onChange={(e) =>
              setBrand(e.target.value)
            }
            onKeyDown={(e) => {

              if (e.key === "Enter") {
                generateReport();
              }

            }}
            placeholder="Enter brand name"
            className="flex-1 border rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />


          <button
            onClick={generateReport}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 rounded-xl font-semibold disabled:opacity-50"
          >

            {loading
              ? "Generating..."
              : "Generate"}

          </button>

        </div>

      </div>


      {/* RESULT */}

      {result && (

        <>

          {/* SUMMARY CARD */}

          <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

            <h2 className="text-3xl font-bold mb-6">
              {result.brand}
            </h2>


            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

              <div className="bg-green-50 rounded-xl p-5">

                <p className="text-gray-500">
                  Positive
                </p>

                <p className="text-3xl font-bold text-green-600">
                  {result.positive}%
                </p>

              </div>


              <div className="bg-yellow-50 rounded-xl p-5">

                <p className="text-gray-500">
                  Neutral
                </p>

                <p className="text-3xl font-bold text-yellow-600">
                  {result.neutral}%
                </p>

              </div>


              <div className="bg-red-50 rounded-xl p-5">

                <p className="text-gray-500">
                  Negative
                </p>

                <p className="text-3xl font-bold text-red-600">
                  {result.negative}%
                </p>

              </div>


              <div className="bg-indigo-50 rounded-xl p-5">

                <p className="text-gray-500">
                  Reputation
                </p>

                <p className="text-3xl font-bold text-indigo-600">
                  {result.score}/100
                </p>

              </div>

            </div>

          </div>


          {/* EXPORT */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">


            <button
              onClick={exportPDF}
              className="bg-red-500 hover:bg-red-600 text-white rounded-2xl p-8 shadow-md transition"
            >

              <FaFilePdf className="text-5xl mx-auto mb-4"/>

              <h2 className="text-xl font-bold">
                Export PDF
              </h2>

              <p className="text-sm mt-2 opacity-90">
                Download PDF report
              </p>

            </button>


            <button
              onClick={exportExcel}
              className="bg-green-600 hover:bg-green-700 text-white rounded-2xl p-8 shadow-md transition"
            >

              <FaFileExcel className="text-5xl mx-auto mb-4"/>

              <h2 className="text-xl font-bold">
                Export Excel
              </h2>

              <p className="text-sm mt-2 opacity-90">
                Download spreadsheet
              </p>

            </button>


            <button
              onClick={exportCSV}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-8 shadow-md transition"
            >

              <FaFileCsv className="text-5xl mx-auto mb-4"/>

              <h2 className="text-xl font-bold">
                Export CSV
              </h2>

              <p className="text-sm mt-2 opacity-90">
                Download CSV data
              </p>

            </button>

          </div>


          {/* AI SUMMARY */}

          <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

            <h2 className="text-2xl font-bold mb-4">
              🤖 AI Sentiment Summary
            </h2>

            <p className="text-gray-600 leading-8">
              {result.summary}
            </p>

          </div>


          {/* REPORT HISTORY */}

          <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

            <h2 className="text-2xl font-bold mb-5">
              Report History
            </h2>


            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="border-b">

                  <tr>

                    <th className="text-left py-3">
                      Report
                    </th>

                    <th className="text-left py-3">
                      Brand
                    </th>

                    <th className="text-left py-3">
                      Articles
                    </th>

                    <th className="text-left py-3">
                      Score
                    </th>

                    <th className="text-left py-3">
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody>

                  <tr className="border-b">

                    <td className="py-4 font-semibold">
                      Current Analysis
                    </td>

                    <td>
                      {result.brand}
                    </td>

                    <td>
                      {result.articles?.length || 0}
                    </td>

                    <td className="font-bold">
                      {result.score}/100
                    </td>

                    <td className="text-green-600 font-semibold">
                      Generated
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>


          {/* ARTICLES */}

          <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

            <h2 className="text-2xl font-bold mb-5">
              Report Articles
            </h2>


            <div className="space-y-4">

              {result.articles?.map(
                (article, index) => (

                  <div
                    key={index}
                    className="border rounded-xl p-5"
                  >

                    <h3 className="font-bold text-gray-800">
                      {article.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">

                      {article.source}

                      {" • "}

                      {article.sentiment}

                      {" • Confidence "}

                      {article.confidence}%

                    </p>


                    {article.url && (

                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-indigo-600 mt-3 font-semibold"
                      >

                        Read Full Article

                        <FaDownload />

                      </a>

                    )}

                  </div>

                )
              )}

            </div>

          </div>

        </>

      )}

    </MainLayout>

  );

}

export default Reports;