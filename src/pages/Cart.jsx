import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartCard from '../components/CartCard';

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartProductList: [],
    };
  }

  componentDidMount() {
    this.setMyCartState();
  }

  setMyCartState = () => {
    const {
      location: {
        state: { myCartProductList },
      },
    } = this.props;
    this.setState({ cartProductList: myCartProductList });
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

Cart.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      myCartProductList: PropTypes.arrayOf(PropTypes.object),
    }),
  }),
  myCartProductList: PropTypes.arrayOf(PropTypes.object),
  state: PropTypes.shape({
    myCartProductList: PropTypes.arrayOf(PropTypes.object),
  }),
};

Cart.defaultProps = {
  location: {
    state: {
      myCartProductList: [{}],
    },
  },
  myCartProductList: [{}],
  state: PropTypes.shape({
    myCartProductList: [{}],
  }),
};
