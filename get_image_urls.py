import os
from serpapi.google_search import GoogleSearch
from dotenv import load_dotenv

load_dotenv()

SERPAPI_API_KEY = os.getenv("SERPAPI_API_KEY")

if not SERPAPI_API_KEY:
    raise ValueError("SERPAPI_API_KEY environment variable not set.")

destinations = ["Paris", "Tokyo", "Santorini", "New York", "Sydney"]

for dest in destinations:
    params = {
        "q": f"{dest} landmark",
        "tbm": "isch",
        "ijn": "0",
        "api_key": SERPAPI_API_KEY
    }
    search = GoogleSearch(params)
    results = search.get_dict()
    image_url = results["images_results"][0]["original"]
    print(f'"{dest}": "{image_url}",')
