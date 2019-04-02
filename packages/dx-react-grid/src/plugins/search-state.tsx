import * as React from 'react';
import {
  Getter, Action, Plugin, createStateHelper, ActionFn, Getters,
} from '@devexpress/dx-react-core';
import { changeSearchValue, searchFilterExpression } from '@devexpress/dx-grid-core';
import { SearchStateProps, SearchStateState } from '../types';

class SearchStateBase extends React.PureComponent<SearchStateProps, SearchStateState> {
  static defaultProps = {
    defaultValue: '',
  };
  changeValue: ActionFn<string>;

  constructor(props) {
    super(props);

    this.state = {
      value: props.value || props.defaultValue,
    };
    const stateHelper = createStateHelper(this, {
      value: () => {
        const { onValueChange } = this.props;
        return onValueChange;
      },
    });

    this.changeValue = stateHelper.applyFieldReducer
      .bind(stateHelper, 'value', changeSearchValue);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      value = prevState.value,
    } = nextProps;

    return {
      value,
    };
  }

  render() {
    const { value } = this.state;
    const filterExpressionComputed = (
      { filterExpression, columns }: Getters,
    ) => searchFilterExpression(value, columns, filterExpression);

    return (
      <Plugin
        name="SearchState"
      >
        <Getter name="filterExpression" computed={filterExpressionComputed} />
        <Getter name="searchValue" value={value} />
        <Action name="changeSearchValue" action={this.changeValue} />
      </Plugin>
    );
  }
}

/** A plugin that manages the search state. */
export const SearchState: React.ComponentType<SearchStateProps> = SearchStateBase;
