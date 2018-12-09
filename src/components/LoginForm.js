import React from 'react';

import { Button, Input, Message, Form } from 'semantic-ui-react';


export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'error': false
        };
    }

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
            if (res.status == 200) {
                this.props.handleHistoryChanges();
            } else {
                console.log('error');
                this.setState(() => {
                    return {
                        'error': true
                    }
                });
            }
        })
    }

    render() {
        return (
            <div className="form-login">
                {
                    this.state.error &&
                    (<Message negative>
                        <Message.Header>Erreur lors de l'identification</Message.Header>
                        <p>Le nom d'utilisateur ou le mot de passe est incorrect.</p>
                    </Message>)
                }
                <Form onSubmit={this.handleFormSubmit} className="login-form">
                    <Form.Field>
                        <label>Nom d'utilisateur</label>
                        <Input fluid placeholder="Nom d'utilisateur" name="username"/>
                    </Form.Field>
                    
                    <Form.Field>
                        <label>Mot de passe</label>
                        <Input fluid type="password" placeholder="Mot de passe" name="password" value="password42"/>
                    </Form.Field>
                    <Button>OK</Button>
                </Form>
            </div>

        );
    }
}