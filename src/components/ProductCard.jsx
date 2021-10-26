import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import styles from '../styles.module.css';

function ProductCard({ title, thumbnail, price }) {
  return (
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
  );
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductCard;
