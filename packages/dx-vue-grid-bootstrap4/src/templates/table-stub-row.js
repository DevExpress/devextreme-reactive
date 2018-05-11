export const TableStubRow = {
  name: 'TableStubRow',
  functional: true,
  props: {
    tableRow: {
      type: Object,
    },
    height: {
      type: String,
    },
  },
  render(h, context) {
    return (
      <tr
        style={{
          height: context.props.height,
        }}
      >
        {context.slots().default}
      </tr>
    );
  },
};
