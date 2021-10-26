import React from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
      productsImages: [],
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
      this.setState({ productList: products.results }, () => this.getIdFromProducList());
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
  }

  fetchProductImg = (id) => fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((response) => response.json())
    .then((product) => product.pictures[0])
    .then(({ url }) => url)
    .catch((error) => console.log(error.message))

  getIdFromProducList = async () => {
    const { productList } = this.state;
    const productsImages = await Promise.all(productList
      .map((product) => this.fetchProductImg(product.id)));
    this.setState({ productsImages });
  }

  createProducts = () => {
    const { productList, productsImages } = this.state;
    return (
      <>
        {productList.map((product, i) => {
          const { title, price, id } = product;
          return (
            productsImages.length > 0 && (
              <Col
                xs={ 6 }
                sm={ 4 }
                md={ 4 }
                lg={ 3 }
                xl={ 2 }
                key={ id }
                className="mb-4"
              >
                <ProductCard
                  title={ title }
                  thumbnail={ productsImages[i] }
                  price={ price }
                  id={ id }
                />
              </Col>)

          );
        })}
      </>
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
        <section>
          <Container>
            <Row>
              {renderProducts}
            </Row>
          </Container>
        </section>
      </div>
    );
  }
}
