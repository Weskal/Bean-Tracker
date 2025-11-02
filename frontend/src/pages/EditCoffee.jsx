import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaCoffee, 
  FaGlobe, 
  FaFire, 
  FaCalendarAlt, 
  FaStar, 
  FaTags, 
  FaEdit,
  FaCheck,
  FaSpinner,
  FaArrowLeft
} from 'react-icons/fa';
import api from '../services/api';
import './CreateCoffee.css';

function EditCoffee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [formProgress, setFormProgress] = useState(0);
  const [flavorTags, setFlavorTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    origin: '',
    roastLevel: 'medium',
    flavorNotes: '',
    brewMethod: '',
    rating: 3,
    notes: '',
    tastingDate: ''
  });

  useEffect(() => {
    fetchCoffee();
  }, [id]);

  const fetchCoffee = async () => {
    try {
      const data = await api.getCoffeeById(id);
      
      const formattedDate = new Date(data.tastingDate).toISOString().split('T')[0];
      
      setFormData({
        name: data.name,
        origin: data.origin,
        roastLevel: data.roastLevel,
        flavorNotes: data.flavorNotes.join(', '),
        brewMethod: data.brewMethod,
        rating: data.rating,
        notes: data.notes || '',
        tastingDate: formattedDate
      });
      
      setFlavorTags(data.flavorNotes);
      calculateProgress({
        ...data,
        flavorNotes: data.flavorNotes.join(', ')
      });
      setLoadingData(false);
    } catch (err) {
      alert('❌ Erro ao carregar café: ' + err.message);
      navigate('/coffees');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = {
      ...formData,
      [name]: value
    };
    setFormData(newData);
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    if (name === 'flavorNotes') {
      const tags = value.split(',').map(t => t.trim()).filter(t => t !== '');
      setFlavorTags(tags);
    }
    
    calculateProgress(newData);
  };

  const calculateProgress = (data) => {
    let filled = 0;
    const total = 7;
    
    if (data.name) filled++;
    if (data.origin) filled++;
    if (data.roastLevel) filled++;
    if (data.brewMethod) filled++;
    if (data.rating) filled++;
    if (data.flavorNotes) filled++;
    if (data.notes) filled++;
    
    setFormProgress(Math.round((filled / total) * 100));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Campo obrigatório';
    }
    
    if (!formData.origin || formData.origin.trim() === '') {
      newErrors.origin = 'Campo obrigatório';
    }
    
    if (!formData.brewMethod || formData.brewMethod.trim() === '') {
      newErrors.brewMethod = 'Campo obrigatório';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        const firstErrorField = Object.keys(newErrors)[0];
        if (firstErrorField) {
          const element = document.getElementById(firstErrorField);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.focus();
          }
        }
      }, 200);
      return;
    }

    setLoading(true);

    try {
      const dataToSend = {
        ...formData,
        flavorNotes: formData.flavorNotes
          .split(',')
          .map(note => note.trim())
          .filter(note => note !== '')
      };

      await api.updateCoffee(id, dataToSend);
      alert('✅ Café atualizado com sucesso!');
      window.location.href = `/coffee/${id}`; 
    } catch (err) {
      alert('❌ Erro ao atualizar: ' + err.message);
      setLoading(false);
    }
  };

  if (loadingData) {
    return <div className="loading">☕ Carregando dados...</div>;
  }

  return (
    <div className="create-coffee-page">
      <div className="page-header">
        <button 
          className="back-button"
          onClick={() => navigate(`/coffee/${id}`)}
          type="button"
        >
          <FaArrowLeft />
          <span>Voltar</span>
        </button>
        <div className="header-content">
          <div className="header-icon-wrapper">
            <FaEdit className="header-icon" />
          </div>
          <h1 className="page-title">Editar Avaliação</h1>
          <p className="page-subtitle">Atualize as informações do seu café</p>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-label">Progresso do formulário</span>
          <span className="progress-percentage">{formProgress}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${formProgress}%` }}
          ></div>
        </div>
      </div>
      
      <form className="coffee-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="section-icon">
            <FaCoffee />
          </div>
          <h2 className="section-title">Informações Básicas</h2>
        </div>

        <div className="form-group">
          <label htmlFor="name">
            <FaCoffee className="label-icon" />
            Nome do Café *
          </label>
          <div className="input-wrapper">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Bourbon Amarelo"
              className={`${formData.name ? 'filled' : ''} ${errors.name ? 'error' : ''}`}
            />
            {formData.name && !errors.name && <FaCheck className="input-check" />}
          </div>
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="origin">
              <FaGlobe className="label-icon" />
              Origem *
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="origin"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                placeholder="Ex: Brasil, Minas Gerais"
                className={`${formData.origin ? 'filled' : ''} ${errors.origin ? 'error' : ''}`}
              />
              {formData.origin && !errors.origin && <FaCheck className="input-check" />}
            </div>
            {errors.origin && <span className="error-message">{errors.origin}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="roastLevel">
              <FaFire className="label-icon" />
              Nível de Torra *
            </label>
            <div className="select-wrapper">
              <select
                id="roastLevel"
                name="roastLevel"
                value={formData.roastLevel}
                onChange={handleChange}
                className={formData.roastLevel ? 'filled' : ''}
              >
                <option value="light">Clara</option>
                <option value="medium">Média</option>
                <option value="dark">Escura</option>
              </select>
              {formData.roastLevel && <FaCheck className="input-check" />}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="brewMethod">
              <FaCoffee className="label-icon" />
              Método de Preparo *
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="brewMethod"
                name="brewMethod"
                value={formData.brewMethod}
                onChange={handleChange}
                placeholder="Ex: Espresso, V60, Prensa Francesa"
                className={`${formData.brewMethod ? 'filled' : ''} ${errors.brewMethod ? 'error' : ''}`}
              />
              {formData.brewMethod && !errors.brewMethod && <FaCheck className="input-check" />}
            </div>
            {errors.brewMethod && <span className="error-message">{errors.brewMethod}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="tastingDate">
              <FaCalendarAlt className="label-icon" />
              Data da Degustação
            </label>
            <div className="input-wrapper">
              <input
                type="date"
                id="tastingDate"
                name="tastingDate"
                value={formData.tastingDate}
                onChange={handleChange}
                className="filled"
              />
              <FaCheck className="input-check" />
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="section-icon">
            <FaStar />
          </div>
          <h2 className="section-title">Avaliação</h2>
        </div>

        <div className="form-group">
          <label htmlFor="rating">
            <FaStar className="label-icon" />
            Avaliação * <span className="rating-value">({formData.rating}/5)</span>
          </label>
          <div className="rating-container">
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
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar 
                  key={i} 
                  className={i < formData.rating ? 'star-filled' : 'star-empty'}
                  onClick={() => setFormData({...formData, rating: i + 1})}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="section-icon">
            <FaTags />
          </div>
          <h2 className="section-title">Detalhes</h2>
        </div>

        <div className="form-group">
          <label htmlFor="flavorNotes">
            <FaTags className="label-icon" />
            Notas de Sabor
          </label>
          <div className="input-wrapper">
            <input
              type="text"
              id="flavorNotes"
              name="flavorNotes"
              value={formData.flavorNotes}
              onChange={handleChange}
              placeholder="Ex: chocolate, caramelo, nozes (separar por vírgula)"
              className={formData.flavorNotes ? 'filled' : ''}
            />
            {formData.flavorNotes && <FaCheck className="input-check" />}
          </div>
          <small>Separe múltiplas notas por vírgula</small>
          {flavorTags.length > 0 && (
            <div className="flavor-tags-preview">
              {flavorTags.map((tag, index) => (
                <span key={index} className="flavor-tag-preview">{tag}</span>
              ))}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="notes">
            <FaEdit className="label-icon" />
            Observações
          </label>
          <div className="textarea-wrapper">
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="5"
              placeholder="Suas impressões sobre o café..."
              className={formData.notes ? 'filled' : ''}
            />
            {formData.notes && <FaCheck className="input-check textarea-check" />}
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="spinner-icon" />
                <span>Salvando...</span>
              </>
            ) : (
              <>
                <FaCheck />
                <span>Atualizar Avaliação</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCoffee;