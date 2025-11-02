import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import CoffeeCard from '../components/CoffeeCard';
import coffee1 from '../assets/images/coffee_1.jpg';
import coffee2 from '../assets/images/coffee_2.jpg';
import coffee3 from '../assets/images/coffee_3.jpg';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [recentCoffees, setRecentCoffees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentCoffees();
  }, []);

  const fetchRecentCoffees = async () => {
    try {
      const data = await api.getAllCoffees();
      
      // Ordenar por: 1º rating (maior primeiro), 2º data (mais recente)
      const sorted = data.sort((a, b) => {
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        return new Date(b.tastingDate) - new Date(a.tastingDate);
      });
      
      setRecentCoffees(sorted.slice(0, 3));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/coffee/${id}`);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Bem-vindo ao <span className="highlight">BeanTracker</span>
          </h1>
          <p className="hero-subtitle">
            Registre, avalie e acompanhe suas experiências com cafés especiais
          </p>
          <Link to="/create" className="btn btn-primary btn-large">
            ☕ Adicionar Nova Avaliação
          </Link>
        </div>
      </section>

      {/* Coffee Gallery */}
      <section className="gallery">
        <div className="gallery-grid">
          <div className="gallery-item">
            <img src={coffee1} alt="Café especial" />
            <div className="gallery-overlay">
              <h3>Descubra</h3>
              <p>Novos sabores</p>
            </div>
          </div>
          <div className="gallery-item">
            <img src={coffee2} alt="Café artesanal" />
            <div className="gallery-overlay">
              <h3>Avalie</h3>
              <p>Suas experiências</p>
            </div>
          </div>
          <div className="gallery-item">
            <img src={coffee3} alt="Café premium" />
            <div className="gallery-overlay">
              <h3>Compartilhe</h3>
              <p>Suas descobertas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Reviews */}
      <section className="recent-section">
        <div className="section-header">
          <h2 className="section-title">Últimas Avaliações</h2>
          <Link to="/coffees" className="view-all">
            Ver todas →
          </Link>
        </div>

        {loading ? (
          <div className="loading">☕ Carregando...</div>
        ) : recentCoffees.length === 0 ? (
          <div className="empty-message">
            <p>☕ Nenhuma avaliação ainda.</p>
            <p>Comece adicionando seu primeiro café!</p>
          </div>
        ) : (
          <div className="recent-grid">
            {recentCoffees.map(coffee => (
              <div 
                key={coffee._id} 
                onClick={() => handleCardClick(coffee._id)}
                style={{ cursor: 'pointer' }}
              >
                <CoffeeCard 
                  coffee={coffee}
                  onDelete={() => fetchRecentCoffees()}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Pronto para começar sua jornada no mundo dos cafés?</h2>
        <Link to="/create" className="btn btn-primary btn-large">
          Avaliar Meu Primeiro Café
        </Link>
      </section>
    </div>
  );
}

export default Home;