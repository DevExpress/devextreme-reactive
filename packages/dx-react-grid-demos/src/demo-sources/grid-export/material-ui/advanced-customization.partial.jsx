// BLOCK:imports
import makeStyles from '@mui/styles/makeStyles';
// BLOCK:imports

// BLOCK:body
const useCellStyles = makeStyles({
  cell: ({ row, column }) => getCellStyle(row, column),
});

const Cell = (props) => {
  const classes = useCellStyles(props);
  return (
    <VirtualTable.Cell {...props} className={classes.cell} />
  );
};
// BLOCK:body
