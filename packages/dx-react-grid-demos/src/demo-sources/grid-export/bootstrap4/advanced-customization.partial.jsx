// BLOCK:body
const getGroupStyle = ({ groupedBy }) => ({
  backgroundColor: `#${groupColors[groupedBy]}`,
});

const GroupRow = ({ style, ...restProps }) => {
  const { row } = restProps;
  return (
    <TableGroupRow.Row
      style={{ ...style, ...getGroupStyle(row) }}
      {...restProps}
    />
  );
};

const GroupIndentCell = ({ style, ...restProps }) => (
  <TableGroupRow.IndentCell
    style={{ ...style, backgroundColor: 'inherit' }}
    {...restProps}
  />
);

const GroupCellContainer = ({ style, ...restProps }) => (
  <TableGroupRow.Container
    style={{ ...style, backgroundColor: 'inherit' }}
    {...restProps}
  />
);

const Cell = ({ style, ...restProps }) => {
  const { row, column } = restProps;
  console.log(getCellStyle(row, column))
  return (
    <Table.Cell
      style={{ ...style, ...getCellStyle(row, column) }}
      {...restProps}
    />
  );
};
// BLOCK:body
