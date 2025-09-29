import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Secure File Sharing Made Simple</h1>
        <p>Upload files and share them securely with a unique one-time code</p>
        
        <div className="action-buttons">
          <button 
            className="primary btn-large"
            onClick={() => navigate('/upload')}
          >
            Upload File
          </button>
          <button 
            className="secondary btn-large"
            onClick={() => navigate('/download')}
          >
            Download File
          </button>
        </div>
      </div>

      <div className="features-section">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>1. Upload</h3>
            <p>Select and upload your file securely to our server</p>
          </div>
          <div className="feature-card">
            <h3>2. Share</h3>
            <p>Get a unique code to share with your recipient</p>
          </div>
          <div className="feature-card">
            <h3>3. Download</h3>
            <p>Recipient enters the code to download the file</p>
          </div>
          <div className="feature-card">
            <h3>4. Auto-Expire</h3>
            <p>Files automatically expire after 24 hours for security</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;