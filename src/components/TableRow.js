import React from 'react';
import Moment from 'react-moment';
import FileIcon from './FileIcon';
import { Table } from 'semantic-ui-react';

const TableRow = (props) => (
  <Table.Row key={props.index}>
    <Table.Cell>
      <FileIcon type={props.item.type} mime={props.item.mime}></FileIcon>
    </Table.Cell>
    <Table.Cell>{props.item.name}</Table.Cell>
    <Table.Cell>{props.item.extension}</Table.Cell>
    <Table.Cell>
      {
        props.item.versions && (
          <Moment format='DD/MM/YYYY'>
            {props.item.versions[0]['created']}
          </Moment>
        )
      }
    </Table.Cell>
  </Table.Row>
);

export default TableRow;