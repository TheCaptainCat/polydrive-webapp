import React from 'react';
import Moment from 'react-moment';
import FileIcon from './FileIcon';
import { Table } from 'semantic-ui-react';

export default class TableRow extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOnClick = () => {
    if (this.props.item.type == 'folder') {
      this.props.onClickFolder(this.props.item.id, this.props.item.name);
    }
  }

  render() {
    return (
      <Table.Row key={this.props.index} className="file-table-row" onClick={this.handleOnClick}>
        <Table.Cell>
          <FileIcon type={this.props.item.type} mime={this.props.item.mime}></FileIcon>
        </Table.Cell>
        <Table.Cell>{this.props.item.name}</Table.Cell>
        <Table.Cell>{this.props.item.extension}</Table.Cell>
        <Table.Cell>
          {
            this.props.item.versions && (
              <Moment format='DD/MM/YYYY'>
                {this.props.item.versions[0]['created']}
              </Moment>
            )
          }
        </Table.Cell>
      </Table.Row>
    );
  }
}