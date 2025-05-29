import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../api/products';
import { ProductGrid } from './styles';
import ProductCard from '../../components/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message || 'Error loading products'} />;

  return (
    <ProductGrid>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ProductGrid>
  );
};