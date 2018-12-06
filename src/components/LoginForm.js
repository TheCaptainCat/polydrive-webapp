import React from 'react';
import { Button, Input, Container, Form } from 'semantic-ui-react';


export default class LoginForm extends React.Component {

    handleFormSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/login', {
            mode: 'cors',
            method: 'POST',
            credentials: 'include',
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: e.target.elements.username.value,
                password: e.target.elements.password.value,
            })
        })
        .then(res => {
            this.props.history.push('/files');
        })
    }

    render() {
        return (
            <div className="form-login">
                <Form onSubmit={this.handleFormSubmit} className="login-form">
                    <Form.Field>
                        <label>Nom d'utilisateur</label>
                        <Input fluid placeholder="Nom d'utilisateur" name="username" value="captaincat"/>
                    </Form.Field>
                    
                    <Form.Field>
                        <label>Mot de passe</label>
                        <Input fluid type="password" placeholder="Mot de passe" name="password" value="test-test"/>
                    </Form.Field>
                    
                    <Button>OK</Button>
                </Form>
            </div>

        );
    }
}