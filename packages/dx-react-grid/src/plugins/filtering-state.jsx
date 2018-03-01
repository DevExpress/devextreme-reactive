import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, Plugin } from '@devexpress/dx-react-core';
import { changeColumnFilter } from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

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

    return (
      <Plugin
        name="FilteringState"
      >
        <Getter name="filters" value={filters} />
        <Action name="changeColumnFilter" action={this.changeColumnFilter} />
      </Plugin>
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
  defaultFilters: [],
  onFiltersChange: undefined,
};
