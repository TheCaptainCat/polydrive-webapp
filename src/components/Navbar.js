import React from 'react';
import { Menu, Header } from 'semantic-ui-react';

export default class Navbar extends React.Component {
  render() {
    return (
      <Menu id="top-navbar" className="fixed">
        <Menu.Item>
          <Header id="brand-name" as='h1'>PolyDrive</Header>
        </Menu.Item>
      </Menu>
    );
  }
}