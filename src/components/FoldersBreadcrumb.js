import React from 'react';
import { Breadcrumb } from 'semantic-ui-react'

export default class FoldersBreadcrumb extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSectionClick = (e) => {
    let id = parseInt(e.target.getAttribute('data-id'));
    if (id != this.props.sections.length-1) {
      this.props.onClickItem(id);
    }
  }

  render() {
    return (
      <Breadcrumb id="folders-breadcrumb">
        {
          this.props.sections.length > 0 && this.props.sections.map((item, i) =>
            <span key={i}>
              <Breadcrumb.Section
                link={item.link}
                active={item.active}
                onClick={this.handleSectionClick}
                data-id={item.id}
              >
                {item.content}
              </Breadcrumb.Section>
              {
                i != this.props.sections.length - 1 && <Breadcrumb.Divider icon='right angle' />
              }
            </span>
          )
        }
      </Breadcrumb>
    );
    
  }
}