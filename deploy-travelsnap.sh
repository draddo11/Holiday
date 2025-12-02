#!/bin/bash

# TravelSnap Cloud Run Deployment Script
# Project: gen-lang-client-0613158115

set -e

echo "🚀 TravelSnap Cloud Run Deployment"
echo "===================================="
echo ""

# Set project configuration
PROJECT_ID="resumehacathon"
PROJECT_NUMBER="219166804221"
REGION="us-central1"
SERVICE_NAME="travelsnap"

echo "📦 Configuration:"
echo "  Project ID: $PROJECT_ID"
echo "  Project Number: $PROJECT_NUMBER"
echo "  Region: $REGION"
echo "  Service: $SERVICE_NAME"
echo ""

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Error: gcloud CLI is not installed"
    echo "Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Set the project
echo "🔧 Setting GCP project..."
gcloud config set project $PROJECT_ID

# Check if .env file exists
if [ ! -f "backend/.env" ]; then
    echo "❌ Error: backend/.env file not found"
    echo "Please create it with your API keys:"
    echo "  REPLICATE_API_TOKEN=your_token"
    echo "  SERPAPI_API_KEY=your_key"
    echo "  GEMINI_API_KEY=your_key"
    exit 1
fi

# Load environment variables
echo "📋 Loading environment variables..."
export $(cat backend/.env | grep -v '^#' | xargs)

# Verify API keys are set
if [ -z "$REPLICATE_API_TOKEN" ] || [ -z "$SERPAPI_API_KEY" ] || [ -z "$GEMINI_API_KEY" ]; then
    echo "❌ Error: Missing API keys in backend/.env"
    echo "Required: REPLICATE_API_TOKEN, SERPAPI_API_KEY, GEMINI_API_KEY"
    exit 1
fi

echo "✅ API keys loaded"
echo ""

# Enable required APIs
echo "📋 Enabling required Google Cloud APIs..."
gcloud services enable \
    cloudbuild.googleapis.com \
    run.googleapis.com \
    containerregistry.googleapis.com \
    --project=$PROJECT_ID

echo ""
echo "🏗️  Building and deploying to Cloud Run..."
echo "This may take 5-10 minutes..."
echo ""

# Build and deploy using Cloud Build
gcloud builds submit \
    --config cloudbuild.yaml \
    --substitutions=_REPLICATE_API_TOKEN="$REPLICATE_API_TOKEN",_SERPAPI_API_KEY="$SERPAPI_API_KEY",_GEMINI_API_KEY="$GEMINI_API_KEY" \
    --project=$PROJECT_ID

echo ""
echo "✅ Deployment complete!"
echo ""

# Get the service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --project=$PROJECT_ID --format='value(status.url)' 2>/dev/null || echo "")

if [ -n "$SERVICE_URL" ]; then
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🌐 Your TravelSnap app is live at:"
    echo ""
    echo "   $SERVICE_URL"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "📝 Useful commands:"
    echo ""
    echo "  View logs:"
    echo "    gcloud run logs tail $SERVICE_NAME --region=$REGION --project=$PROJECT_ID"
    echo ""
    echo "  Open in browser:"
    echo "    open $SERVICE_URL"
    echo ""
    echo "  View in Cloud Console:"
    echo "    https://console.cloud.google.com/run/detail/$REGION/$SERVICE_NAME?project=$PROJECT_ID"
    echo ""
else
    echo "⚠️  Could not retrieve service URL. Check Cloud Console:"
    echo "   https://console.cloud.google.com/run?project=$PROJECT_ID"
fi

echo "🎉 Deployment successful!"
echo ""
echo "Test your app features:"
echo "  ✅ AI Photo Generation"
echo "  ✅ Flight & Hotel Prices"
echo "  ✅ Live Events"
echo "  ✅ AI Itinerary Planner"
echo "  ✅ Weather Information"
echo ""
