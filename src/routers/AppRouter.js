import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginPage from '../components/Login/LoginPage';
import MainPage from '../components/MainPage';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Route path="/login" component={LoginPage} exact={true} />
      <Route path="/" component={MainPage} exact={true} />
    </div>
  </BrowserRouter>
);

export default AppRouter;