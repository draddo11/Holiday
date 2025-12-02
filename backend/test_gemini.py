#!/usr/bin/env python3
"""Test script to check available Gemini models"""

import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print("❌ GEMINI_API_KEY not found in .env")
    exit(1)

print(f"✅ API Key found: {GEMINI_API_KEY[:10]}...")

genai.configure(api_key=GEMINI_API_KEY)

print("\n📋 Available Gemini models:")
print("-" * 50)

try:
    for model in genai.list_models():
        if 'generateContent' in model.supported_generation_methods:
            print(f"✅ {model.name}")
except Exception as e:
    print(f"❌ Error listing models: {e}")
    print("\nTrying common model names...")
    
    # Test common model names
    test_models = [
        'gemini-pro',
        'gemini-1.5-pro',
        'gemini-1.5-flash',
        'gemini-1.5-pro-latest',
        'models/gemini-pro',
        'models/gemini-1.5-pro',
    ]
    
    for model_name in test_models:
        try:
            model = genai.GenerativeModel(model_name)
            response = model.generate_content("Say 'test'")
            print(f"✅ {model_name} - WORKS!")
            break
        except Exception as e:
            print(f"❌ {model_name} - {str(e)[:80]}")

print("\n" + "=" * 50)
print("Use one of the working models in app.py")
