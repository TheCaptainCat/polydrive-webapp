import React from 'react';
import MDSpinner from "react-md-spinner";

export default class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {
          this.props.showLoading && (
            <div className="loading-screen">
              <div className="spinner-background">
                <div className="spinner-wrapper">
                  <MDSpinner size={40}/>
                </div>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}