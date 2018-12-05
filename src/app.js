import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm'
import 'normalize.css/normalize.css';
import './styles/styles.scss';


const routes = (
  <BrowserRouter>
    <div>
      <Route path="/" component={LoginForm} exact={true} />
    </div>
  </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));