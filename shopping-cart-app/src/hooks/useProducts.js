import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';

export const useProducts = (page = 1, limit = 10) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(page, limit);
        setProducts(prev => page === 1 ? data : [...prev, ...data]);
        setHasMore(data.length === limit);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [page, limit]);

  return { products, loading, error, hasMore };
};