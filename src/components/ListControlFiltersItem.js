def((Input, Item) => class extends Item {
  init() {
    let { where } = depot;
    let { key, title, optional } = this;
    this.input = new Input(this, { onReady: () => this.ready() }).to(this);
  }
  get $promise() { return this.input.$promise; }
  keydown({ keyCode, target }) {
    if (target.tagName !== 'TEXTAREA' && keyCode === 13) this.apply();
  }
  ready() {
    let { where } = depot;
    let { key, squash } = this;
    this.checked = key in where;
    if (!(key in where)) return;
    if (squash === 'direct') {
      this.value = Object.assign({ '': where[key] }, where)
    } else {
      this.value = where[key];
    }
    this.defaultValue = this.value;
  }
  set checked(value) { this.checkbox.checked = value; }
  get checked() { return this.checkbox.checked; }
  get value() { return this.input.value; }
  set value(value) { this.input.value = value; }
  get template() { 
    return `
      <div on-keydown="{keydown}">
        <label>
          <span>{title}</span>
          <input type="checkbox" ref="checkbox" if="{optional}" />
        </label>
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
        > label {
          min-width: 100px;
        }
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
