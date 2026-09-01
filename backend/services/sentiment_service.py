from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer


# Lightweight NLP sentiment analyzer
sentiment_analyzer = SentimentIntensityAnalyzer()


def analyze_sentiment(articles):

    positive = 0
    neutral = 0
    negative = 0

    analyzed_articles = []

    for article in articles:

        title = article.get("title", "")
        description = article.get("description", "")

        text = (
            title
            + ". "
            + description
        ).strip()

        if not text:
            continue

        try:

            scores = sentiment_analyzer.polarity_scores(text)

            compound = scores["compound"]

            # -----------------------------------------
            # SENTIMENT CLASSIFICATION
            # -----------------------------------------

            if compound >= 0.05:

                sentiment = "positive"
                positive += 1

            elif compound <= -0.05:

                sentiment = "negative"
                negative += 1

            else:

                sentiment = "neutral"
                neutral += 1

            # -----------------------------------------
            # CONFIDENCE
            # -----------------------------------------

            confidence = round(
                max(
                    scores["pos"],
                    scores["neu"],
                    scores["neg"]
                ) * 100,
                2
            )

            analyzed_articles.append({

                "title": title,

                "description": description,

                "source": article.get(
                    "source",
                    ""
                ),

                "url": article.get(
                    "url",
                    ""
                ),

                "publishedAt": article.get(
                    "publishedAt",
                    ""
                ),

                "sentiment": sentiment,

                "confidence": confidence

            })

        except Exception as e:

            print(
                "Sentiment Error:",
                e
            )

    # ---------------------------------------------
    # CALCULATE TOTAL
    # ---------------------------------------------

    total = (
        positive
        + neutral
        + negative
    )

    if total == 0:

        return {

            "positive": 0,

            "neutral": 0,

            "negative": 0,

            "score": 0,

            "articles": []

        }

    # ---------------------------------------------
    # PERCENTAGES
    # ---------------------------------------------

    positive_percent = round(
        (positive / total) * 100
    )

    neutral_percent = round(
        (neutral / total) * 100
    )

    negative_percent = round(
        (negative / total) * 100
    )

    # ---------------------------------------------
    # REPUTATION SCORE
    #
    # Positive = 100%
    # Neutral  = 50%
    # Negative = 0%
    # ---------------------------------------------

    score = round(
        positive_percent
        + (neutral_percent * 0.5)
    )

    # ---------------------------------------------
    # RETURN RESULT
    # ---------------------------------------------

    return {

        "positive": positive_percent,

        "neutral": neutral_percent,

        "negative": negative_percent,

        "score": score,

        "articles": analyzed_articles

    }