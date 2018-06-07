export const TableStubCell = {
  name: 'TableStubCell',
  props: {
    tableRow: {
      type: Object,
    },
    tableColumn: {
      type: Object,
    },
  },
  render() {
    return <td class="py-0" />;
  },
};
