import React from 'react';
import Moment from 'react-moment';
import FileIcon from './FileIcon';
import { Table } from 'semantic-ui-react';
import { contextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

export default class EmptyTableRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Table.Row key={this.props.index} className="file-table-row empty-table-row">
        <Table.Cell colSpan={4}>
          <p>Ce dossier est vide</p>
        </Table.Cell>
      </Table.Row>
    );
  }
}
