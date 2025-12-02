#!/bin/bash

echo "🚀 Starting TravelSnap Backend..."
echo ""

cd backend

# Check if virtual environment exists
if [ -d "venv" ]; then
    echo "✅ Found virtual environment"
    source venv/bin/activate
elif command -v conda &> /dev/null; then
    echo "✅ Using conda environment"
    # Conda is already active
else
    echo "❌ No virtual environment found!"
    echo "Please create one with: python -m venv venv"
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found!"
    echo "Please create backend/.env with your API keys"
    exit 1
fi

echo "✅ Environment configured"
echo ""
echo "Starting Flask server on http://127.0.0.1:5001"
echo "Press Ctrl+C to stop"
echo ""

python app.py
