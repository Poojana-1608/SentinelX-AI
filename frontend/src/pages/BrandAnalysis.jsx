import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import PieChart from "../charts/PieChart";
import LineChart from "../charts/LineChart";
import api from "../services/api";

import {
  FaSearch,
  FaSmile,
  FaMeh,
  FaFrown,
  FaChartBar,
  FaRobot,
  FaExternalLinkAlt,
} from "react-icons/fa";

function BrandAnalysis() {

  const [brand, setBrand] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeBrand = async () => {

    if (!brand.trim()) {
      setError("Please enter a brand name.");
      return;
    }

    try {

      setLoading(true);
      setError("");

      const response = await api.get(
        `/analyze/${encodeURIComponent(brand.trim())}`
      );

      setResult(response.data);

    } catch (err) {

      console.error(err);
      setError("Unable to analyze this brand. Please try again.");

    } finally {

      setLoading(false);

    }
  };

  return (

    <MainLayout>

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Brand Analysis
        </h1>

        <p className="text-gray-500 mt-2">
          Analyze real-time brand news and AI-powered sentiment.
        </p>

      </div>


      {/* SEARCH */}

      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-xl font-semibold mb-4">
          Search Brand
        </h2>

        <div className="flex gap-4">

          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                analyzeBrand();
              }
            }}
            placeholder="Enter brand name (Apple, Samsung, Nike...)"
            className="flex-1 border rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={analyzeBrand}
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 rounded-xl flex items-center gap-2 hover:scale-105 transition disabled:opacity-50"
          >

            <FaSearch />

            {loading ? "Analyzing..." : "Analyze"}

          </button>

        </div>

        {error && (
          <p className="text-red-500 mt-3">
            {error}
          </p>
        )}

      </div>


      {/* LOADING */}

      {loading && (

        <div className="bg-white rounded-2xl shadow-md p-8 mt-8 text-center">

          <div className="text-4xl mb-3">
            🤖
          </div>

          <p className="text-gray-600">
            Fetching latest news and analyzing sentiment...
          </p>

        </div>

      )}


      {/* RESULTS */}

      {result && !loading && (

        <>

          {/* BRAND TITLE */}

          <div className="mt-8 mb-5">

            <h2 className="text-3xl font-bold text-gray-800">
              {result.brand} Analysis
            </h2>

            <p className="text-gray-500 mt-1">
              Based on latest available news articles
            </p>

          </div>


          {/* SENTIMENT CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">


            {/* POSITIVE */}

            <div className="bg-green-50 rounded-2xl shadow p-6">

              <FaSmile className="text-4xl text-green-600 mb-3" />

              <h3 className="font-semibold">
                Positive
              </h3>

              <p className="text-4xl font-bold mt-2 text-green-700">
                {result.positive}%
              </p>

            </div>


            {/* NEUTRAL */}

            <div className="bg-yellow-50 rounded-2xl shadow p-6">

              <FaMeh className="text-4xl text-yellow-500 mb-3" />

              <h3 className="font-semibold">
                Neutral
              </h3>

              <p className="text-4xl font-bold mt-2 text-yellow-700">
                {result.neutral}%
              </p>

            </div>


            {/* NEGATIVE */}

            <div className="bg-red-50 rounded-2xl shadow p-6">

              <FaFrown className="text-4xl text-red-600 mb-3" />

              <h3 className="font-semibold">
                Negative
              </h3>

              <p className="text-4xl font-bold mt-2 text-red-700">
                {result.negative}%
              </p>

            </div>


            {/* REPUTATION */}

            <div className="bg-indigo-50 rounded-2xl shadow p-6">

              <FaChartBar className="text-4xl text-indigo-600 mb-3" />

              <h3 className="font-semibold">
                Reputation Score
              </h3>

              <p className="text-4xl font-bold mt-2 text-indigo-700">
                {result.score}/100
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Overall brand reputation
              </p>

            </div>

          </div>


          {/* DYNAMIC CHARTS */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

            <PieChart
              positive={result.positive}
              negative={result.negative}
              neutral={result.neutral}
            />

            <LineChart
              score={result.score}
            />

          </div>


          {/* AI SUMMARY */}

          <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

            <h2 className="text-2xl font-bold flex items-center gap-3 mb-4">

              <FaRobot className="text-indigo-600" />

              AI Sentiment Summary

            </h2>

            <p className="text-gray-600 leading-8">
              {result.summary}
            </p>

          </div>


          {/* REAL ARTICLES */}

          <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

            <div className="flex justify-between items-center mb-6">

              <div>

                <h2 className="text-2xl font-bold">
                  Latest Brand News
                </h2>

                <p className="text-gray-500 mt-1">
                  AI-analyzed articles related to {result.brand}
                </p>

              </div>

              <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold">
                {result.articles?.length || 0} Articles
              </span>

            </div>


            {/* ARTICLES */}

            <div className="space-y-5">

              {result.articles?.map((article, index) => (

                <div
                  key={index}
                  className="border rounded-xl p-5 hover:shadow-md transition"
                >

                  <div className="flex justify-between gap-4">

                    <div className="flex-1">

                      <h3 className="text-lg font-bold text-gray-800">
                        {article.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-2">

                        {article.source}

                        {" • "}

                        {new Date(
                          article.publishedAt
                        ).toLocaleDateString()}

                      </p>

                      <p className="text-gray-600 mt-3 leading-7">
                        {article.description}
                      </p>

                    </div>


                    {/* SENTIMENT */}

                    <div className="text-right min-w-[110px]">

                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          article.sentiment === "positive"
                            ? "bg-green-100 text-green-700"
                            : article.sentiment === "negative"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {article.sentiment}
                      </span>

                      <p className="text-sm text-gray-500 mt-3">
                        Confidence
                      </p>

                      <p className="font-bold text-indigo-600">
                        {article.confidence}%
                      </p>

                    </div>

                  </div>


                  {/* ARTICLE LINK */}

                  <div className="mt-4">

                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800"
                    >

                      Read Full Article

                      <FaExternalLinkAlt className="text-sm" />

                    </a>

                  </div>

                </div>

              ))}

            </div>


            {/* NO ARTICLES */}

            {(!result.articles ||
              result.articles.length === 0) && (

              <div className="text-center py-10 text-gray-500">
                No relevant articles found for this brand.
              </div>

            )}

          </div>

        </>

      )}

    </MainLayout>

  );
}

export default BrandAnalysis;  