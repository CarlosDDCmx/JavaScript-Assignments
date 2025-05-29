import axios from 'axios';

const API_BASE = 'http://localhost:3001';

export const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3001/products');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProduct = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE}/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};