import * as React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import TableMUI from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { getWidthInPixels } from '../../utils';
import {
  CELL_WIDTH, SMALL_CELL_WIDTH,
  XS_CELL_WIDTH, SMALL_LAYOUT_MEDIA_QUERY, LAYOUT_MEDIA_QUERY,
} from '../../constants';

const PREFIX = 'Table';

const classes = {
  table: `${PREFIX}-table`,
};

const StyledTableMUI = styled(TableMUI, { shouldForwardProp: prop => prop !== 'cellsNumber' })(({ cellsNumber }) => ({
  [`&.${classes.table}`]: {
    tableLayout: 'fixed',
    minWidth: getWidthInPixels(cellsNumber, CELL_WIDTH),
    width: '100%',
    [`${LAYOUT_MEDIA_QUERY}`]: {
      minWidth: getWidthInPixels(cellsNumber, SMALL_CELL_WIDTH),
    },
    [`${SMALL_LAYOUT_MEDIA_QUERY}`]: {
      minWidth: getWidthInPixels(cellsNumber, XS_CELL_WIDTH),
    },
  },
}));

/* This component is a workaround to the bug when appointments flicker after being drag-dropped.
  It is used to define the minimum width of a parent layout depending on the number of cells.
  It's impossible to do it in the layout because appointments begin to flicker when using
  functional component instead of PureComponent (and to define the minimum width it is necessary
  to use material-ui's makeStyles).
*/
export const Table = React.forwardRef(({
  className,
  cellsNumber,
  children,
  ...restProps
}, ref) => (
  <StyledTableMUI
    cellsNumber={cellsNumber}
    ref={ref}
    className={classNames(classes.table, className)}
    {...restProps}
  >
    <TableBody>
      {children}
    </TableBody>
  </StyledTableMUI>
));

Table.propTypes = {
  cellsNumber: PropTypes.number.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Table.defaultProps = {
  className: undefined,
};
