import React from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
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
      myCartProductList: [],
      // productsImages: [],
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
      const products = await getProductsFromCategoryAndQuery(
        categorieId,
        query,
      );
      // Chamar a getIdFromProductList apost setar o estado
      this.setState({ productList: products.results });
    } catch (error) {
      console.log('Ops!! parece que estou ocupado comprando um Pendrive');
    }
  };

  handleRadioClick = (id) => {
    this.setState({ categorieId: id }, () => this.fetchProducts());
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
  };

  handleAddToCartClick = (id, title, thumbnail, price) => {
    const { myCartProductList } = this.state;

    const isProductInCart = myCartProductList.some(
      (product) => product.id === id,
    );

    if (!isProductInCart) {
      this.setState({
        myCartProductList: [
          ...myCartProductList,
          { id, title, thumbnail, price, quantity: 1 },
        ],
      });
    } else {
      const newProductList = myCartProductList.map((product) => {
        if (product.id === id) {
          product.quantity += 1;
          return product;
        }
        return product;
      });

      this.setState({ myCartProductList: newProductList });
    }
  };

  // fetchProductImg = (id) => fetch(`https://api.mercadolibre.com/items/${id}`)
  //   .then((response) => response.json())
  //   .then((product) => product.pictures[0])
  //   .then(({ url }) => url)
  //   .catch((error) => console.log(error.message))

  // getIdFromProducList = async () => {
  //   const { productList } = this.state;
  //   const productsImages = await Promise.all(productList
  //     .map((product) => this.fetchProductImg(product.id)));
  //   this.setState({ productsImages });
  // }

  createProducts = () => {
    // Receber productImages no estado
    const { productList } = this.state;
    return (
      <>
        {productList.map((product) => {
          const { title, price, id, thumbnail } = product;
          return (
            // ProductImages foi resolvida?
            // productsImages.length > 0 && (
            <Col xs={ 6 } sm={ 4 } md={ 4 } lg={ 3 } xl={ 2 } key={ id } className="mb-4">
              <ProductCard
                title={ title }
                // Passar a productImages na thumbnail para imagens em hd
                thumbnail={ thumbnail }
                price={ price }
                id={ id }
                handleAddToCartClick={ this.handleAddToCartClick }
              />
            </Col>
          );
        })}
      </>
    );
  };

  render() {
    const { categoriesList, myCartProductList } = this.state;
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
        <Link
          data-testid="shopping-cart-button"
          to={ {
            pathname: '/cart',
            state: {
              myCartProductList,
            },
          } }
        >
          <i className="fas fa-shopping-cart" />
        </Link>
        {listedCategories}
        <section>
          <Container>
            <Row>{renderProducts}</Row>
          </Container>
        </section>
      </div>
    );
  }
}
