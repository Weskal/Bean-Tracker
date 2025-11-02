import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaClipboardList, FaPlus, FaCoffee } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">
          <FaCoffee className="logo-icon" />
          <span className="logo-text">BeanTracker</span>
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <FaHome className="nav-icon" />
            <span>Home</span>
          </Link>
          <Link 
            to="/coffees" 
            className={`nav-link ${location.pathname === '/coffees' ? 'active' : ''}`}
          >
            <FaClipboardList className="nav-icon" />
            <span>Avaliações</span>
          </Link>
          <Link to="/create" className="btn btn-primary nav-btn">
            <FaPlus className="btn-icon" />
            <span>Nova Avaliação</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;