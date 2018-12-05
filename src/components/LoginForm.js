import React from 'react';
import { Button, Input, Container, Form } from 'semantic-ui-react';

export default class LoginForm extends React.Component {

    handleFormSubmit = (e) => {
        e.preventDefault();

        console.log(e.target.elements.username.value);
    }

    render() {
        return (
            <div className="form-login">
                <Form onSubmit={this.handleFormSubmit} className="login-form">
                    <Form.Field>
                        <label>Nom d'utilisateur</label>
                        <Input fluid icon='search' placeholder="Nom d'utilisateur" name="username" />
                    </Form.Field>
                    
                    <Form.Field>
                        <label>Mot de passe</label>
                        <Input fluid type="password" icon='search' placeholder="Mot de passe" name="password" />
                    </Form.Field>
                    
                    <Button>OK</Button>
                </Form>
            </div>

        );
    }
}