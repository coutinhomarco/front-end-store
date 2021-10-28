import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import styles from '../styles.module.css';

function CartCard(props) {
  const { title, thumbnail, price,
    quantity,
    increaseOrDecresaseProductQuantity, id, disabled } = props;
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
        <div className="product-quantity-container">
          <Button
            onClick={ () => increaseOrDecresaseProductQuantity(id, '-') }
            data-testid="product-decrease-quantity"
          >
            <i className="fas fa-minus" />

          </Button>
          <Button
            onClick={ () => (
              increaseOrDecresaseProductQuantity(id, '+')) }
            data-testid="product-increase-quantity"
            disabled={ disabled }
          >
            <i className="fas fa-plus" />

          </Button>
          <Button
            onClick={ () => increaseOrDecresaseProductQuantity(id, 'x') }
          >
            <i className="fas fa-times" />

          </Button>
          <Card.Title
            data-testid="shopping-cart-product-quantity"
          >
            {quantity}

          </Card.Title>
        </div>
      </Card.Body>
    </Card>
  );
}

CartCard.propTypes = {
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  increaseOrDecresaseProductQuantity: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CartCard;
