export const ToggleButton = {
  name: 'ToggleButton',
  props: {
    getMessage: {
      type: Function,
      required: true,
    },
    active: {
      type: Boolean,
    },
  },
  render() {
    const { toggle: onToggle } = this.$listeners;
    return (
      <button
        class={{
          btn: true,
          'btn-outline-secondary': true,
          'border-0': true,
          active: this.active,
        }}
        onClick={onToggle}
      >
        <span class="oi oi-eye" />
      </button>
    );
  },
};
