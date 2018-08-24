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
    });
  },
  mounted() {
    this.checkStyles();
  },
  methods: {
    checkStyles() {
      const body = document.getElementsByTagName('body')[0];
      const { backgroundColor } = window.getComputedStyle(body);

      if (this.backgroundColor !== backgroundColor) {
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
          'dx-g-bs4-table-sticky': !!this.use,
        }}
        style={{
          minWidth: this.minWidth,
          ...this.use === 'head' ? {
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
