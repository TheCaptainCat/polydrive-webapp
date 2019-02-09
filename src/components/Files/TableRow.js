import React from 'react';
import Moment from 'react-moment';
import FileIcon from './FileIcon';
import { Table } from 'semantic-ui-react';
import { contextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

export default class TableRow extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOnClick = () => {
    if (this.props.item.type === 'folder') {
      this.props.onClickFolder(this.props.item.id, this.props.item.name);
    } else {
      if (['image/png', 'image/jpeg'].includes(this.props.item.mime)) {
        this.props.onClickImage(this.props.item.id, this.props.item.name);
      } else {
        window.open(`${this.props.url}/res/${this.props.item.id}/download`)
      }
    }
  };

  handleEvent = (e) => {
    e.preventDefault();
    contextMenu.show({
      id: 'context-menu',
      event: e,
      props: {
        id: this.props.item.id
      }
    });
  };

  render() {
    return (
      <Table.Row key={this.props.index} className="file-table-row" onClick={this.handleOnClick} onContextMenu={this.handleEvent}>
        <Table.Cell>
          <FileIcon type={this.props.item.type} mime={this.props.item.mime}/>
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
