#!/usr/bin/env python3
"""Test Gemini image generation for 3D weather scenes"""

import google.generativeai as genai
import os
from dotenv import load_dotenv
import base64

load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

# Test parameters
destination = "Paris"
temperature = "22"
weather_condition = "sunny"

# Create prompt
prompt = f"""Professional isometric 3D miniature diorama of {destination} at {temperature}°C with {weather_condition} weather.

STYLE: "Nano Banana Pro" ultra-detailed isometric 3D render:
- Perfect 30-degree isometric perspective
- Miniature diorama style with incredible detail
- Smooth gradients and professional lighting
- Vibrant saturated colors with depth
- Tiny intricate details on buildings and landscape
- Soft shadows and ambient occlusion
- Clean polished 3D render quality

SCENE:
- Iconic {destination} landmarks in miniature
- Bright sun, clear blue sky, warm golden lighting
- Temperature indicator showing {temperature}°C
- Tiny people, cars, trees for scale
- Water features, parks, plazas
- Professional architectural visualization quality

TECHNICAL:
- Isometric 3D render, NOT flat illustration
- High detail miniature world aesthetic
- Smooth surfaces with realistic materials
- Professional lighting with soft shadows
- Vibrant color palette
- 1024x1024 resolution
- Photorealistic 3D rendering style

Premium 3D architectural visualization or high-end video game asset."""

print(f"Testing image generation for {destination}...")
print(f"Prompt: {prompt[:200]}...")
print()

# Try nano-banana-pro-preview first
try:
    print("Trying nano-banana-pro-preview model...")
    model = genai.GenerativeModel('nano-banana-pro-preview')
    response = model.generate_content(prompt)
    
    # Check response
    if hasattr(response, 'candidates') and len(response.candidates) > 0:
        candidate = response.candidates[0]
        if hasattr(candidate, 'content') and hasattr(candidate.content, 'parts'):
            for part in candidate.content.parts:
                if hasattr(part, 'inline_data'):
                    print("✅ Image generated successfully with nano-banana-pro!")
                    print(f"   MIME type: {part.inline_data.mime_type}")
                    print(f"   Data size: {len(part.inline_data.data)} bytes")
                    
                    # Save to file
                    with open('test_weather_nano.png', 'wb') as f:
                        f.write(part.inline_data.data)
                    print("   Saved to: test_weather_nano.png")
                    exit(0)
                elif hasattr(part, 'text'):
                    print(f"   Text response: {part.text[:200]}")
    
    print("❌ No image in response from nano-banana-pro")
    
except Exception as e:
    print(f"❌ Error with nano-banana-pro: {e}")

# Try gemini-2.5-flash-image
try:
    print("\nTrying gemini-2.5-flash-image model...")
    model = genai.GenerativeModel('gemini-2.5-flash-image')
    response = model.generate_content(prompt)
    
    # Check response
    if hasattr(response, 'candidates') and len(response.candidates) > 0:
        candidate = response.candidates[0]
        if hasattr(candidate, 'content') and hasattr(candidate.content, 'parts'):
            for part in candidate.content.parts:
                if hasattr(part, 'inline_data'):
                    print("✅ Image generated successfully with gemini-2.5-flash-image!")
                    print(f"   MIME type: {part.inline_data.mime_type}")
                    print(f"   Data size: {len(part.inline_data.data)} bytes")
                    
                    # Save to file
                    with open('test_weather_flash.png', 'wb') as f:
                        f.write(part.inline_data.data)
                    print("   Saved to: test_weather_flash.png")
                    exit(0)
                elif hasattr(part, 'text'):
                    print(f"   Text response: {part.text[:200]}")
    
    print("❌ No image in response from gemini-2.5-flash-image")
    
except Exception as e:
    print(f"❌ Error with gemini-2.5-flash-image: {e}")

# Try gemini-2.0-flash-exp-image-generation
try:
    print("\nTrying gemini-2.0-flash-exp-image-generation model...")
    model = genai.GenerativeModel('gemini-2.0-flash-exp-image-generation')
    response = model.generate_content(prompt)
    
    # Check response
    if hasattr(response, 'candidates') and len(response.candidates) > 0:
        candidate = response.candidates[0]
        if hasattr(candidate, 'content') and hasattr(candidate.content, 'parts'):
            for part in candidate.content.parts:
                if hasattr(part, 'inline_data'):
                    print("✅ Image generated successfully with gemini-2.0-flash-exp-image-generation!")
                    print(f"   MIME type: {part.inline_data.mime_type}")
                    print(f"   Data size: {len(part.inline_data.data)} bytes")
                    
                    # Save to file
                    with open('test_weather_exp.png', 'wb') as f:
                        f.write(part.inline_data.data)
                    print("   Saved to: test_weather_exp.png")
                    exit(0)
                elif hasattr(part, 'text'):
                    print(f"   Text response: {part.text[:200]}")
    
    print("❌ No image in response from gemini-2.0-flash-exp-image-generation")
    
except Exception as e:
    print(f"❌ Error with gemini-2.0-flash-exp-image-generation: {e}")

print("\n❌ All image generation attempts failed")
print("   Falling back to Replicate SDXL is recommended")
