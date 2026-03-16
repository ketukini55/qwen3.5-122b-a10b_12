# 📋 Deployment Checklist

Use this checklist to ensure smooth deployment to Vercel and Render.

## Pre-Deployment

- [ ] Code is pushed to GitHub repository
- [ ] All dependencies are listed in package.json files
- [ ] Environment variables are documented
- [ ] API key is ready: `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`
- [ ] Local testing completed successfully

## Backend Deployment (Render)

### Setup
- [ ] Created Render account
- [ ] Connected GitHub account to Render
- [ ] Selected repository: `ketukini55/qwen3.5-122b-a10b_12`

### Configuration
- [ ] Service Name: `flux-ai-backend`
- [ ] Root Directory: `backend`
- [ ] Environment: `Node`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`

### Environment Variables
- [ ] `PORT`: `10000`
- [ ] `FLUX_API_KEY`: `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`
- [ ] `FLUX_API_URL`: `https://api.bfl.ml/v1`
- [ ] `FRONTEND_URL`: `*` (update after frontend deployment)

### Verification
- [ ] Deployment completed successfully
- [ ] Copied backend URL: `_______________________________`
- [ ] Health check endpoint working: `https://your-backend.onrender.com/health`

## Frontend Deployment (Vercel)

### Setup
- [ ] Created Vercel account
- [ ] Connected GitHub account to Vercel
- [ ] Imported repository: `ketukini55/qwen3.5-122b-a10b_12`

### Configuration
- [ ] Project Name: `flux-ai-studio`
- [ ] Framework: `Vite`
- [ ] Root Directory: `frontend`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`

### Environment Variables
- [ ] `VITE_API_URL`: `https://your-backend.onrender.com` (use backend URL from above)

### Verification
- [ ] Deployment completed successfully
- [ ] Copied frontend URL: `_______________________________`
- [ ] Website loads correctly
- [ ] No console errors in browser

## Post-Deployment Configuration

### Update Backend CORS
- [ ] Navigated to Render dashboard
- [ ] Selected backend service
- [ ] Updated `FRONTEND_URL` environment variable with Vercel URL
- [ ] Service redeployed automatically

### Final Testing

#### Text to Image
- [ ] Navigate to frontend URL
- [ ] Click "Text to Image" tab
- [ ] Enter test prompt: "A beautiful sunset over mountains"
- [ ] Click "Generate Image"
- [ ] Image generated successfully (wait 30-60 seconds)
- [ ] Download button works
- [ ] "Create New" button works

#### Image to Image
- [ ] Click "Image to Image" tab
- [ ] Upload a test image
- [ ] Enter test prompt: "Transform into a watercolor painting"
- [ ] Click "Transform Image"
- [ ] Transformation completed successfully
- [ ] Download button works
- [ ] "Start Over" button works

### Mobile Testing
- [ ] Open website on mobile device
- [ ] UI is responsive and readable
- [ ] All buttons are clickable
- [ ] Forms work properly
- [ ] Images display correctly

### Performance Check
- [ ] Frontend loads in < 3 seconds
- [ ] Backend responds in < 2 seconds
- [ ] Image generation completes in < 90 seconds
- [ ] No memory leaks observed

## Documentation

- [ ] Updated README.md with live URLs
- [ ] Documented any deployment issues encountered
- [ ] Saved backend URL for reference
- [ ] Saved frontend URL for reference

## Optional Enhancements

- [ ] Set up custom domain for frontend
- [ ] Set up custom domain for backend
- [ ] Configure monitoring alerts
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Enable analytics
- [ ] Set up automated backups

## URLs Reference

Fill these in during deployment:

```
Backend URL:  _____________________________________________
Frontend URL: _____________________________________________
```

## Support Contacts

- Render Support: https://render.com/docs
- Vercel Support: https://vercel.com/docs
- Flux API Docs: https://docs.bfl.ml/

## Deployment Date

Date: _______________
Deployed by: _______________
Status: ☐ Success  ☐ Issues  ☐ Failed

## Notes

_Add any notes about the deployment process, issues encountered, or special configurations:_

_______________________________________________
_______________________________________________
_______________________________________________
