export const ToggleButton = {
  name: 'ToggleButton',
  props: {
    buttonRef: {
      type: Function,
      required: true,
    },
    active: {
      type: Boolean,
    },
  },
  mounted() {
    this.buttonRef(this.$el);
  },
  render() {
    const { toggle: onToggle } = this.$listeners;
    return (
      <button
        class={{
          'btn btn-outline-secondary border-0': true,
          active: this.active,
        }}
        onClick={onToggle}
      >
        <span class="oi oi-eye" />
      </button>
    );
  },
};
