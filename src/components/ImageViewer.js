import React from 'react';
import {Icon} from "semantic-ui-react";

export default class ImageViewer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'open': false
    };
  }

  handleClick = (e) => {
    if (e.target.tagName !== 'IMG') {
      this.props.handleHideImagePreview();
    }
  };

  componentWillReceiveProps(newProps) {
    this.setState(() => ({open: !!newProps.imagePath}));
  }

  render () {
    return (
      <div>
        {
          this.state.open && (
            <div className="modal-image" onClick={this.handleClick}>
              <div className="image-wrapper">
                <figure>
                  <img src={this.props.imagePath} />
                  <Icon name='close' className="close-icon" />
                </figure>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}
