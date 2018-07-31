let globalStickyProp;
const testCSSProp = (property, value, noPrefixes) => {
  const prop = `${property}:`;
  const el = document.createElement('test');
  const mStyle = el.style;

  if (!noPrefixes) {
    mStyle.cssText = `${prop + ['-webkit-', '-moz-', '-ms-', '-o-', ''].join(`${value};${prop}`) + value};`;
  } else {
    mStyle.cssText = prop + value;
  }
  return mStyle[property];
};

export const Table = {
  name: 'Table',
  props: {
    use: {
      type: String,
    },
    minWidth: {
      type: String,
    },
  },
  data() {
    return ({
      backgroundColor: 'white',
      stickyProp: globalStickyProp,
    });
  },
  mounted() {
    this.checkStyles();
  },
  methods: {
    checkStyles() {
      globalStickyProp = testCSSProp('position', 'sticky');

      const body = document.getElementsByTagName('body')[0];
      const { backgroundColor } = window.getComputedStyle(body);

      if (this.backgroundColor !== backgroundColor
        || this.stickyProp !== globalStickyProp) {
        this.stickyProp = globalStickyProp;
        this.backgroundColor = backgroundColor;
      }
    },
  },
  render() {
    return (
      <table
        class={{
          'table mb-0 dx-g-bs4-overflow-hidden dx-g-bs4-table': true,
          'dx-g-bs4-table-head': this.use === 'head',
        }}
        style={{
          minWidth: this.minWidth,
          ...this.use === 'head' ? {
            position: this.stickyProp,
            backgroundColor: this.backgroundColor,
          } : null,
        }}
        {...{ attrs: this.$attrs, on: this.$listeners }}
      >
        {this.$slots.default}
      </table>
    );
  },
};
