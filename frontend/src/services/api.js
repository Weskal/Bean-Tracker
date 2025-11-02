import axios from 'axios';

const API_URL = 'http://localhost:3000/api/coffees';

const api = {
  // Listar todos os cafés
  getAllCoffees: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Buscar café por ID
  getCoffeeById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  // Criar novo café
  createCoffee: async (coffeeData) => {
    const response = await axios.post(API_URL, coffeeData);
    return response.data;
  },

  // Atualizar café
  updateCoffee: async (id, coffeeData) => {
    const response = await axios.put(`${API_URL}/${id}`, coffeeData);
    return response.data;
  },

  // Deletar café
  deleteCoffee: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};

export default api;