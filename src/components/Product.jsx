import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default class Product extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      query: ' ',
      thumbnail: '',
      categorieId: '',
      productTitle: '',
      description: '',
      price: '',
    };
  }

  componentDidMount() {
    this.setProductIdAndCategorie();
  }

  setProductIdAndCategorie = () => {
    const { match } = this.props;
    const { id, categorieId } = match.params;
    let { query } = match.params;
    if (query === 'endpoint') query = '';
    console.log(categorieId, query);
    this.setState({ id, categorieId, query }, () => this.fetchProduct());
  }

  fetchProduct = async () => {
    const { id, categorieId, query } = this.state;

    const products = await getProductsFromCategoryAndQuery(categorieId, query);
    const filteredProduct = products.results.filter((product) => product.id === id);
    const { title, thumbnail, price, condition } = filteredProduct[0];
    console.log(filteredProduct, title);
    this.setState({
      productTitle: title,
      thumbnail,
      price,
      description: condition,

    });
  }

  render() {
    const { thumbnail, productTitle, price, description } = this.state;
    return (
      <Card style={ { width: '12rem' } } className="h-100">
        <Card.Img variant="top" src={ thumbnail } />
        <Card.Body>
          <div style={ { height: '5rem' } }>
            <Card.Text
              data-testid="product-detail-name"
            >
              { productTitle }
            </Card.Text>
            <Card.Text>
              { description}
            </Card.Text>
          </div>
          <Card.Title>{ price }</Card.Title>
          <Button variant="primary">Adicionar ao carrinho</Button>
        </Card.Body>
      </Card>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      categorieId: PropTypes.string.isRequired,
      query: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
