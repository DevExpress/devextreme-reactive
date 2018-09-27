import { TABLE_FLEX_TYPE } from '@devexpress/dx-grid-core';

export const TableLayout = {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    layoutComponent: {
      type: Object,
      required: true,
    },
    minColumnWidth: {
      type: Number,
      required: true,
    },
  },
  methods: {
    getColumns() {
      const { columns } = this;

      let result = columns;

      const isFixedWidth = columns.filter(column => column.width === undefined).length === 0;
      if (isFixedWidth) {
        result = result.slice();
        result.push({ key: TABLE_FLEX_TYPE.toString(), type: TABLE_FLEX_TYPE });
      }

      return result;
    },
  },
  render() {
    const {
      minColumnWidth,
      layoutComponent: Layout,
    } = this;

    const columns = this.getColumns();
    const minWidth = columns
      .map(column => column.width || (column.type === TABLE_FLEX_TYPE ? 0 : minColumnWidth))
      .reduce((acc, width) => acc + width, 0);

    return (
      <Layout
        {...{ attrs: this.$attrs }}
        columns={columns}
        minWidth={minWidth}
        minColumnWidth={minColumnWidth}
      />
    );
  },
};
