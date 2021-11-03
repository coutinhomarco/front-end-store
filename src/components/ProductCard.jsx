import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../styles.module.css';
import image from './image.png';

function ProductCard({
  title,
  thumbnail,
  price,
  id,
  handleAddToCartClick,
  categorieId,
  query,
  shipping,
  availableQuantity,
}) {
  return (
    <Card style={ { width: '12rem' } } data-testid="product" className="h-100 boxshadow">
      <Link
        data-testid="product-detail-link"
        to={ `/product/${categorieId}/${id}/${query || 'endpoint'}` }
      >
        <Card.Img variant="top" src={ thumbnail } />
      </Link>
      <Card.Body>
        <div style={ { height: '5rem' } }>
          <Card.Text className={ styles.productTitle }>{title}</Card.Text>
        </div>
        <div className="shipping-price">
          <Card.Title>
            R$
            {price}
          </Card.Title>
          {
            shipping.free_shipping && (<Card.Img
              style={ { width: '50px', height: '40px' } }
              id="shippingcart"
              data-testid="free-shipping"
              variant="top"
              src={ image }
            />)
          }
        </div>
        <Button
          data-testid="product-add-to-cart"
          variant="primary"
          onClick={ () => handleAddToCartClick({
            id, title, thumbnail, price, availableQuantity }) }
        >
          Adicionar ao carrinho
        </Button>
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  availableQuantity: PropTypes.number.isRequired,
  categorieId: PropTypes.string.isRequired,
  handleAddToCartClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
  shipping: PropTypes.shape({
    free_shipping: PropTypes.bool,
  }).isRequired,
  thumbnail: PropTypes.string,
  title: PropTypes.string.isRequired,
};

ProductCard.defaultProps = {
  thumbnail: '',
};
export default ProductCard;
