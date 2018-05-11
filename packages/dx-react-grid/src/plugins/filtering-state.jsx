import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Action, Plugin, createStateHelper } from '@devexpress/dx-react-core';
import { changeColumnFilter, getColumnExtensionValueGetter, pushFilterExpression } from '@devexpress/dx-grid-core';

const columnExtensionValueGetter = (columnExtensions, defaultValue) =>
  getColumnExtensionValueGetter(columnExtensions, 'filteringEnabled', defaultValue);

export class FilteringState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      filters: props.filters || props.defaultFilters,
    };
    const stateHelper = createStateHelper(
      this,
      {
        filters: () => this.props.onFiltersChange,
      },
    );

    this.changeColumnFilter = stateHelper.applyFieldReducer
      .bind(stateHelper, 'filters', changeColumnFilter);
  }
  componentWillReceiveProps(nextProps) {
    const {
      filters,
    } = nextProps;
    this.setState({
      ...filters !== undefined ? { filters } : null,
    });
  }
  render() {
    const { filters } = this.state;
    const { columnExtensions, columnFilteringEnabled } = this.props;


    return (
      <Plugin
        name="FilteringState"
      >
        <Getter name="filters" value={filters} />
        <Getter name="filterExpression" computed={pushFilterExpression(filters)} />
        <Getter
          name="isColumnFilteringEnabled"
          value={columnExtensionValueGetter(columnExtensions, columnFilteringEnabled)}
        />
        <Action name="changeColumnFilter" action={this.changeColumnFilter} />
      </Plugin>
    );
  }
}

FilteringState.propTypes = {
  filters: PropTypes.array,
  defaultFilters: PropTypes.array,
  onFiltersChange: PropTypes.func,
  columnExtensions: PropTypes.array,
  columnFilteringEnabled: PropTypes.bool,
};

FilteringState.defaultProps = {
  filters: undefined,
  defaultFilters: [],
  onFiltersChange: undefined,
  columnExtensions: undefined,
  columnFilteringEnabled: true,
};
