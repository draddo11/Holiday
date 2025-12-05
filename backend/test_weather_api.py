#!/usr/bin/env python3
"""Test the weather scene generation endpoint"""

import requests
import json
import base64
from datetime import datetime

# Test the endpoint
url = "http://127.0.0.1:5001/generate-weather-scene"

payload = {
    "destination": "Paris",
    "temperature": "22",
    "weather_condition": "sunny",
    "season": None  # Auto-detect
}

print("Testing weather scene generation...")
print(f"Payload: {json.dumps(payload, indent=2)}")
print()

try:
    response = requests.post(url, json=payload, timeout=120)
    print(f"Status Code: {response.status_code}")
    print()
    
    if response.status_code == 200:
        data = response.json()
        print(f"Success: {data.get('success')}")
        print(f"Destination: {data.get('destination')}")
        print(f"Temperature: {data.get('temperature')}")
        print(f"Weather: {data.get('weather_condition')}")
        print(f"Season: {data.get('season')}")
        
        if data.get('image_url'):
            # Save the image
            image_data = data['image_url'].split(',')[1]  # Remove data:image/png;base64,
            image_bytes = base64.b64decode(image_data)
            
            filename = f"test_weather_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
            with open(filename, 'wb') as f:
                f.write(image_bytes)
            
            print(f"\n✅ Image saved to: {filename}")
            print(f"   Image size: {len(image_bytes)} bytes")
        else:
            print("\n❌ No image URL in response")
    else:
        print(f"Error: {response.text}")
        
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
