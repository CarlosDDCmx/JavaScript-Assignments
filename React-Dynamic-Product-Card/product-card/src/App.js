import React from 'react';
import ProductCard from './components/ProductCard';
import './App.css';

function App() {
  const products = [
    {
      id: 1,
      title: 'Wireless Headphones',
      description: 'Premium noise-canceling wireless headphones with 30hr battery life',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 2,
      title: 'Smart Watch',
      description: 'Fitness tracking & heart rate monitoring with OLED display',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 3,
      title: 'Digital Camera',
      description: '24MP mirrorless camera with 4K video recording',
      price: 799.99,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
  ];

  return (
    <div className="app">
      <h1 className="main-title">Featured Products</h1>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}

export default App;