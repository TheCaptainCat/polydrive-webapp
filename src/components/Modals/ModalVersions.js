import React from 'react';
import {Button, Checkbox, List, Modal} from "semantic-ui-react";

export default class ModalVersions extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      checkboxes: []
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.open) {
      let checkboxes = Array.from({length: nextProps.files.length}, () => false);
      this.setState(() => ({checkboxes}));
    }
  }

  handleCheckboxChange = (e, index) => {
    e.preventDefault();
    let checkboxes = [...this.state.checkboxes];
    checkboxes[index] = !checkboxes[index];
    console.log(index);
    this.setState(() => ({checkboxes}))
  };

  handleOnClickOk = () => {
    let files = [...this.props.files];
    for (let i = 0; i < this.state.checkboxes.length; i++) {
      files[i].createNew = this.state.checkboxes[i];
    }
    this.props.onOk(files);
  };

  render() {
    return (
      <Modal
        className="modal-versions"
        open={this.props.open}
        onClose={this.close}
        size='tiny'
      >
        <Modal.Header>Avertissement</Modal.Header>
        <Modal.Content>
          <p>Des fichiers portant le même nom que ceux ci-dessous existent déjà dans ce dossier. Voulez-vous les stocker
            sous forme de fichiers séparés ?</p>
          <List divided relaxed>
            {
              this.props.files.map((item, i) =>
                item.existing && (
                  <List.Item key={i}>
                    <List.Content>
                      <Checkbox
                        toggle
                        label={item.name}
                        checked={this.state.checkboxes[i]}
                        onChange={(e) => this.handleCheckboxChange(e, i)}
                      />
                    </List.Content>
                  </List.Item>
                )
              )
            }
          </List>
        </Modal.Content>
        <Modal.Actions>
          <Button icon='check' content='Valider' onClick={this.handleOnClickOk} primary/>
        </Modal.Actions>
      </Modal>
    )
  }
}