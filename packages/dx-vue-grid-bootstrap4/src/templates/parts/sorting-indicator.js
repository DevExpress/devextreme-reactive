export const SortingIndicator = {
  props: {
    direction: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
  },
  render() {
    const classes = {
      oi: true,
      'oi-arrow-thick-bottom': this.direction === 'desc',
      'oi-arrow-thick-top': this.direction !== 'desc',
      'dx-g-bs4-sorting-indicator': true,
      invisible: !this.direction,
    };
    return (
      <span
        class={classes}
      />
    );
  },
};
