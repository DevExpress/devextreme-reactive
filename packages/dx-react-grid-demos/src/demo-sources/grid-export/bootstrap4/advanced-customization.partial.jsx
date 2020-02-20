// BLOCK:body
const Cell = ({ style, ...restProps }) => {
  const { row, column } = restProps;
  return (
    <VirtualTable.Cell
      style={{ ...style, ...getCellStyle(row, column) }}
      {...restProps}
    />
  );
};
// BLOCK:body
