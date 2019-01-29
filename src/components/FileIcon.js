import React from 'react';

export default class FileIcon extends React.Component {
  constructor(props) {
    super(props);
    const iconFilePath = this.getIconFilePath(
      this.props.type,
      this.props.mime
    );
    this.state = {
      icon: iconFilePath
    }
  }

  componentWillReceiveProps(nextProps) {
    const iconFilePath = this.getIconFilePath(
      nextProps.type,
      nextProps.mime
    );
    this.setState(() => ({
      icon: iconFilePath
    }));
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
        <img className="file-icon" src={ this.state.icon } />
      </div>
    );
  }
};