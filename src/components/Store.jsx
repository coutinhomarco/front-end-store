import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Store extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <button data-testid="shopping-cart-button">Carrinho</button>
      </div>
    );
  }
}
