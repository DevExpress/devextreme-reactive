export const TableFilterCell = {
  name: 'TableFilterCell',
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
    return (
      <th {...{ attrs: { ...this.$attrs }, on: { ...this.$listeners } }}>
        <div class="input-group">
          {this.$slots.default}
        </div>
      </th>
    );
  },
};
