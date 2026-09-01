from transformers import pipeline

sentiment_model = pipeline(
    "sentiment-analysis",
    model="cardiffnlp/twitter-roberta-base-sentiment-latest"
)


def analyze_sentiment(articles):

    positive = 0
    neutral = 0
    negative = 0

    analyzed_articles = []

    for article in articles:

        text = (
            article.get("title", "")
            + ". "
            + article.get("description", "")
        ).strip()

        if not text:
            continue

        try:
            result = sentiment_model(
                text[:512],
                truncation=True
            )[0]

            label = result["label"].lower()
            confidence = round(result["score"] * 100, 2)

            if "positive" in label:
                sentiment = "positive"
                positive += 1

            elif "negative" in label:
                sentiment = "negative"
                negative += 1

            else:
                sentiment = "neutral"
                neutral += 1

            analyzed_articles.append({
                "title": article.get("title", ""),
                "description": article.get("description", ""),
                "source": article.get("source", ""),
                "url": article.get("url", ""),
                "publishedAt": article.get("publishedAt", ""),
                "sentiment": sentiment,
                "confidence": confidence
            })

        except Exception as e:
            print("Sentiment Error:", e)

    total = positive + neutral + negative

    if total == 0:
        return {
            "positive": 0,
            "neutral": 0,
            "negative": 0,
            "score": 0,
            "articles": []
        }

    positive_percent = round((positive / total) * 100)
    neutral_percent = round((neutral / total) * 100)
    negative_percent = round((negative / total) * 100)

    score = round(
        positive_percent + (neutral_percent * 0.5)
    )

    return {
        "positive": positive_percent,
        "neutral": neutral_percent,
        "negative": negative_percent,
        "score": score,
        "articles": analyzed_articles
    }