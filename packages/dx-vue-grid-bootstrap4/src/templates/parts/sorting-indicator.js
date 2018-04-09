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
      invisible: !this.direction,
    };
    return (
      <span
        class={classes}
        style={{ top: '0', fontSize: '11px' }}
      />
    );
  },
};
