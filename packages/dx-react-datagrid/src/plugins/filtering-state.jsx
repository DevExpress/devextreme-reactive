import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action } from '@devexpress/dx-react-core';
import { setColumnFilter } from '@devexpress/dx-datagrid-core';

export class FilteringState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      filters: props.defaultFilters || [],
    };

    this._setColumnFilter = (filters, { columnName, value }) => {
      const { filtersChange } = this.props;
      const nextFilters = setColumnFilter(filters, { columnName, value });
      this.setState({ filters: nextFilters });
      if (filtersChange) {
        filtersChange(nextFilters);
      }
    };
  }
  render() {
    const filters = this.props.filters || this.state.filters;

    return (
      <div>
        <Action
          name="setColumnFilter"
          action={({ columnName, value }) => this._setColumnFilter(filters, { columnName, value })}
        />

        <Getter name="filters" value={filters} />
      </div>
    );
  }
}

FilteringState.propTypes = {
  filters: PropTypes.array,
  defaultFilters: PropTypes.array,
  filtersChange: PropTypes.func,
};

FilteringState.defaultProps = {
  filters: undefined,
  defaultFilters: undefined,
  filtersChange: undefined,
};
