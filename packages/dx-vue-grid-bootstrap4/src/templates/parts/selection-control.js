
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
  attached() {
    this.$root.indeterminate = this.indeterminate;
  },
  render() {
    const { disabled, checked, indeterminate } = this;
    const { change: onChange } = this.$listeners;
    // this.$root.indeterminate = indeterminate;
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
        // ref={(ref) => {
        //   console.log(this);
        //   if (!ref) return;
        //   ref.indeterminate = indeterminate; // eslint-disable-line no-param-reassign
        // }}
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
