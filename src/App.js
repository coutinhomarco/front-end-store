import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Store from './components/Store';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Store } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
