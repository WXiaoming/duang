def((XPut) => class extends XPut {
  buildComponent() {
    let { component = 'String', args = {}, depot } = this;
    return req('Input' + component).catch((e) => {
      console.log(e)
      throw new Error(`Unknown component "${component}"`);
    }).then(Component => {
      this.result = new Component(args, { depot }).to(this);
      this.$promise.resolve();
    }, error => {
      console.log(error)
      this.element.textContent = error.message;
    });
  }
});
