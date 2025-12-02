# 🚀 TravelSnap - Cloud Run Deployment Ready!

Your TravelSnap application is now ready to deploy to Google Cloud Run!

## What's Been Set Up

### ✅ Deployment Files Created

1. **Dockerfile** - Multi-stage build that:
   - Builds your React frontend
   - Sets up Python backend with all dependencies
   - Serves both frontend and API from one container
   - Optimized for Cloud Run

2. **deploy.sh** - Automated deployment script:
   - Enables required Google Cloud APIs
   - Builds and deploys your container
   - Configures environment variables
   - Provides live URL

3. **cloudbuild.yaml** - Cloud Build configuration:
   - Automated CI/CD pipeline
   - Builds Docker image
   - Deploys to Cloud Run
   - Manages secrets

4. **.dockerignore** - Optimizes build:
   - Excludes node_modules, venv
   - Reduces build time and image size

5. **Documentation**:
   - `QUICKSTART.md` - 5-minute deployment guide
   - `DEPLOYMENT.md` - Comprehensive deployment docs

### ✅ Code Updates

1. **backend/app.py**:
   - Added frontend serving routes
   - Production-ready configuration
   - Dynamic port binding for Cloud Run

2. **travelsnap-react/src/services/api.js**:
   - Updated API URLs for production
   - Works in both dev and production
   - Uses relative URLs when deployed

## 🎯 Deploy Now (3 Steps)

### Step 1: Setup Google Cloud

```bash
# Install gcloud CLI (if not installed)
# macOS:
brew install google-cloud-sdk

# Login and configure
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

### Step 2: Deploy

```bash
# Run the deployment script
./deploy.sh
```

### Step 3: Visit Your App

The script will output your live URL:
```
🌐 Your app is live at:
   https://travelsnap-xxxxx-uc.a.run.app
```

## 📊 What You Get

### Infrastructure
- **Serverless**: No servers to manage
- **Auto-scaling**: Scales from 0 to 1000+ instances
- **Global CDN**: Fast worldwide
- **HTTPS**: Automatic SSL certificates

### Features Deployed
- ✅ AI Photo Generation (Replicate + Gemini)
- ✅ Real-time Flight Prices (SerpAPI)
- ✅ Live Events & Activities
- ✅ Hotel Price Comparison
- ✅ AI Itinerary Planner
- ✅ Weather Information
- ✅ 3D Seasonal Postcards

### Configuration
- **Memory**: 2GB RAM
- **CPU**: 2 vCPUs
- **Timeout**: 300 seconds
- **Region**: us-central1 (configurable)

## 💰 Cost Estimate

Cloud Run pricing (pay only for what you use):

**Free Tier (per month)**:
- 2 million requests
- 360,000 GB-seconds
- 180,000 vCPU-seconds

**After Free Tier**:
- Requests: $0.40 per million
- Memory: $0.0000025 per GB-second
- CPU: $0.00002400 per vCPU-second

**Example**: 10,000 requests/month = **FREE** ✨

## 🔧 Configuration

### Environment Variables

Your app uses these API keys (from `backend/.env`):
- `REPLICATE_API_TOKEN` - AI image generation
- `SERPAPI_API_KEY` - Real-time data
- `GEMINI_API_KEY` - AI features

These are automatically configured during deployment.

### Customization

Edit `cloudbuild.yaml` to change:
- Memory: `--memory 2Gi` (256Mi to 8Gi)
- CPU: `--cpu 2` (1 to 8)
- Region: `--region us-central1`
- Timeout: `--timeout 300` (max 3600)

## 📝 Common Commands

```bash
# View logs
gcloud run logs tail travelsnap --region us-central1

# Update deployment
./deploy.sh

# Check service status
gcloud run services describe travelsnap --region us-central1

# Delete service
gcloud run services delete travelsnap --region us-central1
```

## 🔍 Monitoring

### Cloud Console
Visit: https://console.cloud.google.com/run

Monitor:
- Request count
- Response times
- Error rates
- Resource usage
- Costs

### Logs
```bash
# Real-time logs
gcloud run logs tail travelsnap --region us-central1

# Recent logs
gcloud run logs read travelsnap --region us-central1 --limit 100
```

## 🚨 Troubleshooting

### Build Fails
```bash
# Check build logs
gcloud builds list --limit 5
gcloud builds log BUILD_ID
```

### App Not Responding
```bash
# Check service health
gcloud run services describe travelsnap --region us-central1

# View error logs
gcloud run logs read travelsnap --region us-central1 --limit 50
```

### Out of Memory
```bash
# Increase memory
gcloud run services update travelsnap --memory 4Gi --region us-central1
```

## 🎨 Custom Domain

To use your own domain:

```bash
# Map domain
gcloud run domain-mappings create \
    --service travelsnap \
    --domain your-domain.com \
    --region us-central1

# Update DNS as instructed
```

## 🔒 Security Best Practices

1. **Use Secret Manager** (recommended for production):
   ```bash
   # Store secrets
   echo -n "your-key" | gcloud secrets create replicate-token --data-file=-
   
   # Deploy with secrets
   gcloud run deploy travelsnap \
       --set-secrets REPLICATE_API_TOKEN=replicate-token:latest
   ```

2. **Enable Authentication** (if needed):
   ```bash
   gcloud run services update travelsnap \
       --no-allow-unauthenticated \
       --region us-central1
   ```

3. **Set up VPC** (for database connections):
   ```bash
   gcloud run services update travelsnap \
       --vpc-connector your-connector \
       --region us-central1
   ```

## 📚 Additional Resources

- **Cloud Run Docs**: https://cloud.google.com/run/docs
- **Pricing Calculator**: https://cloud.google.com/products/calculator
- **Best Practices**: https://cloud.google.com/run/docs/best-practices
- **Troubleshooting**: https://cloud.google.com/run/docs/troubleshooting

## 🎉 Next Steps

After deployment:

1. ✅ Test all features
2. ✅ Set up monitoring alerts
3. ✅ Configure custom domain (optional)
4. ✅ Set up CI/CD with GitHub Actions (optional)
5. ✅ Review and optimize costs

## 💡 Tips

- **Start small**: Use default settings, scale up if needed
- **Monitor costs**: Check Cloud Console regularly
- **Use caching**: Add CDN for static assets
- **Optimize images**: Reduce Docker image size
- **Set timeouts**: Prevent long-running requests

## 🆘 Need Help?

1. Check logs: `gcloud run logs tail travelsnap --region us-central1`
2. Review documentation: `DEPLOYMENT.md`
3. Check Cloud Run status: https://status.cloud.google.com

---

**Ready to deploy?** Run `./deploy.sh` and you'll be live in minutes! 🚀
