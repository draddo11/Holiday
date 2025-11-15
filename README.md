# TravelSnap: Fun Holiday Destination Explorer + AI Photo Placement

## Project Summary

TravelSnap is a simple, polished web application designed to inspire travel and create fun, personalized memories. It allows users to explore popular holiday destinations with quick facts and activity suggestions. Its core feature is an AI-powered photo placement tool that lets users upload their picture and virtually place themselves into famous landmark scenes with a fun pose, generating a unique "travel postcard."

## Features

### Destination Explorer
*   Browse 5 popular holiday destinations.
*   Each destination displays 3-5 places to visit, 2-4 shows/activities, and quick facts.
*   Simple UI to view destination details.

### AI Photo Placement
*   Upload a JPG/PNG image of yourself.
*   Choose from a selection of famous landmarks (e.g., Eiffel Tower, Times Square, Santorini).
*   AI generates a new image with you placed inside the chosen landmark scene, complete with a fun pose and matching lighting/background.

### How It Works
*   A dedicated section explaining the app's functionality and usage.

## Tech Stack

*   **Frontend**: HTML, CSS, JavaScript
*   **Backend**: Python (Flask)
*   **AI Integration**: Replicate API (using the `851-labs/background-remover` model)

## Setup Instructions

To get TravelSnap up and running on your local machine, follow these steps:

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Holiday # Or whatever your project directory is named
```

### 2. Backend Setup

The backend handles the AI integration with the Replicate API.

*   **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
*   **Create a `.env` file:**
    ```bash
    touch .env
    ```
*   **Add your Replicate API Token:**
    Open the newly created `.env` file and add your Replicate API token. You can obtain your token from [replicate.com/account/api-tokens](https://replicate.com/account/api-tokens).
    ```
    REPLICATE_API_TOKEN=YOUR_REPLICATE_API_TOKEN
    ```
    Replace `YOUR_REPLICATE_API_TOKEN` with your actual token.
*   **Install Python dependencies:**
    ```bash
    pip install Flask Flask-CORS replicate requests python-dotenv
    ```
*   **Run the Flask backend server:**
    ```bash
    python app.py
    ```
    The server will start on `http://127.0.0.1:5000`. Keep this terminal window open.

### 3. Frontend Setup

The frontend is a static web application.

*   **Navigate back to the project root directory:**
    ```bash
    cd ..
    ```
*   **Serve the frontend:**
    You can use a simple HTTP server to serve the `index.html` file.
    *   **Using Python's built-in HTTP server:**
        ```bash
        python -m http.server 8000
        ```
        Then, open your web browser and go to `http://localhost:8000/index.html`.
    *   **Using `live-server` (if you have Node.js installed):**
        ```bash
        npx live-server
        ```
        This will automatically open the `index.html` in your browser.

## How to Use

1.  **Explore Destinations:** On the homepage, click "Explore Destinations" or navigate to the "Destinations" section to see various holiday spots. Click "View Details" on any card to see more information (currently displayed as an alert).
2.  **Create Travel Photo:** Navigate to the "Create Travel Photo" section.
    *   Click "Upload Your Picture" to select an image of yourself (JPG or PNG).
    *   Choose a landmark from the dropdown menu.
    *   Click "Generate Travel Photo."
    *   The application will send your image and landmark choice to the backend, which uses AI to generate your personalized travel postcard.
    *   The generated image will be displayed on the page.

## Project Summary (2-3 Sentences)

TravelSnap is an engaging web application that combines a holiday destination explorer with an innovative AI photo placement feature. Users can discover popular travel spots and then upload their own photo to be seamlessly integrated into iconic landmark scenes, creating fun and shareable "travel postcards." This project showcases the creative potential of AI in personalizing digital experiences.
