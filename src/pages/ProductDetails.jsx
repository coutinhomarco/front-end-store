import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import FormReview from '../components/FormReview';

export default class ProductDetails extends Component {
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
      myCartProductList: [],
    };
  }

  componentDidMount() {
    this.getProductIdAndCategorie();
    this.getCartList();
  }

  handleButtonSubmit(event) {
    event.preventDefault();
  }

  getCartList = () => {
    const myCartList = JSON.parse(localStorage.getItem('cartProductList'));

    this.setState({ myCartProductList: myCartList || [] });
  };

  getProductIdAndCategorie = () => {
    const { match } = this.props;
    const { id, categorieId } = match.params;
    let { query } = match.params;
    if (query === 'endpoint') query = '';

    this.setState({ id, categorieId, query }, () => this.fetchProduct());
  };

  fetchProduct = async () => {
    const { id, categorieId, query } = this.state;

    const products = await getProductsFromCategoryAndQuery(categorieId, query);
    const filteredProduct = products.results.filter(
      (product) => product.id === id,
    );
    const { title, thumbnail, price, condition } = filteredProduct[0];

    this.setState({
      productTitle: title,
      thumbnail,
      price,
      description: condition,
    });
  };

  handleAddToCartClick = (id, title, thumbnail, price) => {
    const { myCartProductList } = this.state;

    let isProductInCart = false;
    if (myCartProductList.length > 0) {
      isProductInCart = myCartProductList.some((product) => product.id === id);
    }

    if (!isProductInCart) {
      this.setState(
        {
          myCartProductList: [
            ...myCartProductList,
            { id, title, thumbnail, price, quantity: 1 },
          ],
        },
        () => this.saveCartLocalStorage(),
      );
    }
  };

  saveCartLocalStorage = () => {
    const { myCartProductList } = this.state;

    localStorage.setItem('cartProductList', JSON.stringify(myCartProductList));
  };

  sumProductsQuantity = () => {
    const { myCartProductList } = this.state;
    const sum = myCartProductList.reduce((acc, product) => product.quantity + acc, 0);

    return sum;
  };

  render() {
    const {
      thumbnail,
      productTitle,
      price,
      description,
      id,
    } = this.state;
    return (
      <>
        <Link data-testid="shopping-cart-button" to="/cart">
          <div data-testid="shopping-cart-size">{this.sumProductsQuantity()}</div>
          <i className="fas fa-shopping-cart" />
        </Link>
        <Card style={ { width: '12rem' } } className="h-100">
          <Card.Img variant="top" src={ thumbnail } />
          <Card.Body>
            <div style={ { height: '5rem' } }>
              <Card.Text data-testid="product-detail-name">
                {productTitle}
              </Card.Text>
              <Card.Text>{description}</Card.Text>
            </div>
            <Card.Title>{price}</Card.Title>
            <Button
              data-testid="product-detail-add-to-cart"
              onClick={ () => (
                this.handleAddToCartClick(id, productTitle, thumbnail, price)
              ) }
              variant="primary"
            >
              Adicionar ao carrinho
            </Button>
          </Card.Body>
        </Card>
        <section>
          <FormReview handleButtonSubmit={ this.handleButtonSubmit } />
        </section>
      </>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      categorieId: PropTypes.string.isRequired,
      query: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
