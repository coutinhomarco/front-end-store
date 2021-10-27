import React, { Component } from 'react';
import CartCard from '../components/CartCard';

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartProductList: [],
    };
  }

  componentDidMount() {
    this.getCartList();
  }

  getCartList = () => {
    const myCartList = JSON.parse(localStorage.getItem('cartProductList'));

    this.setState({ cartProductList: myCartList || [] });
  };

  increaseOrDecresaseProductQuantity = (id, type) => {
    const { cartProductList } = this.state;

    const newProductList = cartProductList.map((product) => {
      if (product.id === id) {
        if (type === '+')product.quantity += 1;
        if (type === '-' && product.quantity > 0)product.quantity -= 1;
        return product;
      }
      return product;
    });

    this.setState({ cartProductList: newProductList },
      () => this.saveCartLocalStorage());
  };

  saveCartLocalStorage = () => {
    const { cartProductList } = this.state;

    localStorage.setItem('cartProductList', JSON.stringify(cartProductList));
  };

  render() {
    const { cartProductList } = this.state;
    const myCartProducts = cartProductList.map((product) => (
      <CartCard
        key={ product.id }
        title={ product.title }
        thumbnail={ product.thumbnail }
        price={ product.price }
        quantity={ product.quantity }
        increaseOrDecresaseProductQuantity={ this.increaseOrDecresaseProductQuantity }
        id={ product.id }
      />
    ));
    return (
      <div>
        {cartProductList.length > 0 ? (
          myCartProducts
        ) : (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        )}
      </div>
    );
  }
}
