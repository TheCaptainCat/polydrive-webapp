import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import 'normalize.css/normalize.css';
import './styles/styles.scss';


const routes = (
  <BrowserRouter>
    <div>
      <Route path="/" component={LoginPage} exact={true} />
      <Route path="/files" component={MainPage} exact={true} />
    </div>
  </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));