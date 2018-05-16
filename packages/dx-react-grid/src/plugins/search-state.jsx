import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Action, Plugin, createStateHelper } from '@devexpress/dx-react-core';
import { changeSearchValue, pushSearchFilterExpression } from '@devexpress/dx-grid-core';

export class SearchState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value || props.defaultValue,
    };
    const stateHelper = createStateHelper(this, {
      value: () => this.props.onValueChange,
    });

    this.changeValue = stateHelper.applyFieldReducer
      .bind(stateHelper, 'value', changeSearchValue);
  }
  componentWillReceiveProps(nextProps) {
    const {
      value,
    } = nextProps;
    this.setState({
      ...value !== undefined ? { value } : null,
    });
  }
  render() {
    const { value } = this.state;

    return (
      <Plugin
        name="SearchState"
      >
        <Getter name="filterExpression" computed={pushSearchFilterExpression(value)} />
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
