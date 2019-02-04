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
    if (type === 'folder') {
      iconFilePath += 'folder';
    } else {
      if (mime.startsWith('image')) {
        iconFilePath += 'image';
      } else if (mime.startsWith('text')) {
        iconFilePath += 'text';
      } else if (mime === 'application/zip') {
        iconFilePath += 'archive';
      } else if (mime === 'application/pdf') {
        iconFilePath += 'pdf';
      } else if (mime.startsWith('audio')) {
        iconFilePath += 'music';
      } else if (mime.startsWith('video')) {
        iconFilePath += 'video';
      } else {
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