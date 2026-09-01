import os
import re
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("NEWS_API_KEY")


def get_brand_news(brand):

    if not API_KEY:
        print("ERROR: NEWS_API_KEY not found")
        return []

    brand = brand.strip()

    if not brand:
        return []

    url = "https://newsapi.org/v2/everything"

    params = {
        "q": f'"{brand}"',
        "language": "en",
        "sortBy": "publishedAt",
        "pageSize": 50,
        "apiKey": API_KEY
    }

    try:

        response = requests.get(
            url,
            params=params,
            timeout=15
        )

        print("NewsAPI Status:", response.status_code)

        data = response.json()

        if response.status_code != 200:
            print("NewsAPI Error:", data)
            return []

        articles = []

        brand_lower = brand.lower()

        # =====================================================
        # BRAND-SPECIFIC TERMS
        # =====================================================

        brand_terms = {

            "apple": [
                "apple inc",
                "apple",
                "iphone",
                "ipad",
                "macbook",
                "apple watch",
                "airpods",
                "tim cook",
                "apple pay",
                "apple tv",
                "apple silicon",
                "magsafe",
                "icloud",
                "app store"
            ],

            "samsung": [
                "samsung",
                "galaxy",
                "galaxy s",
                "galaxy z",
                "galaxy watch",
                "galaxy buds",
                "one ui"
            ],

            "nike": [
                "nike",
                "nike inc",
                "air jordan",
                "jordan brand",
                "nike shoes",
                "nike running"
            ],

            "amazon": [
                "amazon",
                "amazon prime",
                "aws",
                "amazon web services",
                "amazon.com",
                "jeff bezos",
                "andy jassy",
                "alexa"
            ],

            "tesla": [
                "tesla",
                "tesla motors",
                "elon musk",
                "model 3",
                "model y",
                "cybertruck",
                "model s",
                "model x"
            ],

            "microsoft": [
                "microsoft",
                "windows",
                "xbox",
                "azure",
                "microsoft 365",
                "copilot",
                "satya nadella"
            ],

            "google": [
                "google",
                "alphabet inc",
                "android",
                "pixel",
                "google cloud",
                "gemini",
                "sundar pichai",
                "google search"
            ],

            "meta": [
                "meta platforms",
                "meta",
                "facebook",
                "instagram",
                "whatsapp",
                "threads",
                "mark zuckerberg"
            ],

            "adidas": [
                "adidas",
                "adidas originals",
                "yeezy"
            ],

            "netflix": [
                "netflix",
                "netflix inc",
                "netflix streaming"
            ],

            "coca cola": [
                "coca-cola",
                "coca cola",
                "coca cola company"
            ],

            "pepsi": [
                "pepsi",
                "pepsico",
                "pepsi cola"
            ],

            "mcdonalds": [
                "mcdonald's",
                "mcdonalds",
                "mcdonald"
            ]
        }

        # =====================================================
        # TERMS THAT SHOULD NOT COUNT AS BRAND NEWS
        # =====================================================

        excluded_terms = {

            "apple": [
                "apple cider",
                "apple cider vinegar",
                "apple juice",
                "apple pie",
                "apple fruit",
                "apple orchard",
                "apple tree",
                "apple sauce",
                "applesauce",
                "apples"
            ],

            "amazon": [
                "amazon rainforest",
                "amazon river",
                "amazon jungle"
            ]
        }

        # =====================================================
        # SELECT TERMS
        # =====================================================

        terms = brand_terms.get(
            brand_lower,
            [brand_lower]
        )

        # =====================================================
        # CREATE WORD-SAFE PATTERNS
        # =====================================================

        patterns = []

        for term in terms:

            pattern = re.compile(
                r"\b" + re.escape(term) + r"\b",
                re.IGNORECASE
            )

            patterns.append(pattern)

        # =====================================================
        # PROCESS NEWS ARTICLES
        # =====================================================

        for article in data.get("articles", []):

            title = article.get("title") or ""
            description = article.get("description") or ""

            if not title:
                continue

            # -------------------------------------------------
            # Remove HTML
            # -------------------------------------------------

            clean_description = re.sub(
                r"<[^>]+>",
                " ",
                description
            )

            # -------------------------------------------------
            # Clean whitespace
            # -------------------------------------------------

            clean_description = re.sub(
                r"\s+",
                " ",
                clean_description
            ).strip()

            title_lower = title.lower()
            description_lower = clean_description.lower()

            full_text = (
                title_lower
                + " "
                + description_lower
            )

            # =================================================
            # EXCLUDE UNRELATED MEANINGS
            # =================================================

            if brand_lower in excluded_terms:

                should_exclude = False

                for excluded in excluded_terms[brand_lower]:

                    if excluded in full_text:

                        # Only exclude if the actual
                        # company/product term is not
                        # present in the title.

                        if not any(
                            pattern.search(title)
                            for pattern in patterns
                        ):

                            should_exclude = True
                            break

                if should_exclude:
                    continue

            # =================================================
            # CALCULATE RELEVANCE
            # =================================================

            relevance_score = 0

            for pattern in patterns:

                # Brand/product appears in title
                if pattern.search(title):

                    relevance_score += 3

                # Brand/product appears in description
                elif pattern.search(clean_description):

                    relevance_score += 1

            # =================================================
            # REQUIRE STRONG RELEVANCE
            # =================================================

            if relevance_score < 3:
                continue

            # =================================================
            # ARTICLE URL
            # =================================================

            article_url = article.get("url", "")

            if not article_url:
                continue

            # =================================================
            # REMOVE DUPLICATES
            # =================================================

            duplicate = any(
                existing["url"] == article_url
                for existing in articles
            )

            if duplicate:
                continue

            # =================================================
            # SAVE ARTICLE
            # =================================================

            articles.append({

                "title": title,

                "description": clean_description,

                "source": article.get(
                    "source",
                    {}
                ).get("name", ""),

                "url": article_url,

                "publishedAt": article.get(
                    "publishedAt",
                    ""
                )
            })

            # =================================================
            # MAXIMUM 10 ARTICLES
            # =================================================

            if len(articles) >= 10:
                break

        print(
            f"Relevant articles collected for {brand}: "
            f"{len(articles)}"
        )

        return articles

    except requests.exceptions.RequestException as e:

        print("NewsAPI Request Error:", e)

        return []

    except Exception as e:

        print("NewsAPI Exception:", e)

        return []