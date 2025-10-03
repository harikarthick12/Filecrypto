require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const mongoose = require('mongoose');
const File = require('./models/File');
const API_URL = "https://filecrypto-backend.onrender.com";

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from uploads folder
app.use('/uploads', express.static(uploadsDir));

// Configure multer for file uploads
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
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

// Routes
app.post('/api/files/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const code = uuidv4().substring(0, 8);
    const expiryHours = process.env.FILE_EXPIRY_HOURS || 24;
    const expiresAt = new Date(Date.now() + expiryHours * 60 * 60 * 1000);

    const fileData = new File({
      code,
      originalName: req.file.originalname,
      filePath: req.file.path,
      expiresAt,
      createdAt: new Date()
    });

    await fileData.save();

    res.status(201).json({
      code,
      originalName: req.file.originalname,
      expiresAt
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Server error during upload' });
  }
});

app.get('/api/files/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const file = await File.findOne({ code });

    if (!file) {
      return res.status(404).json({ error: 'File not found or expired' });
    }

    if (new Date() > new Date(file.expiresAt)) {
      await File.deleteOne({ code });
      if (fs.existsSync(file.filePath)) {
        fs.unlinkSync(file.filePath);
      }
      return res.status(404).json({ error: 'File has expired' });
    }

    res.json({
      code: file.code,
      originalName: file.originalName,
      expiresAt: file.expiresAt
    });
  } catch (error) {
    console.error('Get file info error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/files/download/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const file = await File.findOne({ code });

    if (!file) {
      return res.status(404).json({ error: 'File not found or expired' });
    }

    if (new Date() > new Date(file.expiresAt)) {
      await File.deleteOne({ code });
      if (fs.existsSync(file.filePath)) {
        fs.unlinkSync(file.filePath);
      }
      return res.status(404).json({ error: 'File has expired' });
    }

    res.download(file.filePath, file.originalName);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Server error during download' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});