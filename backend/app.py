from flask import Flask, request, jsonify
from flask_cors import CORS
import replicate
import os
import base64
import requests
from dotenv import load_dotenv
from PIL import Image, ImageOps
import io
import time


import logging
load_dotenv() # Load environment variables from .env file

app = Flask(__name__)
CORS(app) # Allow all origins for debugging

logging.basicConfig(level=logging.DEBUG)

@app.before_request
def log_request_info():
    print(f"Incoming request: {request.method} {request.path}")

REPLICATE_API_TOKEN = os.getenv("REPLICATE_API_TOKEN")
SERPAPI_API_KEY = os.getenv("SERPAPI_API_KEY")

if not REPLICATE_API_TOKEN:
    raise ValueError("REPLICATE_API_TOKEN environment variable not set.")
if not SERPAPI_API_KEY:
    raise ValueError("SERPAPI_API_KEY environment variable not set.")

# Initialize Replicate client
os.environ["REPLICATE_API_TOKEN"] = REPLICATE_API_TOKEN

# Rate limiting for Replicate API
LAST_REPLICATE_CALL_TIME = 0
REPLICATE_RATE_LIMIT_SECONDS = 10 # 6 requests per minute = 1 request every 10 seconds

# Placeholder for landmark background images
LANDMARK_BACKGROUNDS = {
    "eiffel-tower": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Eiffel_Tower_from_Champs_de_Mars%2C_Paris_July_2023.jpg/800px-Eiffel_Tower_from_Champs_de_Mars%2C_Paris_July_2023.jpg",
    "times-square": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Times_Square_by_David_Shankbone%2C_Sept_2009.jpg/800px-Times_Square_by_David_Shankbone%2C_Sept_2009.jpg",
    "santorini": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Santorini_Oia_Sunset.jpg/800px-Santorini_Oia_Sunset.jpg",
}

def get_image_as_base64_data_uri(image_url):
    """Fetches an image from a URL and converts it to a base64 data URI."""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(image_url, headers=headers)
        response.raise_for_status()
        content_type = response.headers['Content-Type']
        encoded_string = base64.b64encode(response.content).decode("utf-8")
        return f"data:{content_type};base64,{encoded_string}"
    except requests.exceptions.RequestException as e:
        print(f"Error fetching image from {image_url}: {e}")
        return None

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
            print(f"SerpAPI image_url: {image_url}")
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
    global LAST_REPLICATE_CALL_TIME

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

    try:
        # Enforce Replicate API rate limit
        time_since_last_call = time.time() - LAST_REPLICATE_CALL_TIME
        if time_since_last_call < REPLICATE_RATE_LIMIT_SECONDS:
            sleep_duration = REPLICATE_RATE_LIMIT_SECONDS - time_since_last_call
            print(f"Rate limit: Sleeping for {sleep_duration:.2f} seconds...")
            time.sleep(sleep_duration)
        LAST_REPLICATE_CALL_TIME = time.time()

        # 1. Remove background from user image
        print("Removing background from user image...")
        foreground_url = replicate.run(
            "briaai/RMBG-1.4:7a32e5e6934a95a444b836e6590233d4a04347183531343493249493ad54361b",
            input={"image": user_image_base64}
        )
        print(f"Foreground URL: {foreground_url}")

        # 2. Download foreground and background images
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        foreground_response = requests.get(foreground_url, headers=headers)
        foreground_response.raise_for_status()
        foreground_image = Image.open(io.BytesIO(foreground_response.content)).convert("RGBA")

        background_response = requests.get(background_url, headers=headers)
        background_response.raise_for_status()
        background_image = Image.open(io.BytesIO(background_response.content)).convert("RGBA")

        # 3. Composite images
        print("Compositing images...")
        bg_width, bg_height = background_image.size
        
        # Resize foreground to be 70% of background height, maintaining aspect ratio
        fg_height = int(bg_height * 0.7)
        fg_width = int(foreground_image.width * (fg_height / foreground_image.height))
        foreground_resized = foreground_image.resize((fg_width, fg_height), Image.LANCZOS)

        # Center the foreground
        paste_x = (bg_width - fg_width) // 2
        paste_y = (bg_height - fg_height) // 2

        # Create a new blank image to paste onto, to handle alpha channels correctly
        composite_image = Image.new("RGBA", background_image.size)
        composite_image.paste(background_image, (0, 0))
        composite_image.paste(foreground_resized, (paste_x, paste_y), foreground_resized)

        # 4. Encode final image to base64
        buffered = io.BytesIO()
        composite_image.save(buffered, format="PNG")
        final_image_base64 = "data:image/png;base64," + base64.b64encode(buffered.getvalue()).decode("utf-8")

        return jsonify({"generatedImageUrl": final_image_base64}), 200

    except Exception as e:
        print(f"Error generating travel photo: {e}")
        return jsonify({"error": f"Failed to generate image: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)