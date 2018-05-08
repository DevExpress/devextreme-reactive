export const TableFilterCell = {
  props: {
    column: {
      type: Object,
    },
    tableRow: {
      type: Object,
    },
    tableColumn: {
      type: Object,
    },
    getMessage: {
      type: Function,
    },
    filter: {
      type: Object,
      default: null,
    },
    filteringEnabled: {
      type: Boolean,
      default: true,
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
