import React from 'react';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { DragDrop } from '@uppy/react';
import { Table } from 'semantic-ui-react';
import 'moment-timezone';
import '../scripts/drag-drop';
import Navbar from './Navbar';
import TableRow from './TableRow';



export default class MainPage extends React.Component {
  constructor(props) {
    super(props);

    const uppy = Uppy({
      meta: { type: 'avatar' },
      autoProceed: true
    })
    
    uppy.use(XHRUpload, { 
      endpoint: 'http://localhost:5000/files',
      fieldName: 'file',
      withCredentials: true
    })
    
    uppy.on('complete', (result) => {
      this.refreshData();
    })

    this.state = {
      files: [],
      uppy: uppy
    }
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData = () => {
    fetch('http://localhost:5000/folders', {
      mode: 'cors',
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
    })
    .then(res => {
      let files = [];
      res.json().then((data) => {
        console.log(data);
        data.content.forEach(element => {
          files.push(element);
        });
        this.setState(() => { return { files } });
      });
    })
  }

  render() {
    return (
      <div className="main-page">
        <Navbar />
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
                    />
                  )
                }
                </Table.Body>
              </Table>
            </div>
          )
        }
        <div id="drag-drop">
          <DragDrop  uppy={this.state.uppy}></DragDrop>
        </div>
      </div>
      
    );
  }
}