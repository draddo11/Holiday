# 🚀 TravelSnap Deployment Instructions

## Your Project Details

- **Project ID**: `resumehacathon`
- **Project Number**: `219166804221`
- **Region**: `us-central1`
- **Service Name**: `travelsnap`

## Quick Deploy (Recommended)

### Step 1: Setup Google Cloud CLI

```bash
# If you haven't installed gcloud CLI yet:
# macOS:
brew install google-cloud-sdk

# Or download from: https://cloud.google.com/sdk/docs/install

# Login to Google Cloud
gcloud auth login

# The project is already configured in the script
```

### Step 2: Deploy Your App

```bash
# Run the deployment script
./deploy-travelsnap.sh
```

That's it! The script will:
1. ✅ Set your project to `resumehacathon`
2. ✅ Enable required Google Cloud APIs
3. ✅ Build your Docker container
4. ✅ Deploy to Cloud Run
5. ✅ Configure your API keys from `backend/.env`
6. ✅ Give you the live URL

**Estimated time**: 5-10 minutes

## Manual Deployment (Alternative)

If you prefer to run commands manually:

### 1. Configure Project

```bash
gcloud config set project resumehacathon
```

### 2. Enable APIs

```bash
gcloud services enable \
    cloudbuild.googleapis.com \
    run.googleapis.com \
    containerregistry.googleapis.com \
    --project=resumehacathon
```

### 3. Load Environment Variables

```bash
export $(cat backend/.env | grep -v '^#' | xargs)
```

### 4. Build and Deploy

```bash
gcloud builds submit \
    --config cloudbuild.yaml \
    --substitutions=_REPLICATE_API_TOKEN="$REPLICATE_API_TOKEN",_SERPAPI_API_KEY="$SERPAPI_API_KEY",_GEMINI_API_KEY="$GEMINI_API_KEY" \
    --project=resumehacathon
```

## After Deployment

### View Your App

```bash
# Get the URL
gcloud run services describe travelsnap \
    --region=us-central1 \
    --project=resumehacathon \
    --format='value(status.url)'
```

### View Logs

```bash
# Real-time logs
gcloud run logs tail travelsnap \
    --region=us-central1 \
    --project=resumehacathon

# Recent logs
gcloud run logs read travelsnap \
    --region=us-central1 \
    --project=resumehacathon \
    --limit=50
```

### Check Service Status

```bash
gcloud run services describe travelsnap \
    --region=us-central1 \
    --project=resumehacathon
```

### Open in Cloud Console

Visit: https://console.cloud.google.com/run/detail/us-central1/travelsnap?project=resumehacathon

## Update Your Deployment

To deploy updates after making changes:

```bash
# Just run the deployment script again
./deploy-travelsnap.sh
```

## Useful Commands

### View All Cloud Run Services

```bash
gcloud run services list \
    --project=resumehacathon \
    --region=us-central1
```

### Update Service Configuration

```bash
# Increase memory
gcloud run services update travelsnap \
    --memory=4Gi \
    --region=us-central1 \
    --project=resumehacathon

# Increase CPU
gcloud run services update travelsnap \
    --cpu=4 \
    --region=us-central1 \
    --project=resumehacathon

# Change timeout
gcloud run services update travelsnap \
    --timeout=600 \
    --region=us-central1 \
    --project=resumehacathon
```

### Delete Service (if needed)

```bash
gcloud run services delete travelsnap \
    --region=us-central1 \
    --project=resumehacathon
```

## Monitoring

### Cloud Console Dashboard

https://console.cloud.google.com/run?project=resumehacathon

Monitor:
- Request count
- Response times
- Error rates
- Memory usage
- CPU usage
- Costs

### Set Up Alerts

1. Go to Cloud Console
2. Navigate to Monitoring > Alerting
3. Create alerts for:
   - High error rate
   - High latency
   - High memory usage
   - Budget alerts

## Cost Management

### View Current Costs

https://console.cloud.google.com/billing?project=resumehacathon

### Set Budget Alerts

```bash
# Create a budget alert (adjust amount as needed)
gcloud billing budgets create \
    --billing-account=YOUR_BILLING_ACCOUNT_ID \
    --display-name="TravelSnap Budget" \
    --budget-amount=50 \
    --threshold-rule=percent=50 \
    --threshold-rule=percent=90 \
    --threshold-rule=percent=100
```

## Troubleshooting

### Build Fails

```bash
# Check recent builds
gcloud builds list \
    --project=resumehacathon \
    --limit=5

# View build logs
gcloud builds log BUILD_ID \
    --project=resumehacathon
```

### Service Not Responding

```bash
# Check service health
gcloud run services describe travelsnap \
    --region=us-central1 \
    --project=resumehacathon

# View error logs
gcloud run logs read travelsnap \
    --region=us-central1 \
    --project=resumehacathon \
    --limit=100
```

### Environment Variables Not Working

```bash
# Check current environment variables
gcloud run services describe travelsnap \
    --region=us-central1 \
    --project=resumehacathon \
    --format='value(spec.template.spec.containers[0].env)'
```

### Out of Memory

```bash
# Increase memory to 4GB
gcloud run services update travelsnap \
    --memory=4Gi \
    --region=us-central1 \
    --project=resumehacathon
```

## Security Best Practices

### Use Secret Manager (Recommended for Production)

```bash
# Create secrets
echo -n "$REPLICATE_API_TOKEN" | gcloud secrets create replicate-token \
    --data-file=- \
    --project=resumehacathon

echo -n "$SERPAPI_API_KEY" | gcloud secrets create serpapi-key \
    --data-file=- \
    --project=resumehacathon

echo -n "$GEMINI_API_KEY" | gcloud secrets create gemini-key \
    --data-file=- \
    --project=resumehacathon

# Deploy with secrets
gcloud run deploy travelsnap \
    --image=gcr.io/resumehacathon/travelsnap:latest \
    --region=us-central1 \
    --project=resumehacathon \
    --set-secrets=REPLICATE_API_TOKEN=replicate-token:latest,SERPAPI_API_KEY=serpapi-key:latest,GEMINI_API_KEY=gemini-key:latest
```

## Custom Domain

To use your own domain:

```bash
# Map domain to service
gcloud run domain-mappings create \
    --service=travelsnap \
    --domain=your-domain.com \
    --region=us-central1 \
    --project=resumehacathon

# Follow DNS instructions provided
```

## Support Resources

- **Cloud Run Documentation**: https://cloud.google.com/run/docs
- **Your Cloud Console**: https://console.cloud.google.com/run?project=resumehacathon
- **Pricing Calculator**: https://cloud.google.com/products/calculator
- **Status Dashboard**: https://status.cloud.google.com

## Quick Reference

```bash
# Deploy
./deploy-travelsnap.sh

# View logs
gcloud run logs tail travelsnap --region=us-central1 --project=resumehacathon

# Get URL
gcloud run services describe travelsnap --region=us-central1 --project=resumehacathon --format='value(status.url)'

# Update
./deploy-travelsnap.sh

# Delete
gcloud run services delete travelsnap --region=us-central1 --project=resumehacathon
```

---

**Ready to deploy?** Run `./deploy-travelsnap.sh` now! 🚀
