# 🚀 Quick Deployment Guide

## Instant Deploy URLs

### Deploy Backend (Render)
1. Go to: https://dashboard.render.com/select-repo?type=web
2. Select repo: `ketukini55/qwen3.5-122b-a10b_12`
3. Use these settings:

```
Name: flux-ai-backend
Root Directory: backend
Environment: Node
Build Command: npm install
Start Command: npm start
```

4. Add Environment Variables:
```
FLUX_API_KEY=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
FLUX_API_URL=https://api.bfl.ml/v1
FRONTEND_URL=*
```

### Deploy Frontend (Vercel)
1. Go to: https://vercel.com/new
2. Import repo: `ketukini55/qwen3.5-122b-a10b_12`
3. Use these settings:

```
Framework: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
```

4. Add Environment Variable:
```
VITE_API_URL=https://[your-backend-url].onrender.com
```

5. After deployment, update Render's `FRONTEND_URL` to your Vercel URL

---

## 🎯 That's it!

Your Flux AI Studio will be live at:
- Frontend: `https://[project-name].vercel.app`
- Backend: `https://[service-name].onrender.com`

## Test Your Deployment

1. Open your Vercel URL
2. Try "Text to Image" with: "A futuristic city at sunset"
3. Try "Image to Image" by uploading any image
4. Wait 30-60 seconds for generation
5. Download and enjoy your AI-generated images!

---

## 📝 Important Notes

- First request may take 30-60 seconds (cold start on free tier)
- Flux API key is already configured
- No credit card required for basic deployment
- Both services auto-deploy on git push

## 🆘 Need Help?

- Check DEPLOYMENT.md for detailed guide
- Check DEPLOYMENT_CHECKLIST.md for step-by-step checklist
- Review README.md for troubleshooting

---

Made with ❤️ using Flux AI
