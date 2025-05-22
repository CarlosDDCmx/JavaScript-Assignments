import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ title, description, price, image }) => {
  const [showDiscounted, setShowDiscounted] = useState(false);
  const discountPercentage = 20;
  const discountedPrice = price * (1 - discountPercentage/100);

  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />
      <div className="product-details">
        <h3 className="product-title">{title}</h3>
        <p className="product-description">{description}</p>
        <div className="price-container">
          <span className={`original-price ${showDiscounted ? 'struck' : ''}`}>
            ${price.toFixed(2)}
          </span>
          {showDiscounted && (
            <span className="discounted-price">
              ${discountedPrice.toFixed(2)}
            </span>
          )}
        </div>
        <button 
          className="toggle-button"
          onClick={() => setShowDiscounted(!showDiscounted)}
        >
          {showDiscounted ? 'Show Original Price' : `Apply ${discountPercentage}% Discount`}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;