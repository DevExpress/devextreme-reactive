import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from 'material-ui/Input';
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import { StaticFilterCellContent } from './static-filter-cell-content';

const styles = (theme) => {
  const { spacing } = theme;
  return {
    cell: {
      verticalAlign: 'middle',
      paddingRight: spacing.unit,
      paddingLeft: spacing.unit,
      '&:first-child': {
        paddingLeft: spacing.unit * 3,
      },
    },
    input: {
      width: '100%',
    },
  };
};

const TableFilterCellBase = ({
  style, filter, getMessage, onFilter,
  classes, children, className,
  tableRow, tableColumn, column, columnFilteringEnabled,
  ...restProps
}) => (
  <TableCell
    className={classNames(classes.cell, className)}
    style={style}
    {...restProps}
  >
    {columnFilteringEnabled ? (children || (
      <Input
        className={classes.input}
        value={filter ? filter.value : ''}
        placeholder={getMessage('filterPlaceholder')}
        onChange={e => onFilter(e.target.value ? { value: e.target.value } : null)}
      />
    )) : <StaticFilterCellContent>{children}</StaticFilterCellContent>}
  </TableCell>
);

TableFilterCellBase.propTypes = {
  style: PropTypes.object,
  filter: PropTypes.object,
  onFilter: PropTypes.func,
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  column: PropTypes.object,
  columnFilteringEnabled: PropTypes.bool,
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
  columnFilteringEnabled: true,
};

export const TableFilterCell = withStyles(styles, { name: 'TableFilterCell' })(TableFilterCellBase);
