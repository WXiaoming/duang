def((Checkbox, Input, Item) => class extends Item {
  init() {
    let { where } = depot;
    let { key, title, optional } = this;
    this.title = title;
    if (optional) {
      this.checkbox = new Checkbox(this, { checked: key in where }).to(this.label);
    }
    this.optional = optional;
    this.input = new Input(this, { onReady: () => this.ready() }).to(this);
    this.element.setAttribute('data-filter-component', this.component);
    this.element.addEventListener('keydown', event => this.keydown(event));
  }
  get value() { return this.input.value; }
  set value(value) { this.input.value = value; }
  get $promise() { return this.input.$promise; }
  keydown({ keyCode, target }) {
    if (target.tagName !== 'TEXTAREA' && keyCode === 13) this.apply();
  }
  ready() {
    let { where } = depot;
    let { key, squash } = this;
    if (!(key in where)) return;
    if (squash === 'direct') {
      this.value = Object.assign({ '': where[key] }, where)
    } else {
      this.value = where[key];
    }
    this.defaultValue = this.value;
  }
  get template() { 
    return `
      <div>
        <label ref="label">{title}</label>
      </div> 
    `; 
  }
  get styleSheet() {
    return `
      :scope {
        &:first-child { margin-top: 0; }
        display: block;
        margin-top: 1em;
        white-space: nowrap;
        line-height: 28px;
        > * {
          display: inline-block;
          vertical-align: top;
        }
        > input[type=checkbox] {
          vertical-align: middle;
          margin-right: 10px;
        }
      }
    `;
  }
});
