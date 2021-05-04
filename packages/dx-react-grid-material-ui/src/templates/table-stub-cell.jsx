import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from './utils';
import { withKeyboardNavigation } from '../utils/with-keyboard-navigation';

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
  refComponent,
  setRefForKeyboardNavigation,
  ...restProps
}) => (
  <TableCell
    className={classNames(classes.cell, className)}
    classes={{ footer: classes.footer }}
    ref={refComponent}
    {...restProps}
  />
);

TableStubCellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableStubCellBase.defaultProps = {
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};

export const TableStubCell = withKeyboardNavigation()(withStyles(styles, { name: 'TableStubCell' })(TableStubCellBase));
