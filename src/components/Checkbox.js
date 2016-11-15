def(() => class extends Jinkela {
  get template() {
    return `
      <input type="checkbox" />
    `;
  }
  get checked() { return this.element.checked; }
  set checked(value) { this.element.checked = !!value; }
});

