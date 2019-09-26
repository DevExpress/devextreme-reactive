// BLOCK:body
const BandCell = ({
  children, tableRow, tableColumn, column, ...restProps
}) => {
  let icon = 0;
  if (column.title === 'Population') icon = 'person';
  if (column.title === 'Nominal GDP') icon = 'bar-chart';
  if (column.title === 'By Sector') icon = 'globe';
  return (
    <TableBandHeader.Cell
      {...restProps}
      column={column}
      className="text-secondary"
    >
      {children}
      <span
        className={`ml-2 oi oi-${icon}`}
      />
    </TableBandHeader.Cell>
  );
};

const HeaderCell = ({ className, ...restProps }) => (
  <TableHeaderRow.Cell
    {...restProps}
    className={`text-info ${className}`}
  />
);
// BLOCK:body
