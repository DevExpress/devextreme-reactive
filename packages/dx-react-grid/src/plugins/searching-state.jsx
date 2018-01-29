import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { changeSearchValue } from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

export class SearchingState extends React.PureComponent {
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
      <PluginContainer
        pluginName="SearchingState"
      >
        <Getter name="searchValue" value={searchValue} />
        <Action name="changeSearchValue" action={this.changeSearchValue} />
      </PluginContainer>
    );
  }
}

SearchingState.propTypes = {
  searchValue: PropTypes.string,
  defaultSearchValue: PropTypes.string,
  onSearchValueChange: PropTypes.func,
};

SearchingState.defaultProps = {
  searchValue: undefined,
  defaultSearchValue: '',
  onSearchValueChange: undefined,
};
