# TravelSnap 🌍✈️

**AI-Powered Trip Planning with Shareable Postcards**

TravelSnap is an intelligent travel planning application that generates personalized itineraries using real-time data and creates beautiful, shareable postcards of your trips.

## ✨ Features

### 🤖 AI Trip Planning
- **Gemini AI Integration**: Intelligent itinerary generation
- **Real Flight Prices**: Live data from SerpAPI
- **Local Events**: Discover what's happening at your destination
- **Weather Integration**: Current conditions and forecasts
- **Budget Optimization**: Smart cost breakdown and recommendations

### 🎨 Seasonal Postcards
- **3D Flip Animation**: Interactive postcard with front and back
- **Seasonal Themes**: Halloween, Christmas, Summer, Spring, and Classic
- **Real Destination Photos**: High-quality images from Unsplash
- **Landmark Emojis**: Iconic landmarks for major cities
- **Download as PNG**: Share on social media

### 🌤️ 3D Weather Cards
- **AI-Generated Scenes**: Isometric 3D weather visualizations
- **Destination-Specific**: Customized for each location
- **Temperature & Conditions**: Real-time weather data
- **Shareable**: Download and share your weather cards

### 🎯 Smart Features
- **Surprise Me**: Random destination generator
- **Custom Destinations**: Plan trips to anywhere
- **Detailed Itineraries**: Day-by-day activities with costs
- **Packing Lists**: AI-generated recommendations
- **Travel Tips**: Local insights and advice

## 🚀 Tech Stack

### Frontend
- **React** with Vite
- **Material-UI (MUI)** for components
- **html2canvas** for image generation
- **Axios** for API calls

### Backend
- **Flask** (Python)
- **Google Gemini AI** for trip planning
- **SerpAPI** for flight prices and events
- **Replicate** for AI image generation
- **Unsplash** for destination photos

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- API Keys:
  - Google Gemini API
  - SerpAPI
  - Replicate (optional, for AI images)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/travelsnap.git
cd travelsnap
```

2. **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Add your API keys to .env
```

3. **Frontend Setup**
```bash
cd travelsnap-react
npm install
```

### Running the Application

1. **Start the Backend**
```bash
cd backend
source venv/bin/activate
python app.py
```
Backend runs on `http://localhost:5001`

2. **Start the Frontend**
```bash
cd travelsnap-react
npm run dev
```
Frontend runs on `http://localhost:5173`

3. **Open in Browser**
Navigate to `http://localhost:5173`

## 🔑 Environment Variables

Create a `backend/.env` file with:

```env
GEMINI_API_KEY=your_gemini_api_key
SERPAPI_API_KEY=your_serpapi_key
REPLICATE_API_TOKEN=your_replicate_token  # Optional
```

## 📁 Project Structure

```
travelsnap/
├── backend/                 # Flask backend
│   ├── app.py              # Main application
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables (not in git)
├── travelsnap-react/       # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── theme/         # Design tokens
│   ├── public/            # Static assets
│   └── package.json       # Node dependencies
├── .gitignore
└── README.md
```

## 🎯 Usage

1. **Plan a Trip**
   - Enter your destination
   - Set your budget and duration
   - Select your interests
   - Click "Generate AI Itinerary"

2. **Create a Postcard**
   - After generating an itinerary
   - Click "Create Postcard"
   - Choose a seasonal theme
   - Click to flip and see the back
   - Download as PNG

3. **Generate Weather Card**
   - Click "3D Weather Card"
   - AI generates an isometric scene
   - Download and share

## 🌟 Key Features Explained

### AI Trip Planning
Uses Google Gemini to analyze your preferences and create optimized itineraries with:
- Day-by-day activities
- Cost breakdowns
- Meal recommendations
- Travel tips
- Packing lists

### Real Data Integration
- **Flights**: Live prices from major airlines
- **Events**: Concerts, sports, festivals happening during your trip
- **Weather**: Current conditions and forecasts

### Shareable Postcards
- Beautiful designs with real destination photos
- Seasonal themes for year-round engagement
- 3D flip animation for interactive experience
- Instagram-ready quality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google Gemini AI for intelligent trip planning
- SerpAPI for real-time travel data
- Unsplash for beautiful destination photos
- Material-UI for the component library

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ for travelers who want to plan smarter and share better**
