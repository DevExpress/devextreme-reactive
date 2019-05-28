// BLOCK:body
const BandCell = ({
  children, tableRow, tableColumn, column, ...restProps
}) => {
  let icon = 0;
  if (column.title === 'Population') icon = 'user';
  if (column.title === 'Nominal GDP') icon = 'stats';
  if (column.title === 'By Sector') icon = 'globe';
  return (
    <TableBandHeader.Cell
      {...restProps}
      column={column}
    >
      {children}
      <span
        className={`glyphicon glyphicon-${icon}`}
        style={{ marginLeft: '10px' }}
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
