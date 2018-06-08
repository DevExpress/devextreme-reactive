const handleMouseDown = (e) => { e.currentTarget.style.outline = 'none'; };
const handleBlur = (e) => { e.currentTarget.style.outline = ''; };

export const Item = {
  name: 'Item',
  props: {
    item: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
    },
  },
  render() {
    const {
      disabled, item: { column, hidden },
    } = this;
    const { toggle: onToggle } = this.$listeners;
    return (
      <button
        class={{
          'dropdown-item dx-g-bs4-column-chooser-item': true,
          'dx-g-bs4-cursor-pointer': !disabled,
        }}
        type="button"
        onClick={onToggle}
        onMouseDown={handleMouseDown}
        onBlur={handleBlur}
        disabled={disabled}
      >
        <input
          type="checkbox"
          class={{
            'dx-g-bs4-cursor-pointer': !disabled,
            'dx-g-bs4-column-chooser-checkbox': true,
          }}
          tabIndex={-1}
          checked={!hidden}
          disabled={disabled}
          onChange={onToggle}
          onClick={e => e.stopPropagation()}
        />
        {column.title || column.name}
      </button>
    );
  },
};
