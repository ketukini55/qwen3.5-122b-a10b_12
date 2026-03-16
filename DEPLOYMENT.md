# 🚀 Deployment Guide

This guide will help you deploy the Flux AI Studio application to Vercel (frontend) and Render (backend).

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- Render account (sign up at https://render.com)
- Your repository pushed to GitHub

## Step 1: Deploy Backend to Render

### 1.1 Create New Web Service

1. Go to https://dashboard.render.com/
2. Click **"New +"** button in the top right
3. Select **"Web Service"**
4. Click **"Connect GitHub"** and authorize Render to access your repositories
5. Find and select your repository: `ketukini55/qwen3.5-122b-a10b_12`

### 1.2 Configure the Service

Fill in the following details:

- **Name**: `flux-ai-backend` (or any name you prefer)
- **Root Directory**: `backend`
- **Environment**: `Node`
- **Region**: Choose the closest to your users
- **Branch**: `main` (or your default branch)
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: Free (or upgrade for better performance)

### 1.3 Add Environment Variables

Click on **"Advanced"** and add the following environment variables:

| Key | Value |
|-----|-------|
| `PORT` | `10000` (auto-set by Render) |
| `FLUX_API_KEY` | `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` |
| `FLUX_API_URL` | `https://api.bfl.ml/v1` |
| `FRONTEND_URL` | `*` (will update after frontend deployment) |

### 1.4 Deploy

1. Click **"Create Web Service"**
2. Wait for the deployment to complete (3-5 minutes)
3. **Copy your backend URL**: It will look like `https://flux-ai-backend.onrender.com`

✅ **Backend is now live!**

---

## Step 2: Deploy Frontend to Vercel

### 2.1 Import Project

1. Go to https://vercel.com/
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Find your repository: `ketukini55/qwen3.5-122b-a10b_12`
5. Click **"Import"**

### 2.2 Configure Project

Fill in the following:

- **Project Name**: `flux-ai-studio` (or any name you prefer)
- **Framework Preset**: `Vite`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### 2.3 Add Environment Variable

Click on **"Environment Variables"** and add:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | Your Render backend URL (e.g., `https://flux-ai-backend.onrender.com`) |

### 2.4 Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (2-3 minutes)
3. **Copy your frontend URL**: It will look like `https://flux-ai-studio.vercel.app`

✅ **Frontend is now live!**

---

## Step 3: Update Backend CORS

Now that you have your frontend URL, update the backend to allow requests from it:

1. Go back to **Render Dashboard**
2. Select your backend service (`flux-ai-backend`)
3. Go to **"Environment"** tab
4. Find the `FRONTEND_URL` variable
5. Update its value to your Vercel URL: `https://flux-ai-studio.vercel.app`
6. Click **"Save Changes"**
7. The service will automatically redeploy

---

## Step 4: Test Your Application

1. Open your Vercel URL in a browser
2. Try generating an image with text-to-image:
   - Enter prompt: "A beautiful sunset over mountains"
   - Click "Generate Image"
   - Wait for the result
3. Try image-to-image transformation:
   - Upload an image
   - Enter transformation prompt
   - Click "Transform Image"

---

## 🎉 Congratulations!

Your Flux AI Studio is now live and ready to use!

- **Frontend URL**: `https://your-app.vercel.app`
- **Backend URL**: `https://your-backend.onrender.com`

---

## 📝 Post-Deployment Tips

### Custom Domain (Optional)

#### Vercel
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

#### Render
1. Go to your service settings in Render
2. Navigate to "Settings" → "Custom Domain"
3. Add your custom domain
4. Update DNS records as instructed

### Monitoring

#### Vercel
- View deployment logs in the "Deployments" tab
- Check analytics in the "Analytics" tab
- Set up alerts for errors

#### Render
- View logs in the "Logs" tab
- Monitor performance in "Metrics"
- Set up alerts in "Notifications"

### Auto-Deploy from GitHub

Both Vercel and Render automatically deploy when you push to your main branch:

1. Make changes to your code
2. Push to GitHub
3. Deployments will trigger automatically

---

## 🐛 Troubleshooting

### Backend not responding
- Check Render logs for errors
- Verify environment variables are set correctly
- Ensure API key is valid

### CORS errors
- Verify `FRONTEND_URL` in Render matches your Vercel URL exactly
- Check that both URLs use HTTPS

### Build failures
- Check build logs in respective platforms
- Verify all dependencies are in package.json
- Ensure Node.js version compatibility

### API rate limits
- Flux API may have rate limits
- Consider upgrading Render to paid plan for better performance
- Implement request queuing if needed

---

## 🔒 Security Notes

- Never commit `.env` files with actual API keys
- The `.env` file in the repo is for local development
- Always use environment variables in production
- Rotate API keys periodically
- Monitor API usage to detect anomalies

---

## 📞 Support

If you encounter issues:

1. Check the logs in Vercel/Render dashboards
2. Review the README.md for common issues
3. Verify all environment variables
4. Check Flux API status and limits

---

Made with ❤️ using Flux AI
