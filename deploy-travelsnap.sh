#!/bin/bash

# ============================================================================
# TravelSnap Cloud Run Deployment Script
# ============================================================================
# This script deploys your TravelSnap app to Google Cloud Run
# 
# Prerequisites:
#   1. Google Cloud SDK (gcloud) installed
#   2. backend/.env file with API keys
#   3. Authenticated with: gcloud auth login
#
# Usage:
#   ./deploy-travelsnap.sh
#
# What it does:
#   1. Validates environment and API keys
#   2. Builds Docker container with your code
#   3. Deploys to Cloud Run with environment variables
#   4. Provides live URL when complete
# ============================================================================

set -e  # Exit on any error

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║        🚀 TravelSnap Cloud Run Deployment                     ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Set project configuration
PROJECT_ID="resumehacathon"
PROJECT_NUMBER="219166804221"
REGION="us-central1"
SERVICE_NAME="travelsnap"

echo "📦 Deployment Configuration:"
echo "   ├─ Project ID:     $PROJECT_ID"
echo "   ├─ Project Number: $PROJECT_NUMBER"
echo "   ├─ Region:         $REGION"
echo "   └─ Service Name:   $SERVICE_NAME"
echo ""

# ============================================================================
# Step 1: Validate Prerequisites
# ============================================================================
echo "🔍 Step 1/5: Validating prerequisites..."
echo ""

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "   ❌ ERROR: gcloud CLI is not installed"
    echo ""
    echo "   Please install Google Cloud SDK:"
    echo "   👉 https://cloud.google.com/sdk/docs/install"
    echo ""
    exit 1
fi
echo "   ✅ gcloud CLI found"

# Set the project
echo "   🔧 Setting GCP project to: $PROJECT_ID"
gcloud config set project $PROJECT_ID > /dev/null 2>&1
echo "   ✅ Project configured"
echo ""

# ============================================================================
# Step 2: Load and Validate API Keys
# ============================================================================
echo "🔑 Step 2/5: Loading API keys from backend/.env..."
echo ""

# Check if .env file exists
if [ ! -f "backend/.env" ]; then
    echo "   ❌ ERROR: backend/.env file not found"
    echo ""
    echo "   Please create backend/.env with your API keys:"
    echo "   ┌─────────────────────────────────────────────┐"
    echo "   │ REPLICATE_API_TOKEN=your_replicate_token    │"
    echo "   │ SERPAPI_API_KEY=your_serpapi_key            │"
    echo "   │ GEMINI_API_KEY=your_gemini_key              │"
    echo "   └─────────────────────────────────────────────┘"
    echo ""
    exit 1
fi

# Load environment variables
export $(cat backend/.env | grep -v '^#' | xargs)

# Verify API keys are set
if [ -z "$REPLICATE_API_TOKEN" ] || [ -z "$SERPAPI_API_KEY" ] || [ -z "$GEMINI_API_KEY" ]; then
    echo "   ❌ ERROR: Missing required API keys in backend/.env"
    echo ""
    echo "   Required keys:"
    echo "   • REPLICATE_API_TOKEN"
    echo "   • SERPAPI_API_KEY"
    echo "   • GEMINI_API_KEY"
    echo ""
    exit 1
fi

echo "   ✅ REPLICATE_API_TOKEN loaded (${#REPLICATE_API_TOKEN} chars)"
echo "   ✅ SERPAPI_API_KEY loaded (${#SERPAPI_API_KEY} chars)"
echo "   ✅ GEMINI_API_KEY loaded (${#GEMINI_API_KEY} chars)"
echo ""

# ============================================================================
# Step 3: Enable Required Google Cloud APIs
# ============================================================================
echo "🔌 Step 3/5: Enabling required Google Cloud APIs..."
echo ""
echo "   This ensures Cloud Build, Cloud Run, and Container Registry are active."
echo ""

gcloud services enable \
    cloudbuild.googleapis.com \
    run.googleapis.com \
    containerregistry.googleapis.com \
    --project=$PROJECT_ID > /dev/null 2>&1

echo "   ✅ Cloud Build API enabled"
echo "   ✅ Cloud Run API enabled"
echo "   ✅ Container Registry API enabled"
echo ""

# ============================================================================
# Step 4: Build Docker Container and Deploy
# ============================================================================
echo "🏗️  Step 4/5: Building and deploying to Cloud Run..."
echo ""
echo "   What's happening:"
echo "   1. Building Docker container with your latest code"
echo "   2. Pushing container to Google Container Registry"
echo "   3. Deploying to Cloud Run with environment variables"
echo "   4. Configuring auto-scaling and networking"
echo ""
echo "   ⏱️  This typically takes 5-10 minutes..."
echo "   ☕ Grab a coffee while we deploy!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Build and deploy using Cloud Build
gcloud builds submit \
    --config cloudbuild.yaml \
    --substitutions=_REPLICATE_API_TOKEN="$REPLICATE_API_TOKEN",_SERPAPI_API_KEY="$SERPAPI_API_KEY",_GEMINI_API_KEY="$GEMINI_API_KEY" \
    --project=$PROJECT_ID

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ============================================================================
# Step 5: Get Service URL and Display Results
# ============================================================================
echo "🌐 Step 5/5: Retrieving service URL..."
echo ""

# Get the service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --project=$PROJECT_ID --format='value(status.url)' 2>/dev/null || echo "")

if [ -n "$SERVICE_URL" ]; then
    echo ""
    echo "╔════════════════════════════════════════════════════════════════╗"
    echo "║                                                                ║"
    echo "║                  🎉 DEPLOYMENT SUCCESSFUL! 🎉                 ║"
    echo "║                                                                ║"
    echo "╚════════════════════════════════════════════════════════════════╝"
    echo ""
    echo "🌐 Your TravelSnap app is LIVE at:"
    echo ""
    echo "   🔗 $SERVICE_URL"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "📋 What's Deployed:"
    echo "   ✅ Latest code from your repository"
    echo "   ✅ Gemini 2.0 Flash AI model"
    echo "   ✅ Performance optimizations (caching enabled)"
    echo "   ✅ All API keys configured"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "🧪 Test Your App Features:"
    echo "   • AI-Powered Itinerary Generation"
    echo "   • Real-time Flight & Hotel Prices"
    echo "   • Live Events Discovery"
    echo "   • Weather Information"
    echo "   • PDF Export"
    echo "   • Seasonal Postcards"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "📝 Useful Commands:"
    echo ""
    echo "   View live logs:"
    echo "   $ gcloud run logs tail $SERVICE_NAME --region=$REGION --project=$PROJECT_ID"
    echo ""
    echo "   Open in browser:"
    echo "   $ open $SERVICE_URL"
    echo ""
    echo "   View in Cloud Console:"
    echo "   $ open https://console.cloud.google.com/run/detail/$REGION/$SERVICE_NAME?project=$PROJECT_ID"
    echo ""
    echo "   Redeploy after changes:"
    echo "   $ ./deploy-travelsnap.sh"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
else
    echo "   ⚠️  Could not retrieve service URL automatically."
    echo ""
    echo "   Please check Cloud Console:"
    echo "   👉 https://console.cloud.google.com/run?project=$PROJECT_ID"
    echo ""
fi

echo "✨ Deployment complete! Happy travels! ✈️🌍"
echo ""
