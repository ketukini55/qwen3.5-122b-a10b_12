import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './ImageToImage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function ImageToImage() {
  const [prompt, setPrompt] = useState('');
  const [sourceImage, setSourceImage] = useState(null);
  const [sourcePreview, setSourcePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Image size must be less than 10MB');
        return;
      }

      setSourceImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSourcePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    if (!sourceImage) {
      setError('Please select an image');
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const formData = new FormData();
      formData.append('image', sourceImage);
      formData.append('prompt', prompt.trim());
      formData.append('strength', '0.8');

      const response = await axios.post(`${API_URL}/api/image-to-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setGeneratedImage(response.data.imageUrl);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate image. Please try again.');
      console.error('Generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `flux-ai-i2i-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setPrompt('');
    setSourceImage(null);
    setSourcePreview(null);
    setGeneratedImage(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="generator-container">
      <motion.div
        className="input-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="input-wrapper">
          <div className="upload-area">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="file-input"
              id="file-input"
              disabled={loading}
            />
            <label htmlFor="file-input" className="upload-label">
              {sourcePreview ? (
                <div className="preview-container">
                  <img src={sourcePreview} alt="Source" className="preview-image" />
                  <div className="change-overlay">
                    <span>📷 Change Image</span>
                  </div>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <span className="upload-icon">📸</span>
                  <p>Click to upload an image</p>
                  <p className="upload-hint">PNG, JPG up to 10MB</p>
                </div>
              )}
            </label>
          </div>

          <textarea
            className="prompt-input"
            placeholder="Describe how you want to transform the image... (e.g., Transform into a watercolor painting)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            disabled={loading}
          />

          <motion.button
            className="generate-btn"
            onClick={handleGenerate}
            disabled={loading || !prompt.trim() || !sourceImage}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Transforming...
              </>
            ) : (
              '🎨 Transform Image'
            )}
          </motion.button>
        </div>

        {error && (
          <motion.div
            className="error-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ⚠️ {error}
          </motion.div>
        )}
      </motion.div>

      {(loading || generatedImage) && (
        <motion.div
          className="result-section"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="result-card">
            {loading ? (
              <div className="loading-container">
                <motion.div
                  className="loading-spinner"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  🎨
                </motion.div>
                <p>Transforming your image...</p>
                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 30, ease: "linear" }}
                  />
                </div>
              </div>
            ) : generatedImage ? (
              <>
                <div className="comparison">
                  <div className="comparison-item">
                    <h3>Original</h3>
                    <img src={sourcePreview} alt="Original" className="comparison-image" />
                  </div>
                  <div className="comparison-arrow">→</div>
                  <div className="comparison-item">
                    <h3>Transformed</h3>
                    <motion.img
                      src={generatedImage}
                      alt="Generated"
                      className="comparison-image"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
                <div className="result-actions">
                  <motion.button
                    className="download-btn"
                    onClick={handleDownload}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    💾 Download
                  </motion.button>
                  <motion.button
                    className="new-btn"
                    onClick={handleReset}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🔄 Start Over
                  </motion.button>
                </div>
              </>
            ) : null}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default ImageToImage;
