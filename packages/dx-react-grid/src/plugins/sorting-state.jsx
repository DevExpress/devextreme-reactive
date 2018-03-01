import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, Plugin } from '@devexpress/dx-react-core';
import { changeColumnSorting } from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

export class SortingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sorting: props.sorting || props.defaultSorting,
    };

    const stateHelper = createStateHelper(
      this,
      {
        sorting: () => this.props.onSortingChange,
      },
    );

    this.changeColumnSorting = stateHelper.applyReducer
      .bind(stateHelper, changeColumnSorting);
  }
  componentWillReceiveProps(nextProps) {
    const {
      sorting,
    } = nextProps;
    this.setState({
      ...sorting !== undefined ? { sorting } : null,
    });
  }
  render() {
    const { sorting } = this.state;

    return (
      <Plugin
        name="SortingState"
      >
        <Getter name="sorting" value={sorting} />
        <Action name="changeColumnSorting" action={this.changeColumnSorting} />
      </Plugin>
    );
  }
}

SortingState.propTypes = {
  sorting: PropTypes.array,
  defaultSorting: PropTypes.array,
  onSortingChange: PropTypes.func,
};

SortingState.defaultProps = {
  sorting: undefined,
  defaultSorting: [],
  onSortingChange: undefined,
};
