import React from 'react';
import {Menu, Header, Label, Icon} from 'semantic-ui-react';
import {performFetch} from "../scripts/FetchService";

export default class Navbar extends React.Component {

  handleClickLogout = () => {
    performFetch('http://localhost:5000/logout', 'GET', true, () => {this.props.redirectAfterLogOut()})
      .then(() => {
        this.props.redirectAfterLogOut();
      });
  };

  render() {
    return (
      <Menu id="top-navbar" className="fixed">
        <Menu.Item>
          <Header id="brand-name" as='h1'>PolyDrive</Header>
        </Menu.Item>
        <Icon name='log out' className='log-out-icon' onClick={this.handleClickLogout}/>
      </Menu>
    );
  }
}