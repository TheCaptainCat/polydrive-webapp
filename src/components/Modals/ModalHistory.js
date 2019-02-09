import React from 'react';
import {Button, Icon, Modal, Table} from "semantic-ui-react";
import Moment from "react-moment";
import ModalDeleteVersion from "./ModalDeleteVersion";

export default class ModalHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModalDelete: false,
      idOfVersionToDelete: 0
    }
  }

  handleOnClickDownload = (e, index) => {
    window.open('http://localhost:5000/res/' + this.props.file.id + '/' + index + '/download')
  };

  handleOnClickDelete = (e, index) => {
    this.setState(() => ({
      idOfVersionToDelete: index,
      showModalDelete: true
    }));
  };

  handleConfirmDeleteVersion = () => {
    this.props.handleConfirmDeleteVersion(this.props.file.id, this.state.idOfVersionToDelete);
    this.setState(() => ({
      idOfVersionToDelete: 0,
      showModalDelete: false
    }));
  };

  handleCancelDeleteVersion = () => {
    this.setState(() => ({
      idOfVersionToDelete: 0,
      showModalDelete: false
    }));
  };

  render() {
    return (
      <div>
        {
          this.props.file && (
            <Modal open={this.props.showModal} onClose={() => {this.props.handleCancelShowHistory()}} className="small modal-history">
              <Modal.Header>Versions du fichier</Modal.Header>
              <Modal.Content image>
                <Modal.Description>
                  <h4>Historique de {this.props.file.name}</h4>
                  <Table singleLine>
                    <Table.Body>
                      {
                        this.props.file.versions.map((item, i) => (
                          <Table.Row key={i}>
                            <Table.Cell className="history-table-row">
                              <Moment format='DD/MM/YYYY HH:mm:ss'>
                                { item.created }
                              </Moment>
                              <div className="history-table-row-icons">
                                <Icon name='download' onClick={(e) => {this.handleOnClickDownload(e, item.id)}}/>
                                {
                                  this.props.file.versions.length > 1 && (
                                    <Icon name='trash' onClick={(e) => {this.handleOnClickDelete(e, item.id)}}/>
                                  )
                                }
                              </div>
                            </Table.Cell>
                          </Table.Row>
                        ))
                      }
                    </Table.Body>
                  </Table>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <ModalDeleteVersion
                  open={this.state.showModalDelete}
                  onConfirm={this.handleConfirmDeleteVersion}
                  onCancel={this.handleCancelDeleteVersion}
                />
                <Button onClick={() => {this.props.handleCancelShowHistory()}}>
                  Fermer
                </Button>
              </Modal.Actions>
            </Modal>
          )
        }
      </div>
    );
  }
}
