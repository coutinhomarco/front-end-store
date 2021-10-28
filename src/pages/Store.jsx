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
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';

export default class Store extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriesList: [],
      categorieId: '',
      query: '',
      productList: [],
      myCartProductList: [],
      productsImages: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
    this.getCartList();
  }

  getCartList = () => {
    const myCartList = JSON.parse(localStorage.getItem('cartProductList'));

    this.setState({ myCartProductList: myCartList || [] });
  };

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
  };

  handleAddToCartClick = (productInfo) => {
    const { id, title, thumbnail, price, availableQuantity } = productInfo;
    const { myCartProductList } = this.state;

    let isProductInCart = false;
    if (myCartProductList.length > 0) {
      isProductInCart = myCartProductList.some(
        (product) => product.id === id,
      );
    }

    if (!isProductInCart) {
      this.setState(
        {
          myCartProductList: [
            ...myCartProductList,
            { id, title, thumbnail, price, quantity: 1, availableQuantity },
          ],
        },
        () => this.saveCartLocalStorage(),
      );
    } else {
      const newProductList = myCartProductList.map((product) => {
        if (product.id === id) {
          product.quantity += 1;
          return product;
        }
        return product;
      });

      this.setState({ myCartProductList: newProductList }, this.saveCartLocalStorage());
    }
  };

  saveCartLocalStorage = () => {
    const { myCartProductList } = this.state;

    localStorage.setItem('cartProductList', JSON.stringify(myCartProductList));
  };

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
    // Receber productImages no estado
    const { productList, categorieId, query, productsImages } = this.state;
    return (
      <>
        {productList.map((product, i) => {
          const {
            title,
            price,
            id, shipping, available_quantity: availableQuantity } = product;
          return (
            // ProductImages foi resolvida?
            <Col xs={ 6 } sm={ 4 } md={ 4 } lg={ 3 } xl={ 2 } key={ id } className="mb-4">
              <ProductCard
                title={ title }
                // Passar a productImages na thumbnail para imagens em hd
                thumbnail={ productsImages[i] }
                price={ price }
                id={ id }
                handleAddToCartClick={ this.handleAddToCartClick }
                categorieId={ categorieId }
                query={ query }
                shipping={ shipping }
                availableQuantity={ availableQuantity }
              />
            </Col>
          );
        })}
      </>
    );
  };

  sumProductsQuantity = () => {
    const { myCartProductList } = this.state;
    const sum = myCartProductList.reduce((acc, product) => product.quantity + acc, 0);

    return sum;
  };

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
        <Link
          data-testid="shopping-cart-button"
          to="/cart"
        >
          <div data-testid="shopping-cart-size">{this.sumProductsQuantity()}</div>
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
