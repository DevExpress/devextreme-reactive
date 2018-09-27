import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Getter, Action, Plugin, createStateHelper,
} from '@devexpress/dx-react-core';
import { changeSearchValue, searchFilterExpression } from '@devexpress/dx-grid-core';

export class SearchState extends React.PureComponent {
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
      { filterExpression, columns },
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

SearchState.propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onValueChange: PropTypes.func,
};

SearchState.defaultProps = {
  value: undefined,
  defaultValue: '',
  onValueChange: undefined,
};
