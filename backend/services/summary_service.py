def generate_summary(result):

    positive = result.get("positive", 0)
    neutral = result.get("neutral", 0)
    negative = result.get("negative", 0)

    if positive >= 70:

        return (
            "Customer sentiment is highly positive. "
            "The brand is receiving strong positive attention "
            "and should continue building on this momentum."
        )

    if positive >= 50:

        return (
            "Customer sentiment is generally positive. "
            "Customers are responding well to the brand, "
            "although some areas can still be improved."
        )

    if negative >= 50:

        return (
            "Customer sentiment is largely negative. "
            "The brand should investigate customer concerns "
            "and address the main negative issues."
        )

    if negative > positive:

        return (
            "Customer sentiment shows some negative concerns. "
            "The brand should monitor feedback and address "
            "the main issues affecting customers."
        )

    return (
        "Customer sentiment is mixed. "
        "The brand should continue monitoring customer feedback "
        "and identify opportunities for improvement."
    )