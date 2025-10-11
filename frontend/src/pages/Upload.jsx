import { useState } from 'react';
import axios from 'axios';
import './Upload.css';

function Upload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);
  const API = process.env.REACT_APP_API_URL;
axios.post(`${API}/api/upload`, formData);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError(null);
    setUploadResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setUploading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploadResult(response.data);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = () => {
    if (uploadResult?.code) {
      navigator.clipboard.writeText(uploadResult.code);
      alert('Code copied to clipboard!');
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload File</h1>
      <p className="description">Upload a file to share it securely with a unique code</p>

      <div className="upload-card">
        {!uploadResult ? (
          <form onSubmit={handleSubmit}>
            <div className="file-input-container">
              <input 
                type="file" 
                id="file" 
                onChange={handleFileChange}
                className="file-input"
              />
              <label htmlFor="file" className="file-label">
                {file ? file.name : 'Choose a file'}
              </label>
              {file && (
                <div className="file-info">
                  <p>Selected file: {file.name}</p>
                  <p>Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              )}
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <button 
              type="submit" 
              className="primary upload-btn" 
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload File'}
            </button>
          </form>
        ) : (
          <div className="upload-success">
            <div className="alert alert-success">
              File uploaded successfully!
            </div>
            
            <div className="code-container">
              <h3>Your Unique Code:</h3>
              <div className="code-display">
                <span className="code">{uploadResult.code}</span>
                <button 
                  className="secondary copy-btn" 
                  onClick={copyToClipboard}
                >
                  Copy
                </button>
              </div>
              <p className="expiry-note">
                This file will expire on {new Date(uploadResult.expiresAt).toLocaleString()}
              </p>
            </div>

            <button 
              className="primary" 
              onClick={() => {
                setFile(null);
                setUploadResult(null);
              }}
            >
              Upload Another File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;