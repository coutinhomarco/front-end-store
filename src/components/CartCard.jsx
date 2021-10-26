import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import styles from '../styles.module.css';

function CartCard({ title, thumbnail, price, quantity }) {
  return (
    <Card style={ { width: '12rem' } } className="h-100">
      <Card.Img variant="top" src={ thumbnail } />
      <Card.Body>
        <div style={ { height: '5rem' } }>
          <Card.Text
            className={ styles.productTitle }
            data-testid="shopping-cart-product-name"
          >
            {title}
          </Card.Text>
        </div>
        <Card.Title>{price}</Card.Title>
        <Card.Title data-testid="shopping-cart-product-quantity">{quantity}</Card.Title>
      </Card.Body>
    </Card>
  );
}

CartCard.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default CartCard;
