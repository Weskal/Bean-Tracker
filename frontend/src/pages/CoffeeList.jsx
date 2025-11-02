import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes, FaCoffee, FaSpinner } from 'react-icons/fa';
import api from '../services/api';
import CoffeeCard from '../components/CoffeeCard';
import './CoffeeList.css';

function CoffeeList() {
  const navigate = useNavigate();
  const [coffees, setCoffees] = useState([]);
  const [filteredCoffees, setFilteredCoffees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCoffees();
  }, []);

  useEffect(() => {
    // Filtrar cafés quando searchTerm muda
    const filtered = coffees.filter(coffee =>
      coffee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coffee.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coffee.flavorNotes.some(note => note.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCoffees(filtered);
  }, [searchTerm, coffees]);

  const fetchCoffees = async () => {
    try {
      const data = await api.getAllCoffees();
      setCoffees(data);
      setFilteredCoffees(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteCoffee(id);
      setCoffees(coffees.filter(coffee => coffee._id !== id));
    } catch (err) {
      alert('Erro ao excluir café: ' + err.message);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/coffee/${id}`);
  };

  if (loading) {
    return (
      <div className="loading">
        <FaSpinner className="spinner" />
        <p>Carregando cafés...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error">
        <p>❌ Erro: {error}</p>
      </div>
    );
  }

  return (
    <div className="coffee-list-page">
      <div className="page-header">
        <h1 className="page-title">
          <FaCoffee className="title-icon" />
          Minhas Avaliações de Café
        </h1>
        {coffees.length > 0 && (
          <p className="page-subtitle">
            {filteredCoffees.length} {filteredCoffees.length === 1 ? 'avaliação encontrada' : 'avaliações encontradas'}
          </p>
        )}
      </div>
      
      {coffees.length > 0 && (
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por nome, origem ou notas de sabor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm('')}
              aria-label="Limpar busca"
            >
              <FaTimes />
            </button>
          )}
        </div>
      )}

      {filteredCoffees.length === 0 && searchTerm ? (
        <div className="empty-state">
          <FaCoffee className="empty-icon" />
          <p>Nenhum café encontrado para "{searchTerm}"</p>
          <p className="empty-hint">Tente buscar por outros termos</p>
        </div>
      ) : filteredCoffees.length === 0 ? (
        <div className="empty-state">
          <FaCoffee className="empty-icon" />
          <p>Nenhum café avaliado ainda.</p>
          <p className="empty-hint">Que tal adicionar sua primeira avaliação?</p>
        </div>
      ) : (
        <div className="coffee-grid">
          {filteredCoffees.map((coffee, index) => (
            <div 
              key={coffee._id} 
              onClick={() => handleCardClick(coffee._id)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CoffeeCard 
                coffee={coffee} 
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CoffeeList;