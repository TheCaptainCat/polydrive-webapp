import React from 'react';
import LoginForm from './LoginForm';

export default class LoginPage extends React.Component {
  handleHistoryChanges = () => {
    this.props.history.push('/files');
  };

  render() {
    return (
      <div className="login-page">
        <LoginForm handleHistoryChanges={this.handleHistoryChanges}/> 
      </div>
    );
  }
}