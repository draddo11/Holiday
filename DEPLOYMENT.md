# TravelSnap - Google Cloud Run Deployment Guide

This guide will help you deploy TravelSnap to Google Cloud Run.

## Prerequisites

1. **Google Cloud Account**
   - Create a GCP account at https://cloud.google.com
   - Create a new project or use an existing one
   - Enable billing for your project

2. **Google Cloud SDK (gcloud)**
   ```bash
   # Install gcloud CLI
   # macOS:
   brew install google-cloud-sdk
   
   # Or download from:
   # https://cloud.google.com/sdk/docs/install
   ```

3. **API Keys** (already in your backend/.env)
   - REPLICATE_API_TOKEN
   - SERPAPI_API_KEY
   - GEMINI_API_KEY

## Quick Deployment (Automated)

### Step 1: Initialize gcloud

```bash
# Login to Google Cloud
gcloud auth login

# Set your project ID
gcloud config set project YOUR_PROJECT_ID

# Verify configuration
gcloud config list
```

### Step 2: Deploy

```bash
# Make the deployment script executable (already done)
chmod +x deploy.sh

# Run the deployment
./deploy.sh
```

The script will:
- Enable required Google Cloud APIs
- Build your Docker container
- Deploy to Cloud Run
- Provide you with the live URL

## Manual Deployment (Step by Step)

If you prefer manual control:

### 1. Enable Required APIs

```bash
gcloud services enable \
    cloudbuild.googleapis.com \
    run.googleapis.com \
    containerregistry.googleapis.com
```

### 2. Build the Container

```bash
# Build using Cloud Build
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/travelsnap
```

### 3. Deploy to Cloud Run

```bash
# Load environment variables
export $(cat backend/.env | grep -v '^#' | xargs)

# Deploy
gcloud run deploy travelsnap \
    --image gcr.io/YOUR_PROJECT_ID/travelsnap \
    --region us-central1 \
    --platform managed \
    --allow-unauthenticated \
    --memory 2Gi \
    --cpu 2 \
    --timeout 300 \
    --set-env-vars REPLICATE_API_TOKEN=$REPLICATE_API_TOKEN,SERPAPI_API_KEY=$SERPAPI_API_KEY,GEMINI_API_KEY=$GEMINI_API_KEY
```

## Configuration Options

### Memory and CPU

Adjust based on your needs:

```bash
--memory 2Gi      # Options: 256Mi, 512Mi, 1Gi, 2Gi, 4Gi, 8Gi
--cpu 2           # Options: 1, 2, 4, 6, 8
```

### Timeout

```bash
--timeout 300     # Maximum request timeout in seconds (max: 3600)
```

### Region

Choose a region close to your users:

```bash
--region us-central1      # Iowa
--region us-east1         # South Carolina
--region europe-west1     # Belgium
--region asia-northeast1  # Tokyo
```

## Environment Variables

Your app requires these environment variables (from backend/.env):

- `REPLICATE_API_TOKEN` - For AI image generation
- `SERPAPI_API_KEY` - For real-time data (flights, hotels, events)
- `GEMINI_API_KEY` - For AI-powered features

## Monitoring and Logs

### View Logs

```bash
# Stream logs in real-time
gcloud run logs tail travelsnap --region us-central1

# View recent logs
gcloud run logs read travelsnap --region us-central1 --limit 50
```

### View Service Details

```bash
gcloud run services describe travelsnap --region us-central1
```

### Open in Cloud Console

```bash
gcloud run services describe travelsnap --region us-central1 --format='value(status.url)'
```

## Updating Your Deployment

To deploy updates:

```bash
# Option 1: Use the deployment script
./deploy.sh

# Option 2: Manual update
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/travelsnap
gcloud run deploy travelsnap \
    --image gcr.io/YOUR_PROJECT_ID/travelsnap \
    --region us-central1
```

## Cost Optimization

Cloud Run pricing is based on:
- **CPU and Memory**: Only charged when handling requests
- **Requests**: $0.40 per million requests
- **Compute time**: ~$0.00002400 per vCPU-second

### Tips to reduce costs:

1. **Set minimum instances to 0** (default)
   ```bash
   --min-instances 0
   ```

2. **Use appropriate memory/CPU**
   - Start with 1Gi/1CPU
   - Scale up if needed

3. **Enable request timeout**
   ```bash
   --timeout 60  # Shorter timeout for most requests
   ```

## Troubleshooting

### Build Fails

```bash
# Check build logs
gcloud builds list --limit 5
gcloud builds log BUILD_ID
```

### Deployment Fails

```bash
# Check service status
gcloud run services describe travelsnap --region us-central1

# Check logs for errors
gcloud run logs read travelsnap --region us-central1 --limit 100
```

### Environment Variables Not Working

```bash
# Verify environment variables are set
gcloud run services describe travelsnap \
    --region us-central1 \
    --format='value(spec.template.spec.containers[0].env)'
```

### Out of Memory Errors

Increase memory allocation:

```bash
gcloud run services update travelsnap \
    --memory 4Gi \
    --region us-central1
```

## Custom Domain

To use a custom domain:

1. **Verify domain ownership** in Google Cloud Console
2. **Map domain to service**:
   ```bash
   gcloud run domain-mappings create \
       --service travelsnap \
       --domain your-domain.com \
       --region us-central1
   ```
3. **Update DNS records** as instructed by Cloud Run

## Security

### API Keys

- Never commit API keys to git
- Use Secret Manager for production:
  ```bash
  # Store secret
  echo -n "your-api-key" | gcloud secrets create replicate-token --data-file=-
  
  # Use in Cloud Run
  gcloud run deploy travelsnap \
      --set-secrets REPLICATE_API_TOKEN=replicate-token:latest
  ```

### Authentication

To require authentication:

```bash
gcloud run services update travelsnap \
    --no-allow-unauthenticated \
    --region us-central1
```

## CI/CD with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloud Run

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: google-github-actions/setup-gcloud@v1
        with:
          service_account_key: ${{ secrets.GCP_SA_KEY }}
          project_id: ${{ secrets.GCP_PROJECT_ID }}
      
      - name: Deploy
        run: |
          gcloud builds submit \
            --config cloudbuild.yaml \
            --substitutions=_REPLICATE_API_TOKEN="${{ secrets.REPLICATE_API_TOKEN }}",_SERPAPI_API_KEY="${{ secrets.SERPAPI_API_KEY }}",_GEMINI_API_KEY="${{ secrets.GEMINI_API_KEY }}"
```

## Support

- **Cloud Run Documentation**: https://cloud.google.com/run/docs
- **Pricing Calculator**: https://cloud.google.com/products/calculator
- **Status Dashboard**: https://status.cloud.google.com

## Next Steps

After deployment:

1. ✅ Test all features (postcard generation, AI itinerary, etc.)
2. ✅ Set up monitoring and alerts
3. ✅ Configure custom domain (optional)
4. ✅ Set up CI/CD (optional)
5. ✅ Review and optimize costs

---

**Need help?** Check the logs first:
```bash
gcloud run logs tail travelsnap --region us-central1
```
