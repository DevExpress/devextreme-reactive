import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import { getBorder } from './utils';
import focusedStyle from '../utils/get-focused-style';

const styles = theme => ({
  cell: {
    padding: 0,
  },
  footer: {
    borderBottom: getBorder(theme),
  },
  focusedCell: focusedStyle,
});

const TableStubCellBase = ({
  classes,
  className,
  tableRow,
  tableColumn,
  refObject,
  updateRefForKeyboardNavigation,
  setFocusedElement,
  ...restProps
}) => (
  <TableCell
    className={classNames({
      [classes.cell]: true,
      [classes.focusedCell]: updateRefForKeyboardNavigation !== undefined,
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
  updateRefForKeyboardNavigation: PropTypes.func,
  setFocusedElement: PropTypes.func,
};

TableStubCellBase.defaultProps = {
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  refObject: undefined,
  updateRefForKeyboardNavigation: undefined,
  setFocusedElement: undefined,
};

export const TableStubCell = withKeyboardNavigation()(withStyles(styles, { name: 'TableStubCell' })(TableStubCellBase));
