export default class BreadcrumbSection {
  constructor() {
    this.sections = [
      { id: 0, key: 'Home', content: 'Home', active: true }
    ];
  }

  getSections() {
    return this.sections;
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
      s.active = i == (this.sections.length - 1);
      s.link = i != (this.sections.length - 1);
    });
  }

  goBackToSectionNumber(number) {
    this.sections = this.sections.slice(0, number+1);
    this.formatSections();
  }
}