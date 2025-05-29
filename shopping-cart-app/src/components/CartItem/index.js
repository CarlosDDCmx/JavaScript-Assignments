import React from 'react';
import PropTypes from 'prop-types';
import { ItemWrapper, QuantityControl, ProductLink } from './styles';

const CartItem = ({ item, onRemove, onUpdate }) => {
  return (
    <ItemWrapper>
      <ProductLink to={`/products/${item.id}`}>
        <img src={item.image} alt={item.title} width="80" />
      </ProductLink>
      
      <div>
        <ProductLink to={`/products/${item.id}`}>
          <h4>{item.title}</h4>
        </ProductLink>
        
        <p>${item.price.toFixed(2)}</p>
        
        <QuantityControl>
          <button
            onClick={() => onUpdate(Math.max(1, item.quantity - 1))}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => onUpdate(item.quantity + 1)}>
            +
          </button>
        </QuantityControl>
        
        <button onClick={onRemove}>Remove</button>
      </div>
    </ItemWrapper>
  );
};


CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default CartItem;