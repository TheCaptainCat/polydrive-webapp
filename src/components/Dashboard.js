import React from 'react';

export default class Dashboard extends React.Component {
  componentDidMount() {
    console.log('mmm');
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
            console.log(res);
        })
  }

  render() {
    return (
      <p>Dashboard</p>
    );
  }
}