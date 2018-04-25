export const GroupingControl = {
  props: {
    align: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
    },
  },
  render() {
    const { align, disabled } = this;
    const invertedAlign = align === 'left';

    return (
      <div
        class={{
          'dx-g-bs4-grouping-control': true,
          'float-right text-right': invertedAlign,
          'float-left text-left': !invertedAlign,
        }}
        onClick={(e) => {
          if (disabled) return;
          e.stopPropagation();
          this.$emit('group');
        }}
      >
        <span
          class={{
            'oi oi-list dx-g-bs4-grouping-control-icon': true,
            'dx-g-bs4-cursor-pointer': !disabled,
            'dx-g-bs4-inactive': disabled,
          }}
        />
      </div>
    );
  },
};
