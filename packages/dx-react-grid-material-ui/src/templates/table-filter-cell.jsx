import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from 'material-ui/Input';
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import { DropDown } from './filter-row/drop-down';

const styles = ({ spacing }) => ({
  cell: {
    paddingRight: spacing.unit,
    paddingLeft: spacing.unit,
    '&:first-child': {
      paddingLeft: spacing.unit * 3,
    },
  },
  input: {
    width: `calc(100% - ${spacing.unit * 6}px)`,
  },
});

class TableFilterCellBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      filterOperation: (props.filter && props.filter.operation) || props.availableFilters[0],
    };

    this.handleFilterOperationChange = (value) => {
      this.setState({ filterOperation: value });
      const { filter, onFilter } = this.props;
      if (filter && filter.value !== undefined && filter.value.length) {
        onFilter({ value: filter.value, operation: value });
      }
    };
    this.handleFilterValueChange = (event) => {
      const { onFilter } = this.props;
      const { filterOperation } = this.state;
      onFilter(event.target.value
        ? { value: event.target.value, operation: filterOperation }
        : null);
    };
  }
  render() {
    const {
      style, filter, getMessage, onFilter,
      classes, children, className,
      tableRow, tableColumn, column, filteringEnabled,
      availableFilters, iconComponent,
      ...restProps
    } = this.props;
    const { filterOperation } = this.state;

    return (
      <TableCell
        className={classNames(classes.cell, className)}
        style={style}
        {...restProps}
      >
        <DropDown
          iconComponent={iconComponent}
          value={filterOperation}
          availableValues={availableFilters}
          onChange={this.handleFilterOperationChange}
          getMessage={getMessage}
        />
        {children || (
          <Input
            className={classes.input}
            value={filter ? filter.value : ''}
            placeholder={getMessage('filterPlaceholder')}
            disabled={!filteringEnabled}
            onChange={this.handleFilterValueChange}
          />
        )}
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
  iconComponent: PropTypes.func.isRequired,
  availableFilters: PropTypes.arrayOf(PropTypes.string),
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
  availableFilters: [],
};

export const TableFilterCell = withStyles(styles, { name: 'TableFilterCell' })(TableFilterCellBase);
