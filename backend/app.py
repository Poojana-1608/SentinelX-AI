from flask import Flask, jsonify
from flask_cors import CORS

from routes.analyze import analyze_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(analyze_bp)


@app.route("/")
def home():
    return jsonify({
        "message": "SentinelX AI Backend Running"
    })


if __name__ == "__main__":
    app.run(debug=True)