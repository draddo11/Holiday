# TravelSnap - Quick Start Guide for Cloud Run

Deploy your TravelSnap app to Google Cloud Run in 5 minutes!

## Prerequisites

- Google Cloud account with billing enabled
- gcloud CLI installed
- API keys in `backend/.env`

## Deploy in 3 Steps

### 1. Setup Google Cloud

```bash
# Login
gcloud auth login

# Set your project (replace with your project ID)
gcloud config set project YOUR_PROJECT_ID

# Enable required APIs
gcloud services enable cloudbuild.googleapis.com run.googleapis.com
```

### 2. Deploy

```bash
# Run the deployment script
./deploy.sh
```

That's it! The script will:
- ✅ Build your Docker container
- ✅ Deploy to Cloud Run
- ✅ Configure environment variables
- ✅ Give you the live URL

### 3. Test

Visit the URL provided by the deployment script and test:
- 📸 AI Photo Generation
- ✈️ Flight & Hotel Prices
- 🎭 Live Events
- 🗺️ AI Itinerary Planner

## What Gets Deployed?

- **Frontend**: React app (built and optimized)
- **Backend**: Flask API with all endpoints
- **Configuration**: 2GB RAM, 2 CPUs, 300s timeout
- **Cost**: ~$0 for low traffic (Cloud Run free tier)

## Troubleshooting

### Build fails?
```bash
# Check build logs
gcloud builds list --limit 5
```

### App not working?
```bash
# Check logs
gcloud run logs tail travelsnap --region us-central1
```

### Need to update?
```bash
# Just run deploy again
./deploy.sh
```

## Next Steps

- 📊 Monitor usage in [Cloud Console](https://console.cloud.google.com/run)
- 🔒 Set up custom domain
- 📈 Configure auto-scaling
- 💰 Review costs

## Support

Full documentation: See `DEPLOYMENT.md`

---

**Estimated deployment time**: 5-10 minutes
**Estimated cost**: Free tier covers most personal use
