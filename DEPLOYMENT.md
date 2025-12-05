# 🚀 TravelSnap Deployment Guide

## Quick Deploy to Google Cloud Run

### Prerequisites

1. **Google Cloud SDK** installed
   ```bash
   # Check if installed
   gcloud --version
   
   # If not installed, get it from:
   # https://cloud.google.com/sdk/docs/install
   ```

2. **Authenticated with Google Cloud**
   ```bash
   gcloud auth login
   ```

3. **API Keys configured** in `backend/.env`
   ```env
   REPLICATE_API_TOKEN=your_replicate_token
   SERPAPI_API_KEY=your_serpapi_key
   GEMINI_API_KEY=your_gemini_key
   ```

### Deploy Command

Simply run:

```bash
./deploy-travelsnap.sh
```

### What Happens During Deployment

The script will:

1. ✅ **Validate prerequisites** - Check gcloud CLI and project setup
2. ✅ **Load API keys** - Read from `backend/.env` file
3. ✅ **Enable Google Cloud APIs** - Cloud Build, Cloud Run, Container Registry
4. ✅ **Build Docker container** - Package your app with all dependencies
5. ✅ **Deploy to Cloud Run** - Push container and configure service
6. ✅ **Provide live URL** - Your app will be accessible immediately

### Deployment Time

- **First deployment**: ~8-10 minutes
- **Subsequent deployments**: ~5-7 minutes

### After Deployment

Your app will be live at:
```
https://travelsnap-dxz44lrhia-uc.a.run.app
```

### Useful Commands

**View live logs:**
```bash
gcloud run logs tail travelsnap --region=us-central1 --project=resumehacathon
```

**Open app in browser:**
```bash
open https://travelsnap-dxz44lrhia-uc.a.run.app
```

**View in Cloud Console:**
```bash
open https://console.cloud.google.com/run/detail/us-central1/travelsnap?project=resumehacathon
```

**Redeploy after code changes:**
```bash
git add .
git commit -m "Your changes"
git push origin main
./deploy-travelsnap.sh
```

### Troubleshooting

**Error: "gcloud: command not found"**
- Install Google Cloud SDK: https://cloud.google.com/sdk/docs/install

**Error: "backend/.env file not found"**
- Create `backend/.env` with your API keys (see Prerequisites)

**Error: "Missing API keys"**
- Ensure all three API keys are in `backend/.env`:
  - REPLICATE_API_TOKEN
  - SERPAPI_API_KEY
  - GEMINI_API_KEY

**Error: "Permission denied"**
- Make script executable: `chmod +x deploy-travelsnap.sh`

**Deployment fails during build:**
- Check Cloud Build logs in the console
- Verify your API keys are valid
- Ensure you have billing enabled on GCP

### Environment Variables on Cloud Run

The deployment automatically sets these environment variables:
- `REPLICATE_API_TOKEN` - For AI image generation
- `SERPAPI_API_KEY` - For search and data enrichment
- `GEMINI_API_KEY` - For AI itinerary generation

### Cost Estimate

Google Cloud Run pricing (as of 2024):
- **Free tier**: 2 million requests/month
- **After free tier**: ~$0.40 per million requests
- **Typical usage**: Most hobby projects stay within free tier

### Support

For deployment issues:
1. Check the [Cloud Run documentation](https://cloud.google.com/run/docs)
2. View logs: `gcloud run logs tail travelsnap --region=us-central1`
3. Check [Cloud Console](https://console.cloud.google.com/run)

---

**Happy deploying! 🎉**
