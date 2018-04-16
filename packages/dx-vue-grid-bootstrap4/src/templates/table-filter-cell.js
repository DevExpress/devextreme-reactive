export const TableFilterCell = {
  props: {
    column: {},
    tableRow: {},
    tableColumn: {},
    getMessage: {},
    filter: {
      type: Object,
    },
    filteringEnabled: {
      type: Boolean,
    },
  },
  render() {
    const { filter, filteringEnabled } = this;
    return (
      <th {...this.$attrs}>
        {this.$slots.default || (
          <input
            type="text"
            class="form-control"
            value={filter ? filter.value : ''}
            onInput={e => this.$emit('filter', e.target.value ? { value: e.target.value } : null)}
            readonly={!filteringEnabled}
          />
        )}
      </th>
    );
  },
};
