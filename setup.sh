#!/bin/bash

echo "🚀 Setting up TravelSnap..."

# Backend setup
echo "📦 Setting up backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  Creating .env file from example..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env and add your API keys!"
fi

cd ..

# Frontend setup
echo "📦 Setting up frontend..."
cd travelsnap-react
npm install

cd ..

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env and add your API keys"
echo "2. Run ./START_BACKEND.sh to start the backend"
echo "3. In another terminal, run: cd travelsnap-react && npm run dev"
echo "4. Open http://localhost:5173 in your browser"
