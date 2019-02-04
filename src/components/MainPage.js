import React from 'react';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { DragDrop } from '@uppy/react';
import {Button, Confirm, Icon, Segment, Table} from 'semantic-ui-react';
import 'moment-timezone';
import '../scripts/drag-drop';
import { performFetch } from "../scripts/FetchService";
import Navbar from './Navbar';
import TableRow from './TableRow';
import FoldersBreadcrumb from './FoldersBreadcrumb';
import BreadcrumbSection from '../scripts/BreadcrumbSection'
import ImageViewer from './ImageViewer';
import ContextMenu from "./ContextMenu";
import ModalTreeview from "./ModalTreeview";
import ModalTextInput from "./ModalTextInput";


export default class MainPage extends React.Component {
  constructor(props) {
    super(props);

    const uppy = Uppy({
      meta: { type: 'avatar' },
      autoProceed: true
    });

    uppy.on('complete', (result) => {
      this.refreshData();
    });

    this.state = {
      files: [],
      uppy: uppy,
      parent_id: 0,
      breadcrumbSections: new BreadcrumbSection(),
      fileToDisplay: '',
      showDeleteModal: false,
      showMoveModal: false,
      showModalTextInput: false,
      idOfItemToHandle: 0,
      modalTextInputSubmitFunction: null,
      modalTextInputTitle: ''
    };

    // Requires uppy to be in the state array first
    this.updateUppyEndpoint();
  }

  componentDidMount() {
    this.getFileFromFolder();
  }

  refreshData() {
    this.getFileFromFolder(this.state.parent_id);
  }

  getFileFromFolder = (parent_id) => {
    performFetch('http://localhost:5000/res' + (parent_id ? '/' + parent_id : ''), 'GET', true, () => {
      this.redirectToLogin();
    }).then(res => {
      let files = [];
      res.json().then((data) => {
        let content = data.content;
        if (parent_id) {
          content = content.children;
        }
        content.forEach(element => {
          if (element.type === 'folder') {
            files.unshift(element);
          } else {
            files.push(element);
          }
        });
        this.setState(() => { return { files } });
      });
    });
  };

  handleOnClickFolder = (id, name) => {
    this.updateCurrentFolder(id, name);
  };

  handleGoBackToFolder = (id) => {
    this.updateCurrentFolder(id);
  };

  updateCurrentFolder = (id, name) => {
    let breadcrumbSections = new BreadcrumbSection();
    breadcrumbSections.setSections(this.state.breadcrumbSections.getSections());
    if (name) {
      breadcrumbSections.addSection(id, name);
    } else {
      breadcrumbSections.goBackToSectionId(id);
    }

    this.setState(() => ({
        parent_id: id,
        fileToDisplay: null,
        breadcrumbSections: breadcrumbSections
    }));

    this.getFileFromFolder(id);
    this.updateUppyEndpoint(id);
  };

  handleOnClickImage = (id, name) => {
    this.setState(() => {
      return {
        fileToDisplay: 'http://localhost:5000/res/' + id + '/download'
      }
    })
  };

  handleHideImagePreview = () => {
    this.setState(() => ({ fileToDisplay: null }));
  };

  updateUppyEndpoint = (folder_id) => {
    const plugin = this.state.uppy.getPlugin('XHRUpload');
    if (plugin) {
      this.state.uppy.removePlugin(plugin);
    }
    this.state.uppy.use(XHRUpload, {
      endpoint: 'http://localhost:5000/res/upload' + (
        folder_id ? '/' + folder_id : ''
      ),
      fieldName: 'file',
      withCredentials: true
    });
  };

  handleOnClickDelete = (id) => {
    this.setState(() => ({
      showDeleteModal: true,
      idOfItemToHandle: id
    }));
  };

  handleOnClickMove = (id) => {
    this.setState(() => ({
      showMoveModal: true,
      idOfItemToHandle: id
    }));
  };

  handleConfirmDelete = () => {
    performFetch('http://localhost:5000/res/' + this.state.idOfItemToHandle, 'DELETE', true, () => {
      this.props.history.push('/login');
    }).then(() => {this.refreshData(); });
    this.setState(() => ({
      showDeleteModal: false,
      idOfItemToHandle: 0
    }));
  };

  handleConfirmMove = (parentFolderId) => {
    let body = JSON.stringify({
      parent_id: parentFolderId === '-1' ? null : parentFolderId
    });
    performFetch(`http://localhost:5000/res/${this.state.idOfItemToHandle}`, 'PUT', true, () => {
      this.props.history.push('/login');
    }, body).then(() => {this.refreshData();});

    this.hideMoveModal();
  };

  handleCancelMove = () => {
    this.hideMoveModal()
  };

  hideMoveModal() {
    this.setState(() => ({
      showMoveModal: false,
      idOfItemToHandle: 0
    }));
  }

  redirectToLogin() {
    this.props.history.push('/login');
  }

  handleRenameFile = (id) => {
    this.setState(() => ({
      showModalTextInput: true,
      idOfItemToHandle: id,
      modalTextInputSubmitFunction: this.handleConfirmRename,
      modalTextInputTitle: 'Renommer un fichier/dossier'
    }));
  };

  handleConfirmRename = (name) => {
    let body = JSON.stringify({
      name: name
    });

    performFetch(`http://localhost:5000/res/${this.state.idOfItemToHandle}`, 'PUT', true, () => {
      this.props.history.push('/login');
    }, body).then(() => {this.refreshData();});

    this.hideTextInputModal();
  };

  handleCancelTextInput = () => {
    this.hideTextInputModal();
  };

  hideTextInputModal() {
    this.setState(() => ({
      showModalTextInput: false,
      idOfItemToHandle: 0
    }));
  }

  handleCreateFolderClick = () => {
    this.setState(() => ({
      showModalTextInput: true,
      modalTextInputSubmitFunction: this.handleConfirmCreateFolder,
      modalTextInputTitle: 'Créer un dossier'
    }));
  };

  handleConfirmCreateFolder = (name) => {
    let body = JSON.stringify({
      type: 'folder',
      name: name
    });

    performFetch('http://localhost:5000/res', 'POST', true, () => {
      this.props.history.push('/login');
    }, body).then(() => {this.refreshData();});

    this.hideTextInputModal();
  };

  render() {
    return (
      <div className="main-page">
        <Navbar redirectAfterLogOut={(e) => this.redirectToLogin(e)}/>
        <Segment textAlign='right' className='new-folder-segment'>
          <Button icon labelPosition='right' primary onClick={this.handleCreateFolderClick}>
            Nouveau dossier
            <Icon name='plus' />
          </Button>
        </Segment>
        <FoldersBreadcrumb
          sections={this.state.breadcrumbSections.getSections()}
          onClickItem={this.handleGoBackToFolder}
          />
        {
          this.state.files.length > 0 && (
            <div className="files-table">
              <Table singleLine>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>Nom</Table.HeaderCell>
                    <Table.HeaderCell>Extension</Table.HeaderCell>
                    <Table.HeaderCell>Dernière modification</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                {
                  this.state.files.map((item, i) =>
                    <TableRow
                      key={i}
                      item={item}
                      onClickFolder={this.handleOnClickFolder}
                      onClickImage={this.handleOnClickImage}
                    />
                  )
                }
                </Table.Body>
              </Table>
            </div>
          )
        }
        <div id="drag-drop">
          <DragDrop  uppy={this.state.uppy}/>
        </div>
        <ImageViewer
          imagePath={this.state.fileToDisplay}
          handleHideImagePreview={this.handleHideImagePreview}
          />
        <ContextMenu
          onClickDelete={this.handleOnClickDelete}
          onClickMove={this.handleOnClickMove}
          onClickRename={this.handleRenameFile}
        />
        <Confirm
          open={this.state.showDeleteModal}
          onCancel={() => { this.setState(() => ({ showDeleteModal: false}))}}
          onConfirm={this.handleConfirmDelete}
          header="Attention"
          content="Voulez-vous vraiment supprimer ce fichier ? Cette action est irréversible."
          cancelButton="Annuler"
          size="tiny"
        />
        <ModalTreeview
          showModal={this.state.showMoveModal}
          handleConfirmMove={this.handleConfirmMove}
          handleCancelMove={this.handleCancelMove}
          onAuthenticationFailed={this.redirectToLogin}
        />
        <ModalTextInput
          showModal={this.state.showModalTextInput}
          handleConfirmTextInput={this.state.modalTextInputSubmitFunction}
          handleCancelTextInput={this.handleCancelTextInput}
          title={this.state.modalTextInputTitle}
        />
      </div>
    );
  }
}
