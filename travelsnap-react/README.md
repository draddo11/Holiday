# TravelSnap - AI-Powered Travel Photo Generator

A modern web application that combines destination exploration with AI-powered photo placement, featuring Material Design 3 and Apple-inspired UI/UX.

## ✨ Features

### Core Features
- **Destination Explorer**: Browse 6+ curated travel destinations with detailed information
- **AI Photo Placement**: Upload your photo and place yourself in famous landmarks using AI
- **Live Flight Prices**: Real-time flight price estimates (Economy, Premium, Business class)
- **Live Events & Concerts**: Current shows, concerts, festivals, and events at each destination
- **How It Works**: Step-by-step guide for using the application

### Design
- Material Design 3 components with Apple-inspired aesthetics
- Responsive layout for mobile and desktop
- Smooth animations and transitions
- Frosted glass navigation with backdrop blur
- Clean, minimalistic color palette

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- API Keys:
  - Replicate API Token (for AI image generation)
  - SerpAPI Key (for location image search)
  - Google Gemini API Key (for flight prices and events)

### Installation

1. **Frontend Setup**
```bash
cd travelsnap-react
npm install
npm run dev
```

The app will run on `http://localhost:5174`

2. **Backend Setup**
```bash
cd backend
pip install -r requirements.txt

# Create .env file with your API keys:
# REPLICATE_API_TOKEN=your_token_here
# SERPAPI_API_KEY=your_key_here
# GEMINI_API_KEY=your_key_here

python3 app.py
```

The backend will run on `http://localhost:5001`

## 🎨 Tech Stack

### Frontend
- React 19.2
- Material-UI (MUI) 5
- React Router 6
- Axios
- Vite

### Backend
- Flask
- Replicate AI
- Google Generative AI (Gemini)
- SerpAPI
- PIL (Python Imaging Library)

## 📱 Pages

1. **Home**: Hero section with call-to-action buttons
2. **Destinations**: Grid of destination cards with detailed modals
3. **AI Photo**: Upload interface and landmark selector
4. **How It Works**: Step-by-step instructions

## 🌟 New Global Features

### Live Flight Prices
- Real-time price estimates for Economy, Premium, and Business class
- Customizable origin location
- Displayed in destination details modal

### Live Events & Concerts
- Current and upcoming events at each destination
- Categorized by type (concerts, shows, festivals, sports, theater)
- Venue and date information
- Brief descriptions

## 🔧 API Endpoints

### Backend API
- `GET /get-flight-prices?destination=<name>&origin=<city>` - Get flight prices
- `GET /get-live-events?destination=<name>` - Get live events
- `POST /generate-travel-photo` - Generate AI travel photo
- `GET /search-location-image?location=<name>` - Search for location images

## 📝 Environment Variables

### Backend (.env)
```
REPLICATE_API_TOKEN=your_replicate_token
SERPAPI_API_KEY=your_serpapi_key
GEMINI_API_KEY=your_gemini_api_key
```

## 🎯 Future Enhancements
- Save/share generated images
- User accounts and favorites
- More landmarks and destinations
- Advanced AI pose variations
- Social media integration

## 📄 License
MIT License

## 👥 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
