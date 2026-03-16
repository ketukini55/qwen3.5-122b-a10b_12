import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextToImage from './components/TextToImage';
import ImageToImage from './components/ImageToImage';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('text-to-image');

  return (
    <div className="app">
      {/* Background effects */}
      <div className="bg-gradient"></div>
      <div className="bg-grid"></div>

      {/* Header */}
      <motion.header
        className="header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container">
          <motion.h1
            className="gradient-text"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            ✨ Flux AI Studio
          </motion.h1>
          <motion.p
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Transform your imagination into stunning visuals with AI
          </motion.p>
        </div>
      </motion.header>

      {/* Tab Navigation */}
      <motion.div
        className="tab-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="tabs">
          <motion.button
            className={`tab ${activeTab === 'text-to-image' ? 'active' : ''}`}
            onClick={() => setActiveTab('text-to-image')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="tab-icon">✍️</span>
            Text to Image
          </motion.button>
          <motion.button
            className={`tab ${activeTab === 'image-to-image' ? 'active' : ''}`}
            onClick={() => setActiveTab('image-to-image')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="tab-icon">🎨</span>
            Image to Image
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          {activeTab === 'text-to-image' ? (
            <motion.div
              key="text-to-image"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <TextToImage />
            </motion.div>
          ) : (
            <motion.div
              key="image-to-image"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ImageToImage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <p>Powered by Flux.2-Klein-4B AI Model 🚀</p>
      </motion.footer>
    </div>
  );
}

export default App;
