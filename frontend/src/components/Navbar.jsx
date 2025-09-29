import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          FileShare
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/upload" className="nav-link">Upload</Link>
          </li>
          <li className="nav-item">
            <Link to="/download" className="nav-link">Download</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;