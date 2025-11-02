import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CoffeeList from './pages/CoffeeList';
import CreateCoffee from './pages/CreateCoffee';
import CoffeeDetail from './pages/CoffeeDetail';  
import EditCoffee from './pages/EditCoffee';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coffees" element={<CoffeeList />} />
          <Route path="/create" element={<CreateCoffee />} />
          <Route path="/coffee/:id" element={<CoffeeDetail />} />
          <Route path="/edit/:id" element={<EditCoffee />} /> 
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;