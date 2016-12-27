def((Item, InputString) => {

  class ResultItem extends Item {
    get tagName() { return 'li'; }
    init() {
      this.element.textContent = this.value;
      this.element.addEventListener('click', e => {
        e.stopPropagation();
        this.element.dispatchEvent(new CustomEvent('result::select', {
          bubbles: true,
          detail: this.key
        }));
      });
    }
    get styleSheet() {
      return `
        :scope {
          padding: 5px 10px;
          &:hover {
            background-color: #C0CCDA;
            color: #fff;
            cursor: pointer;
          }
        }
      `;
    }
  }

  class Result extends Jinkela {
    get tagName() { return 'ul'; }
    init() {
      window.addEventListener('click', () => {
        this.element.style.display = 'none';
      });
    }
    render(list) {
      this.element.innerHTML = '';
      ResultItem.cast(list).to(this);
      this.element.style.display = 'block';
    }
    get styleSheet() {
      return `
        :scope {
          list-style: none;
          position: absolute;
          left: 0;
          top: 100%;
          overflow-y: scroll;
          overflow-x: hidden;
          white-space: nowrap;
          background-color: #fff;
          border: 1px solid #C0CCDA;
          z-index: 10;
          width: 120px;
          padding: 0;
          margin: 0;
          margin-top: -1px;
        }
      `;
    }
  }

  return class extends Jinkela {
    get value() { return this.selected; }
    set value(value) { this.selected = value; }
    init() {
      this.input.element.addEventListener('keyup', e => {
        this.fetch().then(raw => this.list.render(raw));
      });
      this.element.addEventListener('result::select', e => {
        this.value = e.detail;
      });
    }
    fetch() {
      return new Promise((resolve, reject) => {
        resolve([{ value: 'xx' }]);
      });
    }
    get Result() { return Result; }
    get InputString() { return InputString; }
    get template() {
      return `
        <div>
          <jkl-input-string ref="input"></jkl-input-string>
          <jkl-result ref="list" data={result}></jkl-result>
        </div>
      `;
    }
    get styleSheet() {
      return `
        :scope {
          position: relative;
        }
      `;
    }
  }
});

