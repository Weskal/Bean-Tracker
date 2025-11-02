import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">
          <span className="logo-icon">☕</span>
          BeanTracker
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/coffees" className="nav-link">Avaliações de cafés</Link>
          <Link to="/create" className="btn btn-primary">+ Nova Avaliação</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;