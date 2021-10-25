import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';
import Categories from './Categories';

export default class Store extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriesList: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    try {
      const categories = await getCategories();
      this.setState({ categoriesList: [...categories] });
    } catch (error) {
      console.log(`Ops, um erro ocorreu: ${error.message}`);
    }
  };

  render() {
    const { categoriesList } = this.state;
    const listedCategories = categoriesList.map(({ id, name }) => (
      <Categories key={ id } id={ id } name={ name } />
    ));
    return (
      <div>
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <Link data-testid="shopping-cart-button" to="/cart">
          <i className="fas fa-shopping-cart" />
        </Link>
        {listedCategories}
      </div>
    );
  }
}
