import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ComparisonChart from "../charts/ComparisonChart";
import api from "../services/api";

import {
  FaTrophy,
  FaArrowUp,
  FaArrowDown,
  FaBalanceScale,
} from "react-icons/fa";

function Comparison() {
  const [brand1, setBrand1] = useState("Apple");
  const [brand2, setBrand2] = useState("Samsung");

  const [result1, setResult1] = useState(null);
  const [result2, setResult2] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const compareBrands = async () => {
    if (!brand1.trim() || !brand2.trim()) {
      setError("Please enter both brand names.");
      return;
    }

    if (brand1.trim().toLowerCase() === brand2.trim().toLowerCase()) {
      setError("Please enter two different brands.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const [response1, response2] = await Promise.all([
        api.get(`/analyze/${encodeURIComponent(brand1.trim())}`),
        api.get(`/analyze/${encodeURIComponent(brand2.trim())}`),
      ]);

      setResult1(response1.data);
      setResult2(response2.data);

    } catch (error) {
      console.error("Comparison Error:", error);
      setError("Unable to compare brands. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const getWinner = () => {
    if (!result1 || !result2) return null;

    if (result1.score > result2.score) {
      return result1;
    }

    if (result2.score > result1.score) {
      return result2;
    }

    return null;
  };

  const winner = getWinner();

  return (
    <MainLayout>

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
          <FaBalanceScale className="text-indigo-600" />
          Brand Comparison
        </h1>

        <p className="text-gray-500 mt-2">
          Compare customer sentiment and reputation between two brands.
        </p>

      </div>


      {/* SEARCH */}
      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-xl font-semibold mb-4">
          Compare Brands
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            value={brand1}
            onChange={(e) => setBrand1(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                compareBrands();
              }
            }}
            placeholder="Brand 1 (Apple)"
            className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            value={brand2}
            onChange={(e) => setBrand2(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                compareBrands();
              }
            }}
            placeholder="Brand 2 (Samsung)"
            className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={compareBrands}
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Comparing..." : "Compare"}
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

          <div className="text-5xl mb-4">
            🤖
          </div>

          <p className="text-gray-600">
            Fetching latest news and comparing both brands...
          </p>

        </div>
      )}


      {/* RESULTS */}
      {result1 && result2 && !loading && (

        <>

          {/* COMPARISON CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">


            {/* BRAND 1 */}
            <div className="bg-white rounded-2xl shadow-md p-6">

              <div className="flex justify-between items-center mb-5">

                <h2 className="text-2xl font-bold">
                  {result1.brand}
                </h2>

                {result1.score >= result2.score && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Leading
                  </span>
                )}

              </div>

              <p className="mb-4">
                Reputation Score:
                <span className="font-bold text-indigo-600 ml-2">
                  {result1.score}/100
                </span>
              </p>

              <p className="mb-4">
                Positive:
                <span className="font-bold text-green-600 ml-2">
                  {result1.positive}%
                </span>
              </p>

              <p className="mb-4">
                Neutral:
                <span className="font-bold text-yellow-600 ml-2">
                  {result1.neutral}%
                </span>
              </p>

              <p>
                Negative:
                <span className="font-bold text-red-600 ml-2">
                  {result1.negative}%
                </span>
              </p>

            </div>


            {/* BRAND 2 */}
            <div className="bg-white rounded-2xl shadow-md p-6">

              <div className="flex justify-between items-center mb-5">

                <h2 className="text-2xl font-bold">
                  {result2.brand}
                </h2>

                {result2.score >= result1.score && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Leading
                  </span>
                )}

              </div>

              <p className="mb-4">
                Reputation Score:
                <span className="font-bold text-indigo-600 ml-2">
                  {result2.score}/100
                </span>
              </p>

              <p className="mb-4">
                Positive:
                <span className="font-bold text-green-600 ml-2">
                  {result2.positive}%
                </span>
              </p>

              <p className="mb-4">
                Neutral:
                <span className="font-bold text-yellow-600 ml-2">
                  {result2.neutral}%
                </span>
              </p>

              <p>
                Negative:
                <span className="font-bold text-red-600 ml-2">
                  {result2.negative}%
                </span>
              </p>

            </div>

          </div>


          {/* CHART */}
          <div className="mt-8">

            <ComparisonChart
              brand1={result1.brand}
              brand2={result2.brand}
              positive1={result1.positive}
              positive2={result2.positive}
              neutral1={result1.neutral}
              neutral2={result2.neutral}
              negative1={result1.negative}
              negative2={result2.negative}
              score1={result1.score}
              score2={result2.score}
            />

          </div>


          {/* WINNER */}
          <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

            <h2 className="text-2xl font-bold flex items-center gap-3 mb-5">

              <FaTrophy className="text-yellow-500" />

              AI Comparison Result

            </h2>


            {winner ? (

              <div>

                <p className="text-lg text-gray-700">

                  <FaArrowUp className="inline text-green-600 mr-2" />

                  <strong>{winner.brand}</strong> currently has the higher
                  reputation score with{" "}
                  <strong>{winner.score}/100</strong>.

                </p>


                <p className="text-gray-600 mt-4">

                  {winner.brand} has{" "}
                  <strong>{winner.positive}%</strong> positive sentiment
                  across the analyzed news articles.

                </p>

              </div>

            ) : (

              <p className="text-gray-600">
                Both brands currently have the same reputation score.
              </p>

            )}

          </div>


          {/* SUMMARY COMPARISON */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

            <div className="bg-green-50 rounded-2xl p-6">

              <h3 className="font-bold text-lg text-green-700 mb-3">
                {result1.brand} Insight
              </h3>

              <p className="text-gray-700">
                {result1.summary}
              </p>

            </div>


            <div className="bg-indigo-50 rounded-2xl p-6">

              <h3 className="font-bold text-lg text-indigo-700 mb-3">
                {result2.brand} Insight
              </h3>

              <p className="text-gray-700">
                {result2.summary}
              </p>

            </div>

          </div>

        </>

      )}

    </MainLayout>
  );
}

export default Comparison;