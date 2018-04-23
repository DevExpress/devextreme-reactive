export const SelectionControl = {
  props: {
    disabled: {
      type: Boolean,
    },
    checked: {
      type: Boolean,
    },
    indeterminate: {
      type: Boolean,
    },
  },
  updated() {
    this.applyIndeterminate();
  },
  mounted() {
    this.applyIndeterminate();
  },
  methods: {
    applyIndeterminate() {
      this.$refs['selection-control-ref'].indeterminate = this.indeterminate;
    },
  },
  render() {
    const { disabled, checked } = this;
    const { change: onChange } = this.$listeners;
    return (
      <input
        class={{
          'd-inline-block': true,
          'dx-g-bs4-cursor-pointer': !disabled,
        }}
        type="checkbox"
        disabled={disabled}
        checked={checked}
        ref="selection-control-ref"
        onChange={() => {
          if (disabled) return;
          onChange();
        }}
        onClick={e => e.stopPropagation()}
      />
    );
  },
};
