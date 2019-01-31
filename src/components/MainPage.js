import React from 'react';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { DragDrop } from '@uppy/react';
import {Confirm, Table} from 'semantic-ui-react';
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
      idOfItemToDelete: 0
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
    performFetch('http://localhost:5000/res' + (parent_id ? '/' + parent_id : ''), 'GET', null, true, () => {
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
      idOfItemToDelete: id
    }));
  };

  handleConfirmDelete = () => {
    performFetch('http://localhost:5000/res/' + this.state.idOfItemToDelete, 'DELETE', true, () => {
      this.props.history.push('/login');
    }).then(() => {this.refreshData(); });
    this.setState(() => ({
      showDeleteModal: false
    }));
  };

  redirectToLogin() {
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="main-page">
        <Navbar />
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
        <ModalTreeview onAuthenticationFailed={this.redirectToLogin}/>
      </div>
    );
  }
}
