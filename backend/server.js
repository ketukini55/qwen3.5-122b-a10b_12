import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import multer from 'multer';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Create uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Helper function to poll for result
async function pollForResult(taskId, maxAttempts = 60, interval = 2000) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await axios.get(
        `${process.env.FLUX_API_URL}/get_result`,
        {
          params: { id: taskId },
          headers: {
            'X-Key': process.env.FLUX_API_KEY
          }
        }
      );

      if (response.data.status === 'Ready') {
        return response.data;
      } else if (response.data.status === 'Error') {
        throw new Error(response.data.error || 'Generation failed');
      }

      // Wait before next poll
      await new Promise(resolve => setTimeout(resolve, interval));
    } catch (error) {
      if (i === maxAttempts - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, interval));
    }
  }
  throw new Error('Timeout waiting for result');
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Flux AI API Server is running' });
});

// Text to Image endpoint
app.post('/api/text-to-image', async (req, res) => {
  try {
    const { prompt, width = 1024, height = 768, steps = 28, guidance = 3.5 } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('Generating image from prompt:', prompt);

    // Submit generation request
    const response = await axios.post(
      `${process.env.FLUX_API_URL}/flux-pro-1.1`,
      {
        prompt,
        width: parseInt(width),
        height: parseInt(height),
        steps: parseInt(steps),
        guidance: parseFloat(guidance),
        safety_tolerance: 2
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Key': process.env.FLUX_API_KEY
        }
      }
    );

    const taskId = response.data.id;
    console.log('Task submitted:', taskId);

    // Poll for result
    const result = await pollForResult(taskId);

    res.json({
      success: true,
      taskId,
      imageUrl: result.result.sample,
      prompt
    });

  } catch (error) {
    console.error('Text-to-image error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to generate image',
      details: error.response?.data?.error || error.message
    });
  }
});

// Image to Image endpoint
app.post('/api/image-to-image', upload.single('image'), async (req, res) => {
  try {
    const { prompt, strength = 0.8 } = req.body;
    const imageFile = req.file;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!imageFile) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    console.log('Generating image-to-image with prompt:', prompt);

    // Read the uploaded image
    const imageBuffer = fs.readFileSync(imageFile.path);
    const base64Image = imageBuffer.toString('base64');

    // Submit generation request
    const response = await axios.post(
      `${process.env.FLUX_API_URL}/flux-pro-1.1-canny`,
      {
        prompt,
        control_image: base64Image,
        control_strength: parseFloat(strength),
        steps: 28,
        guidance: 3.5,
        safety_tolerance: 2
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Key': process.env.FLUX_API_KEY
        }
      }
    );

    const taskId = response.data.id;
    console.log('Image-to-image task submitted:', taskId);

    // Poll for result
    const result = await pollForResult(taskId);

    // Clean up uploaded file
    fs.unlinkSync(imageFile.path);

    res.json({
      success: true,
      taskId,
      imageUrl: result.result.sample,
      prompt
    });

  } catch (error) {
    // Clean up uploaded file on error
    if (req.file?.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {
        console.error('Failed to delete temp file:', e);
      }
    }

    console.error('Image-to-image error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to generate image',
      details: error.response?.data?.error || error.message
    });
  }
});

// Get task status
app.get('/api/status/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;

    const response = await axios.get(
      `${process.env.FLUX_API_URL}/get_result`,
      {
        params: { id: taskId },
        headers: {
          'X-Key': process.env.FLUX_API_KEY
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Status check error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to check status',
      details: error.response?.data?.error || error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Flux AI Backend running on port ${PORT}`);
  console.log(`📝 API Key configured: ${process.env.FLUX_API_KEY ? 'Yes' : 'No'}`);
});
