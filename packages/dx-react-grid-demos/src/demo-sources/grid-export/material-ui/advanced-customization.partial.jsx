// BLOCK:imports
import { makeStyles } from '@material-ui/core/styles';
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
