import React from 'react';
import {Button, Icon, Modal, Table} from "semantic-ui-react";
import Moment from "react-moment";

export default class ModalHistory extends React.Component {
  constructor(props) {
    super(props);
  }

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
                              <Moment format='DD/MM/YYYY HH:mm'>
                                { item.created }
                              </Moment>
                              <div className="history-table-row-icons">
                                <Icon name='download'/>
                                <Icon name='trash'/>
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
