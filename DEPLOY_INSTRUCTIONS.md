# 🚀 TravelSnap Deployment Instructions

## Your Project Details

- **Project ID**: `gen-lang-client-0613158115`
- **Project Number**: `383135404588`
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
1. ✅ Set your project to `gen-lang-client-0613158115`
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
gcloud config set project gen-lang-client-0613158115
```

### 2. Enable APIs

```bash
gcloud services enable \
    cloudbuild.googleapis.com \
    run.googleapis.com \
    containerregistry.googleapis.com \
    --project=gen-lang-client-0613158115
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
    --project=gen-lang-client-0613158115
```

## After Deployment

### View Your App

```bash
# Get the URL
gcloud run services describe travelsnap \
    --region=us-central1 \
    --project=gen-lang-client-0613158115 \
    --format='value(status.url)'
```

### View Logs

```bash
# Real-time logs
gcloud run logs tail travelsnap \
    --region=us-central1 \
    --project=gen-lang-client-0613158115

# Recent logs
gcloud run logs read travelsnap \
    --region=us-central1 \
    --project=gen-lang-client-0613158115 \
    --limit=50
```

### Check Service Status

```bash
gcloud run services describe travelsnap \
    --region=us-central1 \
    --project=gen-lang-client-0613158115
```

### Open in Cloud Console

Visit: https://console.cloud.google.com/run/detail/us-central1/travelsnap?project=gen-lang-client-0613158115

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
    --project=gen-lang-client-0613158115 \
    --region=us-central1
```

### Update Service Configuration

```bash
# Increase memory
gcloud run services update travelsnap \
    --memory=4Gi \
    --region=us-central1 \
    --project=gen-lang-client-0613158115

# Increase CPU
gcloud run services update travelsnap \
    --cpu=4 \
    --region=us-central1 \
    --project=gen-lang-client-0613158115

# Change timeout
gcloud run services update travelsnap \
    --timeout=600 \
    --region=us-central1 \
    --project=gen-lang-client-0613158115
```

### Delete Service (if needed)

```bash
gcloud run services delete travelsnap \
    --region=us-central1 \
    --project=gen-lang-client-0613158115
```

## Monitoring

### Cloud Console Dashboard

https://console.cloud.google.com/run?project=gen-lang-client-0613158115

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

https://console.cloud.google.com/billing?project=gen-lang-client-0613158115

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
    --project=gen-lang-client-0613158115 \
    --limit=5

# View build logs
gcloud builds log BUILD_ID \
    --project=gen-lang-client-0613158115
```

### Service Not Responding

```bash
# Check service health
gcloud run services describe travelsnap \
    --region=us-central1 \
    --project=gen-lang-client-0613158115

# View error logs
gcloud run logs read travelsnap \
    --region=us-central1 \
    --project=gen-lang-client-0613158115 \
    --limit=100
```

### Environment Variables Not Working

```bash
# Check current environment variables
gcloud run services describe travelsnap \
    --region=us-central1 \
    --project=gen-lang-client-0613158115 \
    --format='value(spec.template.spec.containers[0].env)'
```

### Out of Memory

```bash
# Increase memory to 4GB
gcloud run services update travelsnap \
    --memory=4Gi \
    --region=us-central1 \
    --project=gen-lang-client-0613158115
```

## Security Best Practices

### Use Secret Manager (Recommended for Production)

```bash
# Create secrets
echo -n "$REPLICATE_API_TOKEN" | gcloud secrets create replicate-token \
    --data-file=- \
    --project=gen-lang-client-0613158115

echo -n "$SERPAPI_API_KEY" | gcloud secrets create serpapi-key \
    --data-file=- \
    --project=gen-lang-client-0613158115

echo -n "$GEMINI_API_KEY" | gcloud secrets create gemini-key \
    --data-file=- \
    --project=gen-lang-client-0613158115

# Deploy with secrets
gcloud run deploy travelsnap \
    --image=gcr.io/gen-lang-client-0613158115/travelsnap:latest \
    --region=us-central1 \
    --project=gen-lang-client-0613158115 \
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
    --project=gen-lang-client-0613158115

# Follow DNS instructions provided
```

## Support Resources

- **Cloud Run Documentation**: https://cloud.google.com/run/docs
- **Your Cloud Console**: https://console.cloud.google.com/run?project=gen-lang-client-0613158115
- **Pricing Calculator**: https://cloud.google.com/products/calculator
- **Status Dashboard**: https://status.cloud.google.com

## Quick Reference

```bash
# Deploy
./deploy-travelsnap.sh

# View logs
gcloud run logs tail travelsnap --region=us-central1 --project=gen-lang-client-0613158115

# Get URL
gcloud run services describe travelsnap --region=us-central1 --project=gen-lang-client-0613158115 --format='value(status.url)'

# Update
./deploy-travelsnap.sh

# Delete
gcloud run services delete travelsnap --region=us-central1 --project=gen-lang-client-0613158115
```

---

**Ready to deploy?** Run `./deploy-travelsnap.sh` now! 🚀
