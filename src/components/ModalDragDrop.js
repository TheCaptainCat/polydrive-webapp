import React from 'react';
import {Button, Input, Modal} from "semantic-ui-react";
import { DragDrop } from '@uppy/react';

export default class ModalDragDrop extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        size="small"
        open={this.props.showModal}
        onClose={() => {this.props.handleCancelDrop()}}
      >
        <Modal.Header>Ajouter un fichier</Modal.Header>
        <Modal.Content>
          <DragDrop uppy={this.props.dropComponent} />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => {this.props.handleCancelDrop()}}>Fermer</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}