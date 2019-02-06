import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  cell: {
    padding: `${theme.spacing.unit * 6}px 0`,
  },
  textContainer: {
    display: 'inline-block',
    position: 'sticky',
    left: '50%',
  },
  text: {
    transform: 'translateX(-50%)',
    display: 'inline-block',
  }
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
    <div className={classes.textContainer}>
      <big className={classes.text}>
        {getMessage('noData')}
      </big>
    </div>
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
