def(() => class extends Jinkela {
  init() {
    if (!this.value) this.element.setAttribute('disabled', true);
    this.text = this.defaultText || '点击下载';
  }
  onClick(e) {
    if (this.element.hasAttribute('disabled')) e.preventDefault();
  }
  get value() { return this.$value; }
  set value(value) {
    if (!/^https?/.test(value)) value = `${location.host}${location.pathname}${value.replace(/^\/?/, '/')}`;
    this.$value = value;
    if (value) this.element.setAttribute('disabled', false);
  }
  get template() { return `<a on-click="{onClick}" href="{value}" download>{text}</a>`; }
  get styleSheet() {
    return `
      :scope {
        text-decoration: none;
        display: inline-block;
        border: 0;
        border-radius: 4px;
        padding: 7px 9px;
        font-size: 12px;
        font-family: inherit;
        border: 1px solid;
        background-color: #20a0ff;
        border-color: #20a0ff;
        line-height: 1;
        cursor: pointer;
        color: #fff;
        position: relative;
        text-align: center;
        &:hover { opacity: .8; }
        &[disabled] {
          color: #c0ccda;
          cursor: not-allowed;
          background-image: none;
          background-color: #eff2f7;
          border-color: #d3dce6;
          &:hover { opacity: 1; }
        }
      }
    `;
  }
});
