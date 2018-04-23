export const TableSelectRow = {
  props: {
    selected: {
      type: Boolean,
    },
    selectByRowClick: {
      type: Boolean,
    },
  },
  render() {
    const { selected, selectByRowClick } = this;
    const { toggle: onToggle } = this.$listeners;
    return (
      <tr
        class={selected ? 'table-active' : ''}
        onClick={(e) => {
          if (!selectByRowClick) return;
          e.stopPropagation();
          onToggle();
        }}
      >
        {this.$slots.default}
      </tr>
    );
  },
};
