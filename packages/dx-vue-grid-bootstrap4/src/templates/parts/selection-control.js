
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
    this.$refs['my-ref'].indeterminate = this.indeterminate;
  },
  mounted() {
    this.$refs['my-ref'].indeterminate = this.indeterminate;
  },
  render() {
    const { disabled, checked, indeterminate } = this;
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
        indeterminate={indeterminate}
        ref="my-ref"
        onChange={() => {
          if (disabled) return;
          onChange();
        }}
        onClick={e => e.stopPropagation()}
      />
    );
  },
};
