import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ProductCard({ title, thumbnail, price }) {
  return (
    <Card style={ { width: '10rem' } } data-testid="product">
      <Card.Img variant="top" src={ thumbnail } />
      <Card.Body>
        <Card.Text>
          { title }
        </Card.Text>
        <Card.Title>{ price }</Card.Title>
        <Button variant="primary">Adicionar ao carrinho</Button>
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
}.isRequired;

export default ProductCard;
