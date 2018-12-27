export default class BreadcrumbSection {
  constructor() {
    this.sections = [
      { id: 0, key: 'Home', content: 'Home', active: true }
    ];
  }

  getSections() {
    return this.sections;
  }

  setSections(sections) {
    this.sections = sections;
  }

  getLastId() {
    return this.sections[this.sections.length - 1].id;
  }

  addSection(id, name) {
    this.sections = this.sections.concat(
      { id: id, key: id, content: name, active: true, link: false }
    );
    this.formatSections();
  }

  formatSections() {
    this.sections.map((s, i) => {
      s.active = i === (this.sections.length - 1);
      s.link = i !== (this.sections.length - 1);
    });
  }

  goBackToSectionId(id) {
    this.sections = this.sections.slice(0, this.getIndexOfSectionId(id)+1);
    this.formatSections();
  }

  getIndexOfSectionId(id) {
    for (let i = 0; i < this.sections.length; i++) {
      if (this.sections[i].id === id) {
        return i;
      }
    }
    return 0;
  }
}