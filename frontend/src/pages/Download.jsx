import { useState } from 'react';
import axios from 'axios';
import './Download.css';

function Download() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const API = process.env.REACT_APP_API_URL;
axios.post(`${API}/api/upload`, formData);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!code || code.trim() === '') {
      setError('Please enter a valid code');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // First get file info to display to user
      const infoResponse = await axios.get(`http://localhost:5000/api/files/info/${code.trim()}`);
      setFileInfo(infoResponse.data);
      
    } catch (err) {
      console.error('Error fetching file info:', err);
      setError(err.response?.data?.message || 'File not found or has expired');
      setFileInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = () => {
    // Redirect to download endpoint
    window.location.href = `http://localhost:5000/api/files/download/${code.trim()}`;
  };

  return (
    <div className="download-container">
      <h1>Download File</h1>
      <p className="description">Enter the unique code to download your file</p>

      <div className="download-card">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="code">Enter Code:</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError(null);
                setFileInfo(null);
              }}
              placeholder="Enter your unique code"
              maxLength="8"
            />
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <button 
            type="submit" 
            className="primary verify-btn" 
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>

        {fileInfo && (
          <div className="file-info-container">
            <div className="alert alert-success">
              File found! Ready to download.
            </div>
            
            <div className="file-details">
              <h3>File Details:</h3>
              <p><strong>Name:</strong> {fileInfo.originalName}</p>
              <p><strong>Expires:</strong> {new Date(fileInfo.expiresAt).toLocaleString()}</p>
            </div>

            <button 
              className="primary download-btn" 
              onClick={downloadFile}
            >
              Download File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Download;