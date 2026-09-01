from flask import Blueprint, jsonify

from services.news_service import get_brand_news
from services.sentiment_service import analyze_sentiment
from services.summary_service import generate_summary


analyze_bp = Blueprint("analyze", __name__)


@analyze_bp.route("/analyze/<brand>", methods=["GET"])
def analyze_brand(brand):

    try:

        articles = get_brand_news(brand)

        result = analyze_sentiment(articles)

        result["brand"] = brand

        result["summary"] = generate_summary(result)

        return jsonify(result)

    except Exception as e:

        print("ANALYZE ERROR:", e)

        return jsonify({
            "brand": brand,
            "positive": 0,
            "neutral": 0,
            "negative": 0,
            "score": 0,
            "summary": "Unable to analyze this brand.",
            "articles": [],
            "error": str(e)
        }), 500