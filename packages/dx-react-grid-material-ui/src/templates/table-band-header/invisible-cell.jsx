import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

const PREFIX = 'InvisibleCell';
export const classes = {
  emptyCell: `${PREFIX}-emptyCell`,
};
const StyledTableCell = styled(TableCell)(() => ({
  [`&.${classes.emptyCell}`]: {
    display: 'none',
  },
}));

export const InvisibleCell = () => (
  <StyledTableCell className={classes.emptyCell} />
);
