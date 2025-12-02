# 🚀 Deploy TravelSnap to Cloud Run

## One-Command Deployment

```bash
./deploy-travelsnap.sh
```

That's it! Your app will be live in 5-10 minutes.

---

## What You Need

1. ✅ Google Cloud account (you have this)
2. ✅ Project ID: `gen-lang-client-0613158115` (configured)
3. ✅ API keys in `backend/.env` (you have this)
4. ⚠️ gcloud CLI installed (install if needed)

## Install gcloud CLI (if needed)

**macOS:**
```bash
brew install google-cloud-sdk
```

**Other platforms:**
Download from https://cloud.google.com/sdk/docs/install

## First Time Setup

```bash
# 1. Login to Google Cloud
gcloud auth login

# 2. Deploy (the script handles everything else)
./deploy-travelsnap.sh
```

## What Gets Deployed

Your full TravelSnap app with:
- ✅ React frontend (optimized build)
- ✅ Flask backend (all API endpoints)
- ✅ AI Photo Generation
- ✅ Real-time Flight & Hotel Prices
- ✅ Live Events
- ✅ AI Itinerary Planner
- ✅ Weather Information
- ✅ 3D Seasonal Postcards

## After Deployment

The script will show you:
- 🌐 Your live URL
- 📝 Commands to view logs
- 🔗 Link to Cloud Console

## Cost

**Free tier includes:**
- 2 million requests/month
- 360,000 GB-seconds
- 180,000 vCPU-seconds

**Your usage:** Likely FREE for personal use! 💰

## Update Your App

Made changes? Just run the deploy script again:

```bash
./deploy-travelsnap.sh
```

## View Logs

```bash
gcloud run logs tail travelsnap --region=us-central1 --project=gen-lang-client-0613158115
```

## Need Help?

See `DEPLOY_INSTRUCTIONS.md` for:
- Detailed commands
- Troubleshooting
- Configuration options
- Monitoring setup

---

**Ready?** Run `./deploy-travelsnap.sh` now! 🎉
