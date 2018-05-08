export const EditCell = {
  props: {
    tableRow: {
      type: Object,
    },
    column: {
      type: Object,
    },
    row: null,
    tableColumn: {
      type: Object,
    },
    value: null,
    editingEnabled: {
      type: Boolean,
      default: true,
    },
  },
  render() {
    const { value, editingEnabled, tableColumn } = this;
    return (
      <td class="align-middle dx-g-bs4-table-edit-cell">
        {this.$slots.default || (
          <input
            type="text"
            class={{
              'form-control w-100': true,
              'text-right': tableColumn && tableColumn.align === 'right',
              'text-center': tableColumn && tableColumn.align === 'center',
            }}
            readOnly={!editingEnabled}
            value={value}
            onChange={e => this.$emit('valueChange', e.target.value)}
          />
        )}
      </td>
    );
  },
};
