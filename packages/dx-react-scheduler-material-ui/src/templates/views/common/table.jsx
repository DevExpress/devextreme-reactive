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

export const Table = React.forwardRef(({
  className,
  width,
  children,
  ...restProps
}, ref) => {
  const classes = useStyles(width);

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
  width: PropTypes.number.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Table.defaultProps = {
  className: undefined,
};
