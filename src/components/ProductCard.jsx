import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../styles.module.css';

function ProductCard({ title, thumbnail, price, id, categorieId, query }) {
  return (

    <Link
      data-testid="product-detail-link"
      to={ `/product/${categorieId}/${id}/${query || 'endpoint'}` }
    >
      <Card style={ { width: '12rem' } } data-testid="product" className="h-100">

        <Card.Img variant="top" src={ thumbnail } />

        <Card.Body>
          <div style={ { height: '5rem' } }>
            <Card.Text
              className={ styles.productTitle }
            >
              { title }
            </Card.Text>
          </div>
          <Card.Title>{ price }</Card.Title>
          <Button variant="primary">Adicionar ao carrinho</Button>
        </Card.Body>
      </Card>
    </Link>

  );
}

ProductCard.propTypes = {
  categorieId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
};

export default ProductCard;
