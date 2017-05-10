import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { setColumnFilter } from '@devexpress/dx-datagrid-core';

export class FilteringState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      filters: props.defaultFilters || [],
    };

    this._setColumnFilter = (filters, { columnName, config }) => {
      const { filtersChange } = this.props;
      const nextFilters = setColumnFilter(filters, { columnName, config });
      this.setState({ filters: nextFilters });
      if (filtersChange) {
        filtersChange(nextFilters);
      }
    };
  }
  render() {
    const filters = this.props.filters || this.state.filters;

    return (
      <PluginContainer>
        <Action
          name="setColumnFilter"
          action={({ columnName, config }) =>
            this._setColumnFilter(filters, { columnName, config })
          }
        />

        <Getter name="filters" value={filters} />
      </PluginContainer>
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
