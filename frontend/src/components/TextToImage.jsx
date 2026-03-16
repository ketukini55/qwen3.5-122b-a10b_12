import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './TextToImage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function TextToImage() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const response = await axios.post(`${API_URL}/api/text-to-image`, {
        prompt: prompt.trim(),
        width: 1024,
        height: 768
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
      link.download = `flux-ai-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
          <textarea
            className="prompt-input"
            placeholder="Describe the image you want to create... (e.g., A futuristic city at sunset with flying cars)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            disabled={loading}
          />
          <motion.button
            className="generate-btn"
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Generating...
              </>
            ) : (
              '✨ Generate Image'
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
                <p>Creating your masterpiece...</p>
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
                <motion.img
                  src={generatedImage}
                  alt="Generated"
                  className="generated-image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
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
                    onClick={() => {
                      setGeneratedImage(null);
                      setPrompt('');
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🎨 Create New
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

export default TextToImage;
