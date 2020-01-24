import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';
import { getWidthInPixels } from '../../utils';
import {
  CELL_WIDTH, SMALL_CELL_WIDTH,
  XS_CELL_WIDTH, SMALL_LAYOUT_MEDIA_QUERY, LAYOUT_MEDIA_QUERY,
} from '../../constants';

const useStyles = makeStyles({
  table: {
    tableLayout: 'fixed',
    borderCollapse: 'separate',
    minWidth: cellsNumber => getWidthInPixels(cellsNumber, CELL_WIDTH),
    width: '100%',
    [`${LAYOUT_MEDIA_QUERY}`]: {
      minWidth: cellsNumber => getWidthInPixels(cellsNumber, SMALL_CELL_WIDTH),
    },
    [`${SMALL_LAYOUT_MEDIA_QUERY}`]: {
      minWidth: cellsNumber => getWidthInPixels(cellsNumber, XS_CELL_WIDTH),
    },
  },
});

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
}, ref) => {
  const classes = useStyles(cellsNumber);

  return (
    <TableMUI
      ref={ref}
      className={classNames(classes.table, className)}
      {...restProps}
    >
      <TableBody>
        {children}
      </TableBody>
    </TableMUI>
  );
});

Table.propTypes = {
  cellsNumber: PropTypes.number.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Table.defaultProps = {
  className: undefined,
};
