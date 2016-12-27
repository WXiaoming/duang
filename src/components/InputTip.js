def(() => {
  return class extends Jinkela {
    get template() {
      return `
        <div class="{status}">
          <p>{text}</p>
        </div>
      `;
    }
    get styleSheet() {
      return `
        :scope {
          border-left-width: 6px;
          border-left-style: solid;
          padding: 20px;
          &.notice {
            background-color: #F4FAFF;
            color: #008BE7;
            border-color: #4EB9FF;
          }
          &.danger {
            background-color: #FFF4F4;
            color: #E62929;
            border-color: #F18484;
          }
          > p { margin: 0; }
        }
      `;
    }
  };
});

