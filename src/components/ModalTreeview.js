import React from 'react';
import {Button, Header, Icon, Image, Modal} from "semantic-ui-react";
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee, faSquare, faChevronRight, faChevronDown, faPlusSquare, faMinusSquare, faFolder, faFile } from '@fortawesome/fontawesome-free-solid';

const nodes = [{
  value: '1',
  label: 'Home',
  children: [
    {
      value: '4',
      label: 'Cours',
      children: [
        { value: '12', label: 'IUT' },
        { value: '19', label: 'Polytech' }
      ]
    },
    {
      value: '6',
      label: 'Divers'
    }
  ],
}];

export default class ModalTreeview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      folders: [],
      checked: [],
      expanded: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/res', {
      mode: 'cors',
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => {
      let folders = [];
      res.json().then((data) => {
        let content = data.content;
        content.forEach(element => {
          folders.push(element);
        });
        this.setState(() => { return { folders: this.formatResponse(folders) } });
      });
    });
  }
  formatResponse(response) {
    let folders = response;
    console.log(folders);
    // TODO
    return folders;
  }

  handleCheck = (checkedItems, currentItem) => {
    this.setState({ checked: [currentItem.value] })
  };

  render() {
    return (
      <Modal className="tiny modal-treeview" trigger={<Button>Long Modal</Button>}>
        <Modal.Header>Déplacer un fichier/dossier</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <CheckboxTree
              nodes={nodes}
              checked={this.state.checked}
              expanded={this.state.expanded}
              onCheck={this.handleCheck}
              onExpand={expanded => this.setState({ expanded })}
              noCascade={true}
              icons={{
                check: <FontAwesomeIcon className="rct-icon rct-icon-check" icon="check-square" />,
                uncheck: <FontAwesomeIcon className="rct-icon rct-icon-uncheck" icon='square' />,
                halfCheck: <FontAwesomeIcon className="rct-icon rct-icon-half-check" icon="check-square" />,
                expandClose: <FontAwesomeIcon className="rct-icon rct-icon-expand-close" icon="chevron-right" />,
                expandOpen: <FontAwesomeIcon className="rct-icon rct-icon-expand-open" icon="chevron-down" />,
                expandAll: <FontAwesomeIcon className="rct-icon rct-icon-expand-all" icon="plus-square" />,
                collapseAll: <FontAwesomeIcon className="rct-icon rct-icon-collapse-all" icon="minus-square" />,
                parentClose: <FontAwesomeIcon className="rct-icon rct-icon-parent-close" icon="folder" />,
                parentOpen: <FontAwesomeIcon className="rct-icon rct-icon-parent-open" icon="folder-open" />,
                leaf: <FontAwesomeIcon className="rct-icon rct-icon-leaf-close" icon="folder" />
              }}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button>
            Annuler
          </Button>
          <Button primary disabled={this.state.checked.length === 0}>
            Déplacer
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}