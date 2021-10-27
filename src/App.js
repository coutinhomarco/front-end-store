import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Cart from './pages/Cart';
import Store from './pages/Store';
import Product from './pages/Product';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/product/:categorieId/:id/:query"
          render={ (props) => <Product { ...props } /> }
        />
        <Route path="/cart" component={ Cart } />
        <Route exact path="/" component={ Store } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
