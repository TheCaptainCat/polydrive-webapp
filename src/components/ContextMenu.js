import React from 'react';
import {Menu, Item, IconFont, Separator} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

export default class ContextMenu extends React.Component {

  handleDelete = (e) => {
    this.props.onClickDelete(e.props.id);
  };

  handleMove = (e) => {
    this.props.onClickMove(e.props.id);
  };

  render() {
    return (
      <Menu id='context-menu'>
        <Item onClick={this.handleMove}><IconFont className="share icon"/>Déplacer</Item>
        <Separator />
        <Item><IconFont className="pencil alternate icon"/>Renommer</Item>
        <Item onClick={this.handleDelete}><IconFont className="trash alternate icon"/>Supprimer</Item>
      </Menu>
    );
  }
};