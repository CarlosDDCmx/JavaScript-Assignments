import axios from 'axios';
import { fetchProducts, fetchProduct } from './products';

jest.mock('axios');

describe('Products API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetchProducts returns product list', async () => {
    const mockProducts = [{ id: 1, title: 'Product 1' }];
    axios.get.mockResolvedValue({ data: mockProducts });
    
    const products = await fetchProducts();
    expect(products).toEqual(mockProducts);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/products');
  });

  test('fetchProduct returns single product', async () => {
    const mockProduct = { id: 1, title: 'Product 1' };
    axios.get.mockResolvedValue({ data: mockProduct });
    
    const product = await fetchProduct(1);
    expect(product).toEqual(mockProduct);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/products/1');
  });

  test('handles fetch errors', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValue(new Error(errorMessage));
    
    await expect(fetchProducts()).rejects.toThrow(errorMessage);
    await expect(fetchProduct(1)).rejects.toThrow(errorMessage);
  });
});