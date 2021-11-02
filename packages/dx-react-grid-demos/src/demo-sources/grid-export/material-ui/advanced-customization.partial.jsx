// BLOCK:imports
import { styled } from '@mui/material/styles';
// BLOCK:imports

// BLOCK:body
const PREFIX = 'Demo';
const classes = {
  cell: `${PREFIX}-cell`,
};
const StyledVirtualTableCell = styled(VirtualTable.Cell)(({ row, column }) => ({
  [`&.${classes.cell}`]: getCellStyle(row, column),
}));

const Cell = (props) => (
  <StyledVirtualTableCell {...props} className={classes.cell} />
);
// BLOCK:body
