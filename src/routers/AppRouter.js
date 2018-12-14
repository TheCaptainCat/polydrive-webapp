import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import MainPage from '../components/MainPage';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Route path="/" component={LoginPage} exact={true} />
      <Route path="/files" component={MainPage} exact={true} />
    </div>
  </BrowserRouter>
);

export default AppRouter;