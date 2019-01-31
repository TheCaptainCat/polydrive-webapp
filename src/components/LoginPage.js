import React from 'react';
import LoginForm from './LoginForm';

export default class LoginPage extends React.Component {
  handleHistoryChanges = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="login-page" style={{'backgroundImage': 'url("../images/login-background.jpg")'}}>
        <LoginForm handleHistoryChanges={this.handleHistoryChanges}/> 
      </div>
    );
  }
}