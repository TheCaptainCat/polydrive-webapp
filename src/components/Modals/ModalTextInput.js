import React from 'react';
import {Button, Modal, Input} from "semantic-ui-react";

export default class ModalTextInput extends React.Component {

  state = {
    inputValue: ''
  };

  handleTextChange = (e) => {
    e.persist();
    this.setState(() => ({inputValue: e.target.value}))
  };

  handleSubmit = () => {
    this.props.handleConfirmTextInput(this.state.inputValue);
    this.setState(() => ({inputValue: ''}))
  };

  render() {
    return (
      <Modal
        size="mini"
        open={this.props.showModal}
        onClose={() => {this.props.handleCancelTextInput()}}
        className="modal-text-input"
      >
        <Modal.Header>{this.props.title}</Modal.Header>
        <Modal.Content>
          <Input onChange={this.handleTextChange} value={this.state.inputValue} placeholder="Saisissez un nom..."/>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => {this.props.handleCancelTextInput()}}>Annuler</Button>
          <Button
            positive
            icon='checkmark'
            labelPosition='right'
            content='Valider'
            disabled={this.state.inputValue === ''}
            onClick={this.handleSubmit}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}