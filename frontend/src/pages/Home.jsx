import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCoffee, FaChartLine, FaStar, FaGlobe, FaRocket, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
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
  const [stats, setStats] = useState({ total: 0, avgRating: 0, topRating: 0 });

  useEffect(() => {
    fetchRecentCoffees();
  }, []);

  const fetchRecentCoffees = async () => {
    try {
      const data = await api.getAllCoffees();
      
      // Calcular estatísticas
      if (data.length > 0) {
        const total = data.length;
        const avgRating = (data.reduce((sum, c) => sum + c.rating, 0) / total).toFixed(1);
        const topRating = Math.max(...data.map(c => c.rating));
        setStats({ total, avgRating, topRating });
      }
      
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
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="hero-icon-wrapper">
            <FaCoffee className="hero-icon" />
          </div>
          <h1 className="hero-title">
            Bem-vindo(a) ao <span className="highlight">BeanTracker</span>
          </h1>
          <p className="hero-subtitle">
            Registre, avalie e acompanhe suas experiências com cafés especiais de forma elegante e intuitiva
          </p>
          <div className="hero-features">
            <div className="hero-feature">
              <FaCheckCircle />
              <span>Rastreamento detalhado</span>
            </div>
            <div className="hero-feature">
              <FaCheckCircle />
              <span>Avaliações precisas</span>
            </div>
            <div className="hero-feature">
              <FaCheckCircle />
              <span>Histórico completo</span>
            </div>
          </div>
          <Link to="/create" className="btn btn-primary btn-large hero-cta">
            <FaRocket />
            <span>Começar Agora</span>
            <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      {stats.total > 0 && (
        <section className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">
              <FaCoffee />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Cafés Avaliados</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaChartLine />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.avgRating}</div>
              <div className="stat-label">Avaliação Média</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaStar />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.topRating}</div>
              <div className="stat-label">Melhor Avaliação</div>
            </div>
          </div>
        </section>
      )}

      {/* Coffee Gallery */}
      <section className="gallery">
        <div className="section-header">
          <h2 className="section-title">Explore o Mundo dos Cafés</h2>
          <p className="section-description">Descubra novas experiências e sabores únicos</p>
        </div>
        <div className="gallery-grid">
          <div className="gallery-item">
            <div className="gallery-image-wrapper">
              <img src={coffee1} alt="Café especial" />
            </div>
            <div className="gallery-overlay">
              <div className="gallery-icon">
                <FaGlobe />
              </div>
              <h3>Descubra</h3>
              <p>Novos sabores do mundo todo</p>
            </div>
          </div>
          <div className="gallery-item">
            <div className="gallery-image-wrapper">
              <img src={coffee2} alt="Café artesanal" />
            </div>
            <div className="gallery-overlay">
              <div className="gallery-icon">
                <FaStar />
              </div>
              <h3>Avalie</h3>
              <p>Suas experiências detalhadamente</p>
            </div>
          </div>
          <div className="gallery-item">
            <div className="gallery-image-wrapper">
              <img src={coffee3} alt="Café premium" />
            </div>
            <div className="gallery-overlay">
              <div className="gallery-icon">
                <FaChartLine />
              </div>
              <h3>Compartilhe</h3>
              <p>Suas descobertas e aprendizados</p>
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
          <div className="loading">
            <FaCoffee className="loading-icon" />
            <p>Carregando suas avaliações...</p>
          </div>
        ) : recentCoffees.length === 0 ? (
          <div className="empty-message">
            <FaCoffee className="empty-icon" />
            <h3>Nenhuma avaliação ainda</h3>
            <p>Comece adicionando seu primeiro café e comece sua jornada!</p>
            <Link to="/create" className="btn btn-primary">
              <FaRocket />
              <span>Criar Primeira Avaliação</span>
            </Link>
          </div>
        ) : (
          <div className="recent-grid">
            {recentCoffees.map((coffee, index) => (
              <div 
                key={coffee._id} 
                onClick={() => handleCardClick(coffee._id)}
                className="recent-card-wrapper"
                style={{ animationDelay: `${index * 0.2}s` }}
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
        <div className="cta-content">
          <div className="cta-icon-wrapper">
            <FaRocket className="cta-icon" />
          </div>
          <h2>Pronto para começar sua jornada no mundo dos cafés?</h2>
          <p>Registre suas experiências e transforme cada xícara em uma descoberta única</p>
          <Link to="/create" className="btn btn-primary btn-large cta-button">
            <FaCoffee />
            <span>Avaliar Meu Primeiro Café</span>
            <FaArrowRight />
          </Link>
        </div>
        <div className="cta-decoration"></div>
      </section>
    </div>
  );
}

export default Home;