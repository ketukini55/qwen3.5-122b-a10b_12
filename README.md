# 🎨 Flux AI Studio - Text & Image to Image Generator

A modern, beautiful web application for generating stunning images using the Flux.2-Klein-4B AI model. Features both text-to-image and image-to-image generation with a sleek, animated interface.

## ✨ Features

- 🖼️ **Text to Image**: Generate images from text descriptions
- 🎨 **Image to Image**: Transform existing images based on text prompts
- 🌟 Modern, animated UI with Framer Motion
- 📱 Fully responsive design
- 🚀 Fast API with real-time generation status
- 💾 Download generated images
- 🎯 Built with React + Vite and Express.js

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Framer Motion (animations)
- Axios
- CSS3 with modern animations

### Backend
- Node.js
- Express
- Axios
- Multer (file uploads)
- Flux API integration

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- Flux API key (already configured)

### Local Development

#### Backend Setup
```bash
cd backend
npm install
npm start
```

The backend will run on `http://localhost:3001`

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🚀 Deployment

### Backend Deployment (Render)

1. **Create a new Web Service on Render**
   - Go to https://dashboard.render.com/
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository: `ketukini55/qwen3.5-122b-a10b_12`

2. **Configure the service**
   - Name: `flux-ai-backend`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Add Environment Variables**
   - `PORT`: 10000 (automatically set by Render)
   - `FLUX_API_KEY`: `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`
   - `FLUX_API_URL`: `https://api.bfl.ml/v1`
   - `FRONTEND_URL`: (will be set after frontend deployment)

4. **Deploy**
   - Click "Create Web Service"
   - Note the backend URL: `https://flux-ai-backend.onrender.com` (or similar)

### Frontend Deployment (Vercel)

1. **Deploy to Vercel**
   - Go to https://vercel.com/
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the repository: `ketukini55/qwen3.5-122b-a10b_12`

2. **Configure the project**
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Add Environment Variable**
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://flux-ai-backend.onrender.com`)

4. **Deploy**
   - Click "Deploy"
   - Note the frontend URL: `https://your-project.vercel.app`

5. **Update Backend CORS**
   - Go back to Render dashboard
   - Update the `FRONTEND_URL` environment variable with your Vercel URL
   - The backend will automatically restart

## 🎯 Usage

### Text to Image
1. Navigate to the "Text to Image" tab
2. Enter a descriptive prompt (e.g., "A futuristic city at sunset with flying cars")
3. Click "Generate Image"
4. Wait for the AI to create your image (usually 20-60 seconds)
5. Download or create a new image

### Image to Image
1. Navigate to the "Image to Image" tab
2. Upload an image (PNG, JPG, up to 10MB)
3. Enter a transformation prompt (e.g., "Transform into a watercolor painting")
4. Click "Transform Image"
5. See the before/after comparison
6. Download or start over

## 🔑 API Endpoints

### `POST /api/text-to-image`
Generate an image from text prompt.

**Body:**
```json
{
  "prompt": "Your image description",
  "width": 1024,
  "height": 768
}
```

### `POST /api/image-to-image`
Transform an image based on a prompt.

**Body (multipart/form-data):**
- `image`: Image file
- `prompt`: Transformation description
- `strength`: Transformation strength (0-1)

### `GET /api/status/:taskId`
Check generation status.

## 🎨 Features

- **Modern Animations**: Smooth transitions and loading states
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Feedback**: Progress bars and status updates
- **Error Handling**: Clear error messages and retry options
- **Download Support**: Save generated images locally
- **Gradient Effects**: Beautiful animated backgrounds
- **Tab Navigation**: Easy switching between generation modes

## 📝 Environment Variables

### Backend (.env)
```env
PORT=3001
FLUX_API_KEY=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
FLUX_API_URL=https://api.bfl.ml/v1
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001
```

## 🐛 Troubleshooting

### CORS Issues
- Make sure `FRONTEND_URL` in backend matches your frontend URL
- Check that backend is running and accessible

### Image Generation Fails
- Verify Flux API key is correct
- Check API rate limits
- Ensure image file is under 10MB for image-to-image

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (18+)

## 📄 License

MIT License

## 🙏 Credits

- Powered by Flux.2-Klein-4B AI Model
- Built with React, Vite, Express.js
- Animations by Framer Motion
- Deployed on Vercel & Render

## 🔗 Links

- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Render
- **Repository**: https://github.com/ketukini55/qwen3.5-122b-a10b_12

---

Made with ❤️ using Flux AI
