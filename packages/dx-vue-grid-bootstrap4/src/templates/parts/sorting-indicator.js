export const SortingIndicator = {
  props: {
    direction: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
    },
  },
  render() {
    const { direction } = this;
    const classes = {
      'oi dx-g-bs4-sorting-indicator mx-2': true,
      'oi-arrow-thick-bottom': direction === 'desc',
      'oi-arrow-thick-top': direction !== 'desc',
      invisible: !direction,
    };
    return (
      <span
        class={classes}
      />
    );
  },
};
