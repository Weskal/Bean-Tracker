import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './CreateCoffee.css';

function CreateCoffee() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    origin: '',
    roastLevel: 'medium',
    flavorNotes: '',
    brewMethod: '',
    rating: 3,
    notes: '',
    tastingDate: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Converte flavorNotes de string para array
      const dataToSend = {
        ...formData,
        flavorNotes: formData.flavorNotes
          .split(',')
          .map(note => note.trim())
          .filter(note => note !== '')
      };

      await api.createCoffee(dataToSend);
      alert('✅ Café avaliado com sucesso!');
      navigate('/coffees');
    } catch (err) {
      alert('❌ Erro ao salvar: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="create-coffee-page">
      <h1 className="page-title">Nova Avaliação de Café</h1>
      
      <form className="coffee-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome do Café *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Ex: Bourbon Amarelo"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="origin">Origem *</label>
            <input
              type="text"
              id="origin"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              required
              placeholder="Ex: Brasil, Minas Gerais"
            />
          </div>

          <div className="form-group">
            <label htmlFor="roastLevel">Nível de Torra *</label>
            <select
              id="roastLevel"
              name="roastLevel"
              value={formData.roastLevel}
              onChange={handleChange}
              required
            >
              <option value="light">Clara</option>
              <option value="medium">Média</option>
              <option value="dark">Escura</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="brewMethod">Método de Preparo *</label>
            <input
              type="text"
              id="brewMethod"
              name="brewMethod"
              value={formData.brewMethod}
              onChange={handleChange}
              required
              placeholder="Ex: Espresso, V60, Prensa Francesa"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tastingDate">Data da Degustação</label>
            <input
              type="date"
              id="tastingDate"
              name="tastingDate"
              value={formData.tastingDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="rating">Avaliação * ({formData.rating}/5)</label>
          <input
            type="range"
            id="rating"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            className="rating-slider"
          />
          <div className="rating-display">
            {'⭐'.repeat(formData.rating)}{'☆'.repeat(5 - formData.rating)}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="flavorNotes">Notas de Sabor</label>
          <input
            type="text"
            id="flavorNotes"
            name="flavorNotes"
            value={formData.flavorNotes}
            onChange={handleChange}
            placeholder="Ex: chocolate, caramelo, nozes (separar por vírgula)"
          />
          <small>Separe múltiplas notas por vírgula</small>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Observações</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            placeholder="Suas impressões sobre o café..."
          />
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/coffees')}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar Avaliação'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCoffee;