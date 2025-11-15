from flask import Flask, request, jsonify
from flask_cors import CORS
import replicate
import os
import base64
import requests
from dotenv import load_dotenv


load_dotenv() # Load environment variables from .env file

app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}}) # Allow all origins for debugging - this might not be working as expected

REPLICATE_API_TOKEN = os.getenv("REPLICATE_API_TOKEN")
SERPAPI_API_KEY = os.getenv("SERPAPI_API_KEY")

if not REPLICATE_API_TOKEN:
    raise ValueError("REPLICATE_API_TOKEN environment variable not set.")
if not SERPAPI_API_KEY:
    raise ValueError("SERPAPI_API_KEY environment variable not set.")

# Initialize Replicate client
os.environ["REPLICATE_API_TOKEN"] = REPLICATE_API_TOKEN

# Placeholder for landmark background images
LANDMARK_BACKGROUNDS = {
    "eiffel-tower": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Eiffel_Tower_from_Champs_de_Mars%2C_Paris_July_2023.jpg/800px-Eiffel_Tower_from_Champs_de_Mars%2C_Paris_July_2023.jpg",
    "times-square": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Times_Square_by_David_Shankbone%2C_Sept_2009.jpg/800px-Times_Square_by_David_Shankbone%2C_Sept_2009.jpg",
    "santorini": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Santorini_Oia_Sunset.jpg/800px-Santorini_Oia_Sunset.jpg",
}

def get_image_as_base64_data_uri(image_url):
    """Fetches an image from a URL and converts it to a base64 data URI."""
    try:
        response = requests.get(image_url)
        response.raise_for_status()
        content_type = response.headers['Content-Type']
        encoded_string = base64.b64encode(response.content).decode("utf-8")
        return f"data:{content_type};base64,{encoded_string}"
    except requests.exceptions.RequestException as e:
        print(f"Error fetching image from {image_url}: {e}")
        return None

@app.after_request
def after_request(response):
    # Allow all origins in development environment
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add(
        "Access-Control-Allow-Headers", "Content-Type,Authorization"
    )
    response.headers.add(
        "Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS"
    )
    return response

@app.route('/search-location-image', methods=['GET'])
def search_location_image():
    location = request.args.get('location')
    if not location:
        return jsonify({"error": "Missing location parameter"}), 400

    try:
        # Construct the SerpAPI URL for Google Images
        serpapi_url = "https://serpapi.com/search"
        params = {
            "q": f"{location} landmark",
            "tbm": "isch",  # Image search
            "ijn": "0",     # First page of results
            "api_key": SERPAPI_API_KEY
        }
        response = requests.get(serpapi_url, params=params)
        response.raise_for_status()  # Raise an exception for HTTP errors

        results = response.json()
        if "images_results" in results and len(results["images_results"]) > 0:
            image_url = results["images_results"][0]["original"]
            return jsonify({"imageUrl": image_url}), 200
        else:
            return jsonify({"error": "No image results found for the location."}), 404
    except requests.exceptions.RequestException as e:
        print(f"Error communicating with SerpAPI: {e}")
        return jsonify({"error": f"Failed to search for image (network error): {str(e)}"}), 500
    except Exception as e:
        print(f"Error searching for image: {e}")
        return jsonify({"error": f"Failed to find image: {str(e)}"}), 500

@app.route('/generate-travel-photo', methods=['POST'])
def generate_travel_photo():
    data = request.json
    user_image_base64 = data.get('userImage')
    landmark_id = data.get('landmarkId')
    background_image_url = data.get('backgroundImageUrl')

    if not user_image_base64:
        return jsonify({"error": "Missing user image"}), 400

    if not landmark_id and not background_image_url:
        return jsonify({"error": "Missing landmarkId or backgroundImageUrl"}), 400

    if background_image_url:
        background_url = background_image_url
    else:
        background_url = LANDMARK_BACKGROUNDS.get(landmark_id)
        if not background_url:
            return jsonify({"error": "Invalid landmark ID"}), 400

    landmark_background_base64 = get_image_as_base64_data_uri(background_url)
    if not landmark_background_base64:
        return jsonify({"error": "Could not fetch background image"}), 500

    try:
        output = replicate.run(
            "851-labs/background-remover:8b27177f326f073504ad023879497504576f666775211717107735f7862a051a",
            input={
                "image": user_image_base64,
                "background_type": landmark_background_base64
            }
        )
        if output:
            return jsonify({"generatedImageUrl": output}), 200
        else:
            return jsonify({"error": "Replicate API did not return an image URL"}), 500
    except Exception as e:
        print(f"Error calling Replicate API: {e}")
        return jsonify({"error": f"Failed to generate image: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
