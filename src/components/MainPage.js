import React from 'react';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { DragDrop } from '@uppy/react';
import { Table } from 'semantic-ui-react';
import Moment from 'react-moment';
import 'moment-timezone';



export default class MainPage extends React.Component {
  constructor(props) {
    super(props);

    const uppy = Uppy({
      meta: { type: 'avatar' },
      restrictions: { maxNumberOfFiles: 1 },
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
        data.content.forEach(element => {
          files.push(element);
        });
        //console.log(files[0].version[0]['created']);
        this.setState(() => { return { files } });
      });
    })
  }

  render() {
    return (
      <div>
        {
          this.state.files.length > 0 && (
            <div>
              <Table singleLine>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Nom</Table.HeaderCell>
                    <Table.HeaderCell>Dernière modification</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                { this.state.files.map((item, i) => (
                    <Table.Row key={i}>
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell>
                        <Moment format='DD/MM/YYYY'>
                          {item.version[0]['created']}
                        </Moment>
                      </Table.Cell>
                    </Table.Row>
                  ))
                }
                </Table.Body>
              </Table>
            </div>
          )
        }
        <DragDrop uppy={this.state.uppy}></DragDrop>
      </div>
      
    );
  }
}