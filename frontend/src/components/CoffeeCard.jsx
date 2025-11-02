import './CoffeeCard.css';

function CoffeeCard({ coffee, onDelete }) {
  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
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
      {/* <button className="delete-btn" onClick={handleDelete} title="Excluir">
        🗑️
      </button> */}

      <div className="coffee-card-header">
        <h3 className="coffee-name">{coffee.name}</h3>
        <span className="coffee-rating">{renderStars(coffee.rating)}</span>
      </div>
      
      <div className="coffee-info">
        <div className="info-item">
          <span className="info-label">📅 Degustado em:</span>
          <span className="info-value">{formatDate(coffee.tastingDate)}</span>
        </div>

        <div className="info-item">
          <span className="info-label">🌍 Origem:</span>
          <span className="info-value">{coffee.origin}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">🔥 Torra:</span>
          <span className="info-value">{coffee.roastLevel}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">☕ Método:</span>
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