import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import focusedStyle from '../utils/get-focused-style';

const styles = theme => ({
  button: {
    padding: theme.spacing(1),
    minWidth: 40,
  },
  headingCell: {
    whiteSpace: 'nowrap',
    textAlign: 'center',
    padding: theme.spacing(0, 2, 0, 3),
  },
  cell: {
    whiteSpace: 'nowrap',
    textAlign: 'center',
    padding: theme.spacing(0, 2, 0, 3),
  },
  alignWithRowSpan: {
    verticalAlign: 'bottom',
    paddingBottom: theme.spacing(1.25),
  },
  focusedCell: focusedStyle,
});

const withEditColumnStyles = withStyles(styles, { name: 'EditColumn' });

const CommandButtonBase = ({
  onExecute,
  text,
  classes,
  className,
  ...restProps
}) => (
  <Button
    color="primary"
    className={classNames(classes.button, className)}
    onClick={(e) => {
      e.stopPropagation();
      onExecute();
    }}
    {...restProps}
  >
    {text}
  </Button>
);
CommandButtonBase.propTypes = {
  onExecute: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

CommandButtonBase.defaultProps = {
  className: undefined,
};

export const CommandButton = withEditColumnStyles(CommandButtonBase);

const EditCommandHeadingCellBase = ({
  children,
  classes,
  className,
  tableRow, tableColumn,
  rowSpan,
  refObject,
  updateRefForKeyboardNavigation,
  setFocusedElement,
  ...restProps
}) => (
  <TableCell
    className={classNames({
      [classes.headingCell]: true,
      [classes.alignWithRowSpan]: rowSpan > 1,
      [classes.focusedCell]: updateRefForKeyboardNavigation !== undefined,
    }, className)}
    rowSpan={rowSpan}
    ref={refObject}
    {...restProps}
  >
    {children}
  </TableCell>
);

EditCommandHeadingCellBase.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  rowSpan: PropTypes.number,
};

EditCommandHeadingCellBase.defaultProps = {
  children: undefined,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  rowSpan: undefined,
};

export const EditCommandHeadingCell = withKeyboardNavigation()(withEditColumnStyles(EditCommandHeadingCellBase));

const EditCommandCellBase = ({
  tableRow, tableColumn, row, children,
  classes, className, refObject,
  updateRefForKeyboardNavigation,
  setFocusedElement,
  ...restProps
}) => (
  <TableCell
    className={classNames({
      [classes.cell]: true, 
      [classes.focusedCell]: updateRefForKeyboardNavigation !== undefined,
    }, className)}
    ref={refObject}
    {...restProps}
  >
    {children}
  </TableCell>
);

EditCommandCellBase.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  row: PropTypes.any,
};

EditCommandCellBase.defaultProps = {
  children: undefined,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  row: undefined,
};

export const EditCommandCell = withKeyboardNavigation()(withEditColumnStyles(EditCommandCellBase));
