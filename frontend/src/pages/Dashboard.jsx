import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/StatCard";
import PieChart from "../charts/PieChart";
import LineChart from "../charts/LineChart";
import RecommendationCard from "../components/RecommendationCard";
import api from "../services/api";

import {
  FaChartLine,
  FaSmile,
  FaFrown,
  FaStar,
  FaSyncAlt,
} from "react-icons/fa";

function Dashboard() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/analyze/Apple");

      console.log("Dashboard Data:", response.data);

      setResult(response.data);
    } catch (err) {
      console.error("Dashboard API Error:", err);
      setError("Unable to load live dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const getStatus = (score) => {
    if (score >= 80) {
      return {
        text: "Excellent",
        color: "text-green-600",
      };
    }

    if (score >= 60) {
      return {
        text: "Moderate",
        color: "text-yellow-600",
      };
    }

    return {
      text: "Needs Attention",
      color: "text-red-600",
    };
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-5xl mb-4">🤖</div>

            <p className="text-gray-600 text-lg">
              Fetching real-time brand intelligence...
            </p>

            <p className="text-gray-400 text-sm mt-2">
              NewsAPI + AI Sentiment Analysis
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !result) {
    return (
      <MainLayout>
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">

          <div className="text-5xl mb-4">
            ⚠️
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Dashboard Data Unavailable
          </h2>

          <p className="text-gray-500 mt-2">
            {error || "Unable to retrieve brand analysis."}
          </p>

          <button
            onClick={loadDashboard}
            className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            Try Again
          </button>

        </div>
      </MainLayout>
    );
  }

  const articleCount = result.articles?.length || 0;

  const status = getStatus(result.score);

  return (
    <MainLayout>

      {/* HEADER */}

      <div className="flex justify-between items-start mb-8">

        <div>

          <h1 className="text-4xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Monitor customer sentiment, brand reputation and AI insights
            in real time.
          </p>

        </div>

        <button
          onClick={loadDashboard}
          disabled={loading}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
        >
          <FaSyncAlt />
          Refresh
        </button>

      </div>


      {/* CURRENT BRAND */}

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6 mb-8">

        <p className="text-indigo-100 text-sm">
          LIVE BRAND ANALYSIS
        </p>

        <h2 className="text-3xl font-bold mt-1">
          {result.brand}
        </h2>

        <p className="text-indigo-100 mt-2">
          Analyzed {articleCount} latest relevant news articles using AI
          sentiment analysis.
        </p>

      </div>


      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Articles Analyzed"
          value={articleCount}
          icon={<FaChartLine />}
          color="bg-indigo-100 text-indigo-600"
          trend="Live"
          positive={true}
        />

        <StatCard
          title="Positive Sentiment"
          value={`${result.positive}%`}
          icon={<FaSmile />}
          color="bg-green-100 text-green-600"
          trend="AI analyzed"
          positive={true}
        />

        <StatCard
          title="Negative Sentiment"
          value={`${result.negative}%`}
          icon={<FaFrown />}
          color="bg-red-100 text-red-600"
          trend="AI analyzed"
          positive={result.negative < 30}
        />

        <StatCard
          title="Reputation Score"
          value={`${result.score}/100`}
          icon={<FaStar />}
          color="bg-yellow-100 text-yellow-600"
          trend={status.text}
          positive={result.score >= 60}
        />

      </div>


      {/* CHARTS */}

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


      {/* AI INSIGHT */}

      <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

        <h2 className="text-2xl font-bold mb-4">
          🤖 AI Brand Insight
        </h2>

        <p className="text-gray-600 leading-8">
          {result.summary}
        </p>

      </div>


      {/* RECOMMENDATIONS */}

      <div className="mt-8">

        <RecommendationCard />

      </div>


      {/* RECENT ANALYSIS */}

      <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

        <div className="flex justify-between items-center mb-5">

          <div>

            <h2 className="text-2xl font-bold">
              Recent Brand Analysis
            </h2>

            <p className="text-gray-500 mt-1">
              Latest real-time sentiment analysis
            </p>

          </div>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
            ● Live
          </span>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  Brand
                </th>

                <th className="text-left py-3">
                  Positive
                </th>

                <th className="text-left py-3">
                  Neutral
                </th>

                <th className="text-left py-3">
                  Negative
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

              <tr className="border-b hover:bg-gray-50">

                <td className="py-4 font-bold">
                  {result.brand}
                </td>

                <td className="text-green-600 font-semibold">
                  {result.positive}%
                </td>

                <td className="text-yellow-600 font-semibold">
                  {result.neutral}%
                </td>

                <td className="text-red-600 font-semibold">
                  {result.negative}%
                </td>

                <td className="font-bold">
                  {result.score}/100
                </td>

                <td className={`font-semibold ${status.color}`}>
                  {status.text}
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>


      {/* LATEST NEWS */}

      <div className="bg-white rounded-2xl shadow-md p-6 mt-8 mb-8">

        <div className="flex justify-between items-center mb-5">

          <div>

            <h2 className="text-2xl font-bold">
              Latest Brand News
            </h2>

            <p className="text-gray-500 mt-1">
              AI-analyzed news related to {result.brand}
            </p>

          </div>

          <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold">
            {articleCount} Articles
          </span>

        </div>


        <div className="space-y-4">

          {result.articles?.slice(0, 5).map((article, index) => (

            <div
              key={index}
              className="border rounded-xl p-4 hover:shadow-md transition"
            >

              <div className="flex justify-between gap-4">

                <div className="flex-1">

                  <h3 className="font-bold text-gray-800">
                    {article.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    {article.source}
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(
                      article.publishedAt
                    ).toLocaleDateString()}
                  </p>

                </div>


                <span
                  className={`h-fit px-3 py-1 rounded-full text-sm font-semibold ${
                    article.sentiment === "positive"
                      ? "bg-green-100 text-green-700"
                      : article.sentiment === "negative"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {article.sentiment}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </MainLayout>
  );
}

export default Dashboard;