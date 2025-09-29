const File = require('../models/File');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Upload file and generate unique code
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Generate unique code
    const code = uuidv4().substring(0, 8);
    
    // Calculate expiry time (default 24 hours)
    const expiryHours = process.env.FILE_EXPIRY_HOURS || 24;
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + parseInt(expiryHours));

    // Create new file record
    const file = new File({
      code,
      originalName: req.file.originalname,
      filePath: req.file.path,
      expiresAt
    });

    await file.save();

    res.status(201).json({
      message: 'File uploaded successfully',
      code,
      expiresAt
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Download file using code
exports.downloadFile = async (req, res) => {
  try {
    const { code } = req.params;

    // Find file by code
    const file = await File.findOne({ code });

    if (!file) {
      return res.status(404).json({ message: 'File not found or has expired' });
    }

    // Check if file exists on disk
    if (!fs.existsSync(file.filePath)) {
      await File.findByIdAndDelete(file._id);
      return res.status(404).json({ message: 'File not found on server' });
    }

    // Set headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);
    
    // Send file
    res.sendFile(path.resolve(file.filePath));
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get file info by code
exports.getFileInfo = async (req, res) => {
  try {
    const { code } = req.params;
    
    // Find file by code
    const file = await File.findOne({ code });

    if (!file) {
      return res.status(404).json({ message: 'File not found or has expired' });
    }

    res.status(200).json({
      originalName: file.originalName,
      expiresAt: file.expiresAt
    });
  } catch (error) {
    console.error('Error getting file info:', error);
    res.status(500).json({ message: 'Server error' });
  }
};