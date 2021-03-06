import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../styles.module.css';
import image from './free.png';

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
    <Card
      style={ { width: '250px', height: '5rem', fontSize: '14px', flexBasis: '20%' } }
      id="product-card"
      data-testid="product"
      className="h-100 boxshadow"
    >
      <Link
        data-testid="product-detail-link"
        to={ `/product/${categorieId}/${id}/${query || 'endpoint'}` }
      >
        <Card.Img variant="top" src={ thumbnail } />
      </Link>
      <Card.Body>
        <div className="shipping-price">
          {
            shipping.free_shipping && (<Card.Img
              style={ { width: '65px', height: '45px' } }
              id="shippingcart"
              data-testid="free-shipping"
              variant="top"
              src={ image }
            />)
          }
        </div>
        <Card.Text className={ styles.productTitle }>{title}</Card.Text>

        <div id="card-bottom">
          <Card.Title
            style={
              { fontSize: '16px' }
            }
          >
            R$
            {price}
          </Card.Title>
          <Button
            style={
              { width: '100%', height: '50px', fontSize: '14px' }
            }
            data-testid="product-add-to-cart"
            variant="primary"
            onClick={ () => handleAddToCartClick({
              id, title, thumbnail, price, availableQuantity }) }
          >
            Adicionar ao carrinho
          </Button>
        </div>
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
