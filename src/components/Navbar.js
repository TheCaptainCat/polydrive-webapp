import React from 'react';
import {Menu, Header, Label, Icon} from 'semantic-ui-react';
import {performFetch} from "../scripts/FetchService";

export default class Navbar extends React.Component {

  handleClickLogout = () => {
    performFetch(`${this.props.url}/logout`, 'GET', true, () => {this.props.redirectAfterLogOut()})
      .then(() => {
        this.props.redirectAfterLogOut();
      });
  };

  render() {
    return (
      <Menu id="top-navbar" className="fixed">
        <Menu.Item>
          <img src="images/polydrive-icon.png" className="logo-navbar" alt="Logo"/>
          <Header id="brand-name" as='h1'>PolyDrive</Header>
        </Menu.Item>
        <Icon name='log out' className='log-out-icon' onClick={this.handleClickLogout}/>
      </Menu>
    );
  }
}