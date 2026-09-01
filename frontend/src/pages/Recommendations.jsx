import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

import {
  FaSmile,
  FaMeh,
  FaFrown,
  FaStar,
  FaLightbulb,
  FaCheckCircle,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";

function Recommendations() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/analyze/Apple");

        setResult(response.data);
      } catch (err) {
        console.error("Recommendation API Error:", err);
        setError("Unable to load recommendations.");
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-5xl mb-4">🤖</div>

            <p className="text-gray-600 text-lg">
              Generating AI recommendations...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !result) {
    return (
      <MainLayout>
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <p className="text-red-500">
            {error || "Unable to load recommendations."}
          </p>
        </div>
      </MainLayout>
    );
  }

  const positive = result.positive || 0;
  const neutral = result.neutral || 0;
  const negative = result.negative || 0;
  const score = result.score || 0;

  const recommendations = [];

  // Positive sentiment
  if (positive >= 60) {
    recommendations.push({
      title: "Build on Positive Sentiment",
      icon: <FaSmile />,
      color: "text-green-600",
      bg: "bg-green-50",
      text: `${result.brand} is receiving strong positive attention. Continue investing in successful products, customer experiences and brand initiatives.`,
    });
  } else {
    recommendations.push({
      title: "Improve Customer Sentiment",
      icon: <FaLightbulb />,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      text: `${result.brand} should focus on improving customer experiences and addressing the main factors contributing to neutral and negative sentiment.`,
    });
  }

  // Negative sentiment
  if (negative <= 10) {
    recommendations.push({
      title: "Maintain Low Negative Sentiment",
      icon: <FaCheckCircle />,
      color: "text-green-600",
      bg: "bg-green-50",
      text: `Negative sentiment is currently only ${negative}%. Continue monitoring customer feedback to maintain this positive position.`,
    });
  } else {
    recommendations.push({
      title: "Reduce Negative Sentiment",
      icon: <FaFrown />,
      color: "text-red-600",
      bg: "bg-red-50",
      text: `Negative sentiment is currently ${negative}%. Identify the major customer concerns and take action to address them.`,
    });
  }

  // Neutral sentiment
  if (neutral >= 40) {
    recommendations.push({
      title: "Increase Customer Engagement",
      icon: <FaUsers />,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      text: `Neutral sentiment is ${neutral}%. Improve customer engagement through product improvements, useful content and responsive support.`,
    });
  } else {
    recommendations.push({
      title: "Strengthen Customer Engagement",
      icon: <FaUsers />,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      text: `Continue engaging customers and maintaining strong communication to improve overall brand sentiment.`,
    });
  }

  // Reputation
  if (score >= 80) {
    recommendations.push({
      title: "Protect Brand Reputation",
      icon: <FaShieldAlt />,
      color: "text-green-600",
      bg: "bg-green-50",
      text: `The current reputation score is ${score}/100. Maintain strong customer experiences and monitor emerging issues before they affect reputation.`,
    });
  } else if (score >= 60) {
    recommendations.push({
      title: "Improve Brand Reputation",
      icon: <FaStar />,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      text: `The current reputation score is ${score}/100. Focus on improving customer satisfaction and reducing negative experiences.`,
    });
  } else {
    recommendations.push({
      title: "Urgent Reputation Improvement",
      icon: <FaShieldAlt />,
      color: "text-red-600",
      bg: "bg-red-50",
      text: `The current reputation score is ${score}/100. Immediate attention should be given to customer complaints and negative brand experiences.`,
    });
  }

  return (
    <MainLayout>

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          AI Recommendations
        </h1>

        <p className="text-slate-500 mt-2">
          Smart business suggestions generated from customer sentiment.
        </p>

      </div>


      {/* BRAND SUMMARY */}

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6 mb-8">

        <p className="text-indigo-100 text-sm">
          Recommendations for
        </p>

        <h2 className="text-3xl font-bold mt-1">
          {result.brand}
        </h2>

      </div>


      {/* SENTIMENT SUMMARY */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-green-50 rounded-2xl shadow-md p-6">

          <FaSmile className="text-4xl text-green-600 mb-3" />

          <h3 className="font-semibold">
            Positive
          </h3>

          <p className="text-3xl font-bold text-green-700 mt-2">
            {positive}%
          </p>

        </div>


        <div className="bg-yellow-50 rounded-2xl shadow-md p-6">

          <FaMeh className="text-4xl text-yellow-500 mb-3" />

          <h3 className="font-semibold">
            Neutral
          </h3>

          <p className="text-3xl font-bold text-yellow-700 mt-2">
            {neutral}%
          </p>

        </div>


        <div className="bg-red-50 rounded-2xl shadow-md p-6">

          <FaFrown className="text-4xl text-red-600 mb-3" />

          <h3 className="font-semibold">
            Negative
          </h3>

          <p className="text-3xl font-bold text-red-700 mt-2">
            {negative}%
          </p>

        </div>


        <div className="bg-indigo-50 rounded-2xl shadow-md p-6">

          <FaStar className="text-4xl text-indigo-600 mb-3" />

          <h3 className="font-semibold">
            Reputation
          </h3>

          <p className="text-3xl font-bold text-indigo-700 mt-2">
            {score}/100
          </p>

        </div>

      </div>


      {/* AI INSIGHT */}

      <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

        <h2 className="text-2xl font-bold mb-4">
          🤖 AI Sentiment Insight
        </h2>

        <p className="text-gray-600 leading-8">
          {result.summary}
        </p>

      </div>


      {/* RECOMMENDATIONS */}

      <div className="mt-8">

        <h2 className="text-2xl font-bold mb-5">
          AI Recommendations
        </h2>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {recommendations.map((recommendation, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >

              <div
                className={`w-14 h-14 rounded-xl ${recommendation.bg} flex items-center justify-center mb-5`}
              >

                <span
                  className={`text-2xl ${recommendation.color}`}
                >
                  {recommendation.icon}
                </span>

              </div>


              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {recommendation.title}
              </h3>


              <p className="text-gray-600 leading-7">
                {recommendation.text}
              </p>

            </div>

          ))}

        </div>

      </div>

    </MainLayout>
  );
}

export default Recommendations;