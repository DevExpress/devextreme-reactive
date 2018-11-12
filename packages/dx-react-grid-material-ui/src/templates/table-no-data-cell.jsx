import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  cell: {
    padding: `${theme.spacing.unit * 6}px 0`,
  },
  text: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    marginTop: `-${theme.spacing.unit}px`,
  },
});

export const TableNoDataCellBase = ({
  style,
  colSpan,
  getMessage,
  classes,
  className,
  tableRow,
  tableColumn,
  ...restProps
}) => (
  <TableCell
    style={style}
    className={classNames(classes.cell, className)}
    colSpan={colSpan}
    {...restProps}
  >
    <big className={classes.text}>
      {getMessage('noData')}
    </big>
  </TableCell>
);

TableNoDataCellBase.propTypes = {
  style: PropTypes.object,
  colSpan: PropTypes.number,
  getMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableNoDataCellBase.defaultProps = {
  style: null,
  colSpan: 1,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};

export const TableNoDataCell = withStyles(styles, { name: 'TableNoDataCell' })(TableNoDataCellBase);
