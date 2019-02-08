import React from 'react';
import {Button, Input, Modal} from "semantic-ui-react";
import { Dashboard } from '@uppy/react';
import ModalVersions from "./ModalVersions";
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

export default class ModalDragDrop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      openModalVersions: false
    };
  }

  handleClickProceed = () => {
    let files = [];
    this.props.dropComponent.getFiles().map((fileDropped) => {
      let file = fileDropped;
      let fileName = this.removeExtension(fileDropped.name);
      file.existing = !!this.props.files.find(f => f.name === fileName);
      if (file.existing) {
        file.originalFileId = this.props.files.find(f => f.name === fileName).id;
      }
      files.push(file);
    });
    console.log(files);
    this.setState(() => ({
      files: files,
      openModalVersions: true
    }));
  };

  removeExtension(filename) {
    return filename.replace(/\.[^/.]+$/, "");
  }

  handleModalVersionClickOk = (newVersions) => {
    this.setState(() => ({
      openModalVersions: false
    }));
    this.props.dropComponent.upload();
    this.props.handleConfirmDrop();
  };

  handleCancel = () => {
    this.props.dropComponent.reset();
    this.props.handleCancelDrop()
  };

  render() {
    return (
      <Modal
        size="small"
        open={this.props.showModal}
        onClose={this.handleCancel}
        className="modal-drag-drop"
      >
        <Modal.Header>Ajouter un fichier</Modal.Header>
        <Modal.Content>
          <Dashboard
            uppy={this.props.dropComponent}
            height={400}
            hideUploadButton={true}
            proudlyDisplayPoweredByUppy={false}
          />
        </Modal.Content>
        <Modal.Actions>
          <ModalVersions
            open={this.state.openModalVersions}
            files={this.state.files}
            onOk={this.handleModalVersionClickOk}
          />
          <Button onClick={this.handleCancel}>Annuler</Button>
          <Button icon='check' content='Valider' onClick={this.handleClickProceed} primary/>
        </Modal.Actions>
      </Modal>
    )
  }
}