import * as React from 'react';
import { TableCell, styled } from '@mui/material';

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
