# ⚡ One-Click Deploy Instructions

## 🎯 Deploy in 3 Steps

### Step 1: Deploy Backend (5 minutes)

#### Click this link to start:
**https://dashboard.render.com/create?type=web**

Then:
1. Connect your GitHub account if not already connected
2. Search for repository: `ketukini55/qwen3.5-122b-a10b_12`
3. Click on the repository to select it

#### Fill in these details:

| Field | Value |
|-------|-------|
| **Name** | `flux-ai-backend` |
| **Root Directory** | `backend` |
| **Environment** | `Node` |
| **Branch** | `main` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

#### Add Environment Variables:

Click "Add Environment Variable" for each:

```
FLUX_API_KEY = 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
FLUX_API_URL = https://api.bfl.ml/v1
FRONTEND_URL = *
```

#### Deploy:
1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. **📋 COPY YOUR BACKEND URL**: `https://flux-ai-backend-XXXX.onrender.com`

---

### Step 2: Deploy Frontend (5 minutes)

#### Click this link to start:
**https://vercel.com/new**

Then:
1. Click **"Import Git Repository"**
2. Connect GitHub if needed
3. Find and select: `ketukini55/qwen3.5-122b-a10b_12`

#### Configure Project:

| Field | Value |
|-------|-------|
| **Project Name** | `flux-ai-studio` |
| **Framework Preset** | `Vite` |
| **Root Directory** | `frontend` |

#### Add Environment Variable:

```
VITE_API_URL = [PASTE YOUR BACKEND URL FROM STEP 1]
```

Example: `https://flux-ai-backend-xxxx.onrender.com`

#### Deploy:
1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. **📋 COPY YOUR FRONTEND URL**: `https://flux-ai-studio-XXXX.vercel.app`

---

### Step 3: Update CORS (2 minutes)

1. Go back to **Render Dashboard**: https://dashboard.render.com/
2. Click on your **flux-ai-backend** service
3. Go to **"Environment"** tab
4. Find the `FRONTEND_URL` variable
5. Change value from `*` to your **Vercel URL from Step 2**
6. Click **"Save Changes"**
7. Service will auto-redeploy (wait 1 minute)

---

## 🎉 Done! Test Your Website

### Open your Vercel URL and try:

#### Test 1: Text to Image
1. Click **"Text to Image"** tab
2. Enter: `"A beautiful sunset over mountains with a lake reflection"`
3. Click **"Generate Image"**
4. Wait 30-60 seconds
5. ✅ Image should appear
6. Try the **Download** button

#### Test 2: Image to Image
1. Click **"Image to Image"** tab
2. Upload any photo
3. Enter: `"Transform into a watercolor painting"`
4. Click **"Transform Image"**
5. Wait 30-60 seconds
6. ✅ See before/after comparison

---

## 📱 Share Your URLs

```
🌐 Frontend (share this!): _________________________________

⚙️  Backend API: ___________________________________________
```

---

## ⚠️ Troubleshooting

### "Failed to fetch" or CORS error
- Make sure you updated `FRONTEND_URL` in Step 3
- Wait for Render to finish redeploying
- Clear browser cache and refresh

### Backend taking too long
- First request may take 50+ seconds (cold start on free tier)
- Subsequent requests will be faster
- Consider upgrading to paid tier for instant starts

### Image generation fails
- Check Render logs for errors
- Verify API key is correct
- Check Flux API status

### Build fails on Vercel
- Check build logs for errors
- Ensure all dependencies are in package.json
- Try rebuilding from Vercel dashboard

---

## 🎯 Quick Links Reference

| Service | Dashboard | Docs |
|---------|-----------|------|
| Render | https://dashboard.render.com/ | https://render.com/docs |
| Vercel | https://vercel.com/dashboard | https://vercel.com/docs |
| Flux API | https://api.bfl.ml/ | https://docs.bfl.ml/ |

---

## 📞 Need More Help?

- 📖 Read **DEPLOYMENT.md** for detailed guide
- ✅ Use **DEPLOYMENT_CHECKLIST.md** for step-by-step
- 📚 Check **README.md** for troubleshooting
- 📊 Review **PROJECT_SUMMARY.md** for overview

---

## 🚀 Congratulations!

Your Flux AI Studio is now live!

Share your URL with friends and start generating amazing AI images!

**Total time:** ~15 minutes
**Cost:** $0 (free tier)
**Maintenance:** Auto-deploys on git push

---

Made with ❤️ using Flux AI
