import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Card, ProductImage, ProductInfo, AddButton, ProductTitle } from './styles';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  return (
    <Card>
      <ProductImage src={product.image} alt={product.title} />
      <ProductInfo>
        <ProductTitle to={`/products/${product.id}`}>
          {product.title}
        </ProductTitle>
        <p>${product.price}</p>
        <AddButton onClick={() => addItem(product)}>
          Add to Cart
        </AddButton>
      </ProductInfo>
    </Card>
  );
};

export default ProductCard;