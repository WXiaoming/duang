def((ListControlFiltersItem, Button, ButtonHollow) => {

  class ListControlFiltersButtonGroup extends Jinkela {
    init() {
      new Button({
        text: depot.getConst('筛选'),
        onClick: () => {
          this.element.dispatchEvent(new CustomEvent('apply', { bubbles: true }));
        }
      }).to(this);

      new ButtonHollow({
        text: depot.getConst('清除'),
        onClick: () => {
          this.element.dispatchEvent(new CustomEvent('reset', { bubbles: true }));
        }
      }).to(this);
    }
    get styleSheet() {
      return `
        :scope {
          > button {
            margin-top: 1em;

            &:not(:last-child) {
              margin-right: 1em;
            }
          }
        }
      `;
    }
  }

  return class extends Jinkela {
    get styleSheet() {
      return `
        :scope {
          text-align: left;
          margin-bottom: 1em;
          padding: 16px;
          margin-right: 16px;
          border: 1px solid #e0e6ed;
          border-radius: 4px;
        }
      `;
    }
    init() {
      let { scheme } = depot;
      if (!scheme) return location.hash = '';
      let { filters = [] } = scheme;
      let list = ListControlFiltersItem.cast(filters).to(this);
      let $promise = Promise.all(list.map(item => item.$promise));
      this.list = list;
      new ListControlFiltersButtonGroup().to(this);
      this.element.addEventListener('apply', this.apply.bind(this));
      this.element.addEventListener('reset', this.reset.bind(this));
      Object.defineProperty(this, '$promise', { value: $promise, configurable: true });
      if (!filters.length) this.element.style.display = 'none';
    }
    apply() {
      let { uParams, where } = depot;

      this.list.forEach(({ input, checkbox }) => {
        let { defaultValue, value, key, squash } = input;
        let { checked, optional } = checkbox;

        if (!checked && optional) {
          delete where[key];
        } else {
          if (squash === 'direct') {
            if (defaultValue) Object.keys(defaultValue).forEach(key => delete where[key]);
            where[key] = value[''];
            delete value[''];
            Object.assign(where, value);
          } else {
            where[key] = value;
          }
        }
        uParams.where = JSON.stringify(where);
      });
      location.hash = new UParams(uParams);
    }
    reset() {
      let { uParams } = depot;
      let { where } = depot.scheme;

      uParams.where = JSON.stringify(where);
      location.hash = new UParams(uParams);
    }
  }
});
