import React from 'react';

export default class FileIcon extends React.Component {
  constructor(props) {console.log('hgjkhgkj');
    super(props);
    const iconFilePath = this.getIconFilePath(
      this.props.type,
      this.props.mime
    );
    this.state = {
      iconFilePath
    }
  }

  componentWillReceiveProps(nextProps) {
    const iconFilePath = this.getIconFilePath(
      nextProps.type,
      nextProps.mime
    );
    this.state = {
      iconFilePath
    }
  }

  getIconFilePath(type, mime) {
    let iconFilePath = 'images/file_icons/';
    if (type == 'folder') {
      iconFilePath += 'folder';
    } else {
      switch (mime) {
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
    return iconFilePath + '.svg';
  }

  render() {
    return (
      <div>
        <img className="file-icon" src={ this.state.iconFilePath } />
      </div>
    );
  }
};