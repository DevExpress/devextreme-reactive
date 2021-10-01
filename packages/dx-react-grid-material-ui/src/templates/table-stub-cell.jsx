import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from './utils';

const styles = theme => ({
  cell: {
    padding: 0,
  },
  footer: {
    borderBottom: getBorder(theme),
  },
});

const TableStubCellBase = ({
  classes,
  className,
  tableRow,
  tableColumn,
  refObject,
  ...restProps
}) => (
  <TableCell
    className={classNames({
      [classes.cell]: true,
    }, className)}
    classes={{ footer: classes.footer }}
    ref={refObject}
    {...restProps}
  />
);

TableStubCellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  refObject: PropTypes.object,
};

TableStubCellBase.defaultProps = {
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  refObject: undefined,
};

export const TableStubCell = withStyles(styles, { name: 'TableStubCell' })(TableStubCellBase);
