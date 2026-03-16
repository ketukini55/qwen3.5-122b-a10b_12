# 🖥️ CLI Deployment Guide

For developers who prefer command-line deployment.

## Prerequisites

- Node.js 18+ installed
- Git installed
- npm installed
- Vercel CLI installed
- Render CLI installed (optional)

## Step 1: Install CLI Tools

```bash
# Install Vercel CLI
npm install -g vercel

# Verify installation
vercel --version
```

Note: Render CLI is optional as Render deploys are typically done via dashboard or Git integration.

## Step 2: Deploy Backend to Render

### Option A: Via Dashboard (Recommended)
Follow `ONE_CLICK_DEPLOY.md` Section 1

### Option B: Via Git Integration
1. Push code to GitHub (already done)
2. Connect Render to your GitHub repo
3. Render auto-deploys on push

**Configuration for Render:**
```yaml
# Already in backend/render.yaml
services:
  - type: web
    name: flux-ai-backend
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: FLUX_API_KEY
        value: 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
      - key: FLUX_API_URL
        value: https://api.bfl.ml/v1
      - key: FRONTEND_URL
        value: * # Update after frontend deployment
```

## Step 3: Deploy Frontend to Vercel

```bash
# Navigate to frontend directory
cd frontend

# Login to Vercel (opens browser)
vercel login

# Deploy to production
vercel --prod

# Follow the interactive prompts:
# - Set up and deploy: Yes
# - Which scope: Your account
# - Link to existing project: No
# - Project name: flux-ai-studio
# - Directory: ./
# - Override settings: No
```

**Set Environment Variable:**
```bash
# After backend is deployed, set API URL
vercel env add VITE_API_URL production

# When prompted, enter your Render backend URL:
# https://flux-ai-backend-XXXX.onrender.com
```

**Or set via dashboard:**
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add: `VITE_API_URL` = `https://your-backend.onrender.com`
5. Redeploy

## Step 4: Update Backend CORS

After frontend deployment, update backend environment:

1. Go to Render dashboard: https://dashboard.render.com
2. Select `flux-ai-backend` service
3. Go to Environment
4. Update `FRONTEND_URL` to your Vercel URL
5. Save (auto-redeploys)

## Step 5: Verify Deployment

```bash
# Test backend health
curl https://your-backend.onrender.com/health

# Should return: {"status":"ok","message":"Flux AI API Server is running"}

# Test frontend
curl -I https://your-frontend.vercel.app

# Should return: HTTP/2 200
```

## Alternative: Deploy from Root

```bash
# Deploy both at once (requires vercel.json in root)
cd /path/to/repository

# Deploy frontend
cd frontend && vercel --prod

# Backend must be deployed via Render dashboard
# (No CLI for Render free tier)
```

## Environment Variables Summary

### Backend (Render)
```env
PORT=10000
FLUX_API_KEY=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
FLUX_API_URL=https://api.bfl.ml/v1
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (Vercel)
```env
VITE_API_URL=https://your-backend.onrender.com
```

## Troubleshooting

### Vercel CLI Issues

**Command not found:**
```bash
npm install -g vercel
```

**Not logged in:**
```bash
vercel login
```

**Build fails:**
```bash
# Check Node version
node --version  # Should be 18+

# Clear cache and redeploy
vercel --force
```

### Render Issues

**Environment variables not set:**
- Go to dashboard and manually add them
- Ensure no trailing spaces

**Build fails:**
- Check logs in Render dashboard
- Verify package.json is correct
- Ensure Node 18+ is specified

## Continuous Deployment

### Auto-deploy on Git Push

**Vercel:**
- Automatically connected to your GitHub repo
- Every push to main triggers deployment
- Pull requests get preview deployments

**Render:**
- Auto-deploys from connected GitHub repo
- Configure in Render dashboard
- Can set auto-deploy branch

## Advanced: Deploy via CI/CD

See `.github/workflows/deploy.yml` for GitHub Actions setup (if available).

## Useful Commands

```bash
# Vercel
vercel                    # Deploy to preview
vercel --prod            # Deploy to production
vercel ls                # List deployments
vercel logs              # View logs
vercel env ls            # List environment variables
vercel domains           # Manage custom domains

# General
npm run build            # Build locally to test
npm start                # Test backend locally
npm run dev              # Test frontend locally
```

## URLs After Deployment

Save these for reference:

```
Frontend (Vercel): https://_________________.vercel.app
Backend (Render):  https://_________________.onrender.com

Vercel Dashboard:  https://vercel.com/dashboard
Render Dashboard:  https://dashboard.render.com
```

## Next Steps

1. Test text-to-image generation
2. Test image-to-image transformation
3. Test on mobile devices
4. Share URL with users
5. Monitor logs in dashboards

## Cost Breakdown

**Vercel Free Tier:**
- 100 GB bandwidth/month
- Unlimited deployments
- Perfect for this project

**Render Free Tier:**
- 750 hours/month
- Automatic sleep after 15 min inactivity
- Perfect for demo/testing

**Upgrades (Optional):**
- Vercel Pro: $20/month
- Render Standard: $7/month

---

**Estimated Time:** 10-15 minutes
**Difficulty:** Intermediate
**Requirements:** CLI tools installed

For easier deployment, use `ONE_CLICK_DEPLOY.md` instead!
