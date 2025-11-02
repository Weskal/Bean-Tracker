import { FaCalendarAlt, FaGlobe, FaFire, FaCoffee, FaStar } from 'react-icons/fa';
import './CoffeeCard.css';

function CoffeeCard({ coffee, onDelete }) {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar 
        key={i} 
        className={i < rating ? 'star-filled' : 'star-empty'}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja excluir "${coffee.name}"?`)) {
      onDelete(coffee._id);
    }
  };

  return (
    <div className="coffee-card">
      <div className="coffee-card-header">
        <h3 className="coffee-name">{coffee.name}</h3>
        <div className="coffee-rating">
          {renderStars(coffee.rating)}
        </div>
      </div>
      
      <div className="coffee-info">
        <div className="info-item">
          <span className="info-label">
            <FaCalendarAlt className="info-icon" />
            Degustado em:
          </span>
          <span className="info-value">{formatDate(coffee.tastingDate)}</span>
        </div>

        <div className="info-item">
          <span className="info-label">
            <FaGlobe className="info-icon" />
            Origem:
          </span>
          <span className="info-value">{coffee.origin}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">
            <FaFire className="info-icon" />
            Torra:
          </span>
          <span className="info-value">{coffee.roastLevel}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">
            <FaCoffee className="info-icon" />
            Método:
          </span>
          <span className="info-value">{coffee.brewMethod}</span>
        </div>
      </div>

      {coffee.flavorNotes && coffee.flavorNotes.length > 0 && (
        <div className="flavor-notes">
          {coffee.flavorNotes.map((note, index) => (
            <span key={index} className="flavor-tag">{note}</span>
          ))}
        </div>
      )}

      {coffee.notes && (
        <p className="coffee-notes">{coffee.notes}</p>
      )}
    </div>
  );
}

export default CoffeeCard;