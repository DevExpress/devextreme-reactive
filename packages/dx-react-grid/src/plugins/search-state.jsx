import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Action, Plugin } from '@devexpress/dx-react-core';
import { changeSearchValue, pushSearchFilterExpr } from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

export class SearchState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: props.defaultSearchValue,
    };
    const stateHelper = createStateHelper(this);

    this.changeSearchValue = stateHelper.applyFieldReducer
      .bind(stateHelper, 'searchValue', changeSearchValue);
  }
  getState() {
    const {
      searchValue = this.state.searchValue,
    } = this.props;
    return {
      ...this.state,
      searchValue,
    };
  }
  notifyStateChange(nextState, state) {
    const { searchValue } = nextState;
    const { onSearchValueChange } = this.props;
    if (onSearchValueChange && searchValue !== state.searchValue) {
      onSearchValueChange(searchValue);
    }
  }
  render() {
    const { searchValue } = this.getState();

    return (
      <Plugin
        name="SearchState"
      >
        <Getter name="filterExpression" computed={pushSearchFilterExpr(searchValue)} />
        <Getter name="searchValue" value={searchValue} />
        <Action name="changeSearchValue" action={this.changeSearchValue} />
      </Plugin>
    );
  }
}

SearchState.propTypes = {
  searchValue: PropTypes.string,
  defaultSearchValue: PropTypes.string,
  onSearchValueChange: PropTypes.func,
};

SearchState.defaultProps = {
  searchValue: undefined,
  defaultSearchValue: '',
  onSearchValueChange: undefined,
};
