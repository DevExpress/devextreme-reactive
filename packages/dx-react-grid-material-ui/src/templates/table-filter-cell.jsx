import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from 'material-ui/Input';
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  cell: {
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    '&:first-child': {
      paddingLeft: theme.spacing.unit * 3,
    },
  },
  input: {
    width: '100%',
  },
});

const TableFilterCellBase = ({
  style, filter, getMessage, onFilter,
  classes, children, className,
  tableRow, tableColumn, column,
  ...restProps
}) => (
  <TableCell
    className={classNames(classes.cell, className)}
    style={style}
    {...restProps}
  >
    {children || (
      <Input
        className={classes.input}
        value={filter ? filter.value : ''}
        placeholder={getMessage('filterPlaceholder')}
        onChange={e => onFilter(e.target.value ? { value: e.target.value } : null)}
      />
    )}
  </TableCell>
);

TableFilterCellBase.propTypes = {
  style: PropTypes.object,
  filter: PropTypes.object,
  onFilter: PropTypes.func,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  column: PropTypes.object,
};

TableFilterCellBase.defaultProps = {
  style: null,
  filter: null,
  onFilter: () => {},
  children: undefined,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  column: undefined,
};

export const TableFilterCell = withStyles(styles, { name: 'TableFilterCell' })(TableFilterCellBase);
