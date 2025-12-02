#!/bin/bash

# TravelSnap Cloud Run Deployment Script
# This script deploys the application to Google Cloud Run

set -e

echo "🚀 TravelSnap Cloud Run Deployment"
echo "===================================="

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Error: gcloud CLI is not installed"
    echo "Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Set project ID
PROJECT_ID="resumehacathon"
echo "Setting GCP project to: $PROJECT_ID"
gcloud config set project $PROJECT_ID

echo "📦 Project: $PROJECT_ID"

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
export $(cat backend/.env | grep -v '^#' | xargs)

# Set region
REGION="us-central1"
SERVICE_NAME="travelsnap"

echo ""
echo "🔧 Configuration:"
echo "  Region: $REGION"
echo "  Service: $SERVICE_NAME"
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
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format='value(status.url)' 2>/dev/null || echo "")

if [ -n "$SERVICE_URL" ]; then
    echo "🌐 Your app is live at:"
    echo "   $SERVICE_URL"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Visit your app in a browser"
    echo "   2. Test the postcard generation features"
    echo "   3. Monitor logs: gcloud run logs tail $SERVICE_NAME --region=$REGION"
else
    echo "⚠️  Could not retrieve service URL. Check Cloud Console:"
    echo "   https://console.cloud.google.com/run?project=$PROJECT_ID"
fi

echo ""
echo "🎉 Done!"
