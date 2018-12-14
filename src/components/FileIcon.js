import React from 'react';

export default class FileIcon extends React.Component {
  constructor(props) {
    super(props);
    let iconFilePath = 'images/file_icons/';
    if (this.props.type == 'folder') {
      iconFilePath += 'folder';
    } else {
      switch (this.props.mime) {
        case 'image/jpeg':
        case 'image/png':
          iconFilePath += 'image';
          break;
        case 'text/plain':
          iconFilePath += 'text';
          break;
        case 'application/zip':
          iconFilePath += 'archive';
          break;
          case 'application/pdf':
        iconFilePath += 'pdf';
          break;
        default:
          iconFilePath += 'unknown';
      }
    }
    iconFilePath += '.svg';
    this.state = {
      iconFilePath
    }
  }

  render() {
    return (
      <div>
        <img className="file-icon" src={ this.state.iconFilePath } />
      </div>
    );
  }
};