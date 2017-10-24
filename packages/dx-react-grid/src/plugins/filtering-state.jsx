import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { setColumnFilter } from '@devexpress/dx-grid-core';

export class FilteringState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      filters: props.defaultFilters || [],
    };

    this.setColumnFilter = (filters, { columnName, config }) => {
      const { onFiltersChange } = this.props;
      const nextFilters = setColumnFilter(filters, { columnName, config });
      this.setState({ filters: nextFilters });
      if (onFiltersChange) {
        onFiltersChange(nextFilters);
      }
    };
  }
  render() {
    const filters = this.props.filters || this.state.filters;

    return (
      <PluginContainer
        pluginName="FilteringState"
      >
        <Action
          name="setColumnFilter"
          action={({ columnName, config }) =>
            this.setColumnFilter(filters, { columnName, config })
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
  onFiltersChange: PropTypes.func,
};

FilteringState.defaultProps = {
  filters: undefined,
  defaultFilters: undefined,
  onFiltersChange: undefined,
};
