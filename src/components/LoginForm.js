import React from 'react';

export default class LoginForm extends React.Component {

    handleFormSubmit = (e) => {
        e.preventDefault();

        console.log(e.target.elements.email.value);
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit} className="login-form">
                <input type="text" name="email" />
                <input type="password" name="password" />
                <input type="submit" value="Ok" />
            </form>
        );
    }
}