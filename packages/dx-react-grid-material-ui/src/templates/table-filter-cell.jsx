import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';

const styles = ({ spacing }) => ({
  cell: {
    paddingRight: spacing.unit,
    paddingLeft: spacing.unit,
    '&:first-child': {
      paddingLeft: spacing.unit * 3,
    },
  },
});

class TableFilterCellBase extends React.PureComponent {
  render() {
    const {
      style, filter, getMessage, onFilter,
      classes, children, className,
      tableRow, tableColumn, column, filteringEnabled,
      ...restProps
    } = this.props;

    return (
      <TableCell
        className={classNames(classes.cell, className)}
        style={style}
        {...restProps}
      >
        {children}
      </TableCell>
    );
  }
}

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
  filteringEnabled: PropTypes.bool,
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
  filteringEnabled: true,
};

export const TableFilterCell = withStyles(styles, { name: 'TableFilterCell' })(TableFilterCellBase);
