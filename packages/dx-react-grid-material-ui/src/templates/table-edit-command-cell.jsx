import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  button: {
    padding: theme.spacing.unit,
    minWidth: 40,
  },
  headingCell: {
    whiteSpace: 'nowrap',
    textAlign: 'center',
    padding: `0 ${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 3}px`,
  },
  cell: {
    whiteSpace: 'nowrap',
    textAlign: 'center',
    padding: `0 ${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 3}px`,
  },
  alignWithRowSpan: {
    verticalAlign: 'bottom',
    paddingBottom: theme.spacing.unit * 1.25,
  },
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
  style,
  classes,
  className,
  tableRow, tableColumn,
  rowSpan,
  ...restProps
}) => (
  <TableCell
    className={classNames({
      [classes.headingCell]: true,
      [classes.alignWithRowSpan]: rowSpan > 1,
    }, className)}
    rowSpan={rowSpan}
    {...restProps}
  >
    {children}
  </TableCell>
);

EditCommandHeadingCellBase.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  rowSpan: PropTypes.number,
};

EditCommandHeadingCellBase.defaultProps = {
  children: undefined,
  style: null,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  rowSpan: undefined,
};

export const EditCommandHeadingCell = withEditColumnStyles(EditCommandHeadingCellBase);

const EditCommandCellBase = ({
  tableRow, tableColumn, row, children,
  style, classes, className,
  ...restProps
}) => (
  <TableCell
    className={classNames(classes.cell, className)}
    style={style}
    {...restProps}
  >
    {children}
  </TableCell>
);

EditCommandCellBase.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  row: PropTypes.object,
};

EditCommandCellBase.defaultProps = {
  children: undefined,
  style: null,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  row: undefined,
};

export const EditCommandCell = withEditColumnStyles(EditCommandCellBase);
