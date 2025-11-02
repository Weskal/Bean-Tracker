import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  if (loading) return <div className="loading">☕ Carregando cafés...</div>;
  if (error) return <div className="error">❌ Erro: {error}</div>;

  return (
    <div className="coffee-list-page">
      <h1 className="page-title">Minhas Avaliações de Café</h1>
      
      {coffees.length > 0 && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Buscar por nome, origem ou notas de sabor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm('')}
            >
              ✕
            </button>
          )}
        </div>
      )}

      {filteredCoffees.length === 0 && searchTerm ? (
        <div className="empty-state">
          <p>☕ Nenhum café encontrado para "{searchTerm}"</p>
        </div>
      ) : filteredCoffees.length === 0 ? (
        <div className="empty-state">
          <p>☕ Nenhum café avaliado ainda.</p>
          <p>Que tal adicionar sua primeira avaliação?</p>
        </div>
      ) : (
        <div className="coffee-grid">
          {filteredCoffees.map(coffee => (
            <div key={coffee._id} onClick={() => handleCardClick(coffee._id)}>
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