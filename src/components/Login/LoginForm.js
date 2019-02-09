import React from 'react';

import {Button, Input, Message, Form, Accordion, Icon} from 'semantic-ui-react';
import { performFetch } from "../../scripts/FetchService";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    const url = localStorage.getItem('url');
    this.state = {
      error: false,
      expendAddressAccordion: false,
      serverAddress: url ? url : 'http://localhost:5000'
    };
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const url = e.target.elements.address.value;
    localStorage.setItem('url', url);

    const body = JSON.stringify({
      username: e.target.elements.username.value,
      password: e.target.elements.password.value,
    });

    performFetch(url + '/login', 'POST', true, () => {
      this.setState(() => {
        return {
          error: true
        }
      });
    }, body).then(res => {
      if (res.status === 200) {
        this.props.handleHistoryChanges();
      }
    })
  };

  handleOnClickAccordion = () => {
    this.setState((prevState) => ({
      expendAddressAccordion: !prevState.expendAddressAccordion
    }));
  };

  handleAddressChange = (e) => {
    e.persist();
    this.setState(() => ({serverAddress: e.target.value}))
  };

  render() {
    return (
      <div className="form-login">
        {
          this.state.error &&
          (
            <Message negative>
              <Message.Header>Erreur lors de l'identification</Message.Header>
              <p>Le nom d'utilisateur ou le mot de passe est incorrect.</p>
            </Message>
          )
        }
        <Form onSubmit={this.handleFormSubmit} className="login-form">
          <Form.Field>
            <label>Nom d'utilisateur</label>
            <Input fluid focus placeholder="Nom d'utilisateur" name="username" required/>
          </Form.Field>

          <Form.Field>
            <label>Mot de passe</label>
            <Input fluid type="password" placeholder="Mot de passe" name="password" required/>
          </Form.Field>

          <Form.Field>
            <Accordion>
              <Accordion.Title active={this.state.expendAddressAccordion} onClick={this.handleOnClickAccordion}>
                <Icon name='dropdown' />
                Se connecter à un serveur distant ?
              </Accordion.Title>
              <Accordion.Content active={this.state.expendAddressAccordion}>
                <label>Adresse du serveur</label>
                <Input
                  fluid
                  type="text"
                  name="address"
                  value={this.state.serverAddress}
                  onChange={this.handleAddressChange}
                  required
                />
              </Accordion.Content>
            </Accordion>
          </Form.Field>
          <Button>OK</Button>
        </Form>
      </div>
    );
  }
}