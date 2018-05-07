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
  props: {
    use: {
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
        class="table mb-0 w-100 dx-g-bs4-overflow-hidden dx-g-bs4-table"
        style={{
          tableLayout: 'fixed',
          overflow: 'hidden',
          marginBottom: 0,
          ...this.use === 'head' ? {
            position: this.stickyProp,
            top: 0,
            zIndex: 1,
            background: this.backgroundColor,
          } : null,
        }}
        {...{ attrs: this.$attrs, on: this.$listeners }}
      >
        {this.$slots.default}
      </table>
    );
  },
};
