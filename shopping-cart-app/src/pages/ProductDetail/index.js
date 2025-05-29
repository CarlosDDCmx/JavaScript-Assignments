import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { fetchProduct } from '../../api/products';
import { useAsync } from '../../hooks/useAsync';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { 
  ProductDetailContainer,
  ProductImage,
  ProductInfo,
  CategoryBadge,
  Price,
  Description,
  AddToCartButton
} from './styles';

const ProductDetail = () => {
  const { productId } = useParams();
  const { data: product, loading, error } = useAsync(
    () => fetchProduct(productId),
    [productId]
  );
  const { addItem } = useCart();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message || 'Failed to load product'} />;
  if (!product) return <ErrorMessage message="Product not found" />;

  return (
    <ProductDetailContainer>
      <ProductImage>
        <img src={product.image} alt={product.title} />
      </ProductImage>
      
      <ProductInfo>
        <CategoryBadge category={product.category || 'uncategorized'}>
          {(product.category || 'uncategorized').replace(/-/g, ' ')}
        </CategoryBadge>
        <h1>{product.title}</h1>
        
        <Price>${product.price.toFixed(2)}</Price>
        
        <Description>{product.description}</Description>
        
        <AddToCartButton onClick={() => addItem(product)}>
          Add to Cart
        </AddToCartButton>
      </ProductInfo>
    </ProductDetailContainer>
  );
};

export default ProductDetail;