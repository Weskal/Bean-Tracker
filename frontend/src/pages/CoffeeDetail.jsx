import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import './CoffeeDetail.css';

function CoffeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [coffee, setCoffee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCoffee();
  }, [id, location.search]);

  const fetchCoffee = async () => {
    try {
      const data = await api.getCoffeeById(id);
      setCoffee(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Tem certeza que deseja excluir "${coffee.name}"?`)) {
      try {
        await api.deleteCoffee(id);
        alert('✅ Café excluído com sucesso!');
        navigate('/coffees');
      } catch (err) {
        alert('❌ Erro ao excluir: ' + err.message);
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) return <div className="loading">☕ Carregando...</div>;
  if (error) return <div className="error">❌ Erro: {error}</div>;
  if (!coffee) return <div className="error">☕ Café não encontrado</div>;

  return (
    <div className="coffee-detail-page">
      <button className="btn-back" onClick={() => navigate('/coffees')}>
        ← Voltar
      </button>

      <div className="detail-card">
        <div className="detail-header">
          <div>
            <h1 className="detail-title">{coffee.name}</h1>
            <p className="detail-origin">🌍 {coffee.origin}</p>
          </div>
          <div className="detail-rating">
            <div className="rating-stars">{renderStars(coffee.rating)}</div>
            <div className="rating-number">{coffee.rating}/5</div>
          </div>
        </div>

        <div className="detail-info-grid">
          <div className="info-card">
            <span className="info-icon">📅</span>
            <div>
              <p className="info-label">Degustado em</p>
              <p className="info-value">{formatDate(coffee.tastingDate)}</p>
            </div>
          </div>

          <div className="info-card">
            <span className="info-icon">🔥</span>
            <div>
              <p className="info-label">Nível de Torra</p>
              <p className="info-value">{coffee.roastLevel}</p>
            </div>
          </div>

          <div className="info-card">
            <span className="info-icon">☕</span>
            <div>
              <p className="info-label">Método de Preparo</p>
              <p className="info-value">{coffee.brewMethod}</p>
            </div>
          </div>
        </div>

        {coffee.flavorNotes && coffee.flavorNotes.length > 0 && (
          <div className="detail-section">
            <h3 className="section-title">Notas de Sabor</h3>
            <div className="flavor-tags">
              {coffee.flavorNotes.map((note, index) => (
                <span key={index} className="flavor-tag-large">{note}</span>
              ))}
            </div>
          </div>
        )}

        {coffee.notes && (
          <div className="detail-section">
            <h3 className="section-title">Observações</h3>
            <p className="detail-notes">{coffee.notes}</p>
          </div>
        )}

        <div className="detail-actions">
          <button className="btn btn-edit" onClick={handleEdit}>
            ✏️ Editar Avaliação
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            🗑️ Excluir Avaliação
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoffeeDetail;