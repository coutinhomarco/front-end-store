import React from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Categories from './Categories';
import ProductCard from './ProductCard';

export default class Store extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriesList: [],
      categorieId: '',
      query: '',
      productList: [],
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

  fetchProducts = async () => {
    const { query, categorieId } = this.state;
    try {
      const products = await getProductsFromCategoryAndQuery(categorieId, query);
      this.setState({ productList: products.results });
    } catch (error) {
      console.log('Ops!! parece que estou ocupado comprando um Pendrive');
    }
  };

  handleRadioClick = (id) => {
    this.setState({ categorieId: id });
  };

  handleInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      query: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchProducts();
  }

  createProducts = () => {
    const { productList } = this.state;
    return (
      <section>
        {productList.map((product) => {
          const { title, thumbnail, price, id } = product;
          return (
            <ProductCard
              key={ id }
              title={ title }
              thumbnail={ thumbnail }
              price={ price }
              id={ id }
            />
          );
        })}
      </section>
    );
  }

  render() {
    const { categoriesList } = this.state;
    const renderProducts = this.createProducts();
    const listedCategories = categoriesList.map(({ id, name }) => (
      <Categories
        key={ id }
        id={ id }
        name={ name }
        handleRadioClick={ this.handleRadioClick }
      />
    ));

    return (
      <div>
        <header>
          <Form onSubmit={ this.handleSubmit }>
            <FloatingLabel
              controlId="floatingInput"
              label="Pesquisar..."
              className="mb-3"
            >
              <Form.Control
                data-testid="query-input"
                type="text"
                placeholder="Pesquisar..."
                onChange={ this.handleInputChange }
              />
            </FloatingLabel>
            <Button
              data-testid="query-button"
              as="input"
              type="submit"
              value="Pesquisar"
            />
          </Form>
        </header>
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <Link data-testid="shopping-cart-button" to="/cart">
          <i className="fas fa-shopping-cart" />
        </Link>
        {listedCategories}
        {renderProducts}
      </div>
    );
  }
}
