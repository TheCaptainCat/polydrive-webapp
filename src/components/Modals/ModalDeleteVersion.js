import React from 'react';
import {Button, Checkbox, Modal} from "semantic-ui-react";

export default class ModalDeleteVersion extends React.Component {
  render() {
    return (
      <Modal
        className="modal-versions"
        open={this.props.open}
        onClose={() => {this.props.onCancel()}}
        size='tiny'
      >
        <Modal.Header>Avertissement</Modal.Header>
        <Modal.Content>
          <p>Voulez-vous vraiment supprimer cette version du fichier ? Cette action est irréversible.</p>
        </Modal.Content>
        <Modal.Actions>
          <Button content='Annuler' onClick={() => {this.props.onCancel()}}/>
          <Button icon='check' content='Valider' onClick={() => {this.props.onConfirm()}} primary/>
        </Modal.Actions>
      </Modal>
    )
  }
}