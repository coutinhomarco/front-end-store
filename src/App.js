import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Cart from './pages/Cart';
import Store from './components/Store';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/cart" component={ Cart } />
        <Route exact path="/" component={ Store } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
