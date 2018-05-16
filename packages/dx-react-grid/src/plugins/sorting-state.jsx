import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Action, Plugin, createStateHelper } from '@devexpress/dx-react-core';
import {
  changeColumnSorting,
  getColumnExtensionValueGetter,
  getPersistentSortedColumns,
  calculateKeepOther,
} from '@devexpress/dx-grid-core';

const columnExtensionValueGetter = (columnExtensions, defaultValue) =>
  getColumnExtensionValueGetter(columnExtensions, 'sortingEnabled', defaultValue);

export class SortingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sorting: props.sorting || props.defaultSorting,
    };

    const persistentSortedColumns =
      getPersistentSortedColumns(this.state.sorting, props.columnExtensions);

    const stateHelper = createStateHelper(
      this,
      {
        sorting: () => this.props.onSortingChange,
      },
    );

    this.changeColumnSorting = stateHelper.applyReducer
      .bind(stateHelper, (prevState, payload) => {
        const keepOther =
          calculateKeepOther(prevState.sorting, payload.keepOther, persistentSortedColumns);
        return changeColumnSorting(prevState, { ...payload, keepOther });
      });
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
    const { columnExtensions, columnSortingEnabled } = this.props;

    return (
      <Plugin
        name="SortingState"
      >
        <Getter name="sorting" value={sorting} />
        <Getter
          name="isColumnSortingEnabled"
          value={columnExtensionValueGetter(columnExtensions, columnSortingEnabled)}
        />
        <Action name="changeColumnSorting" action={this.changeColumnSorting} />
      </Plugin>
    );
  }
}

SortingState.propTypes = {
  sorting: PropTypes.array,
  defaultSorting: PropTypes.array,
  onSortingChange: PropTypes.func,
  columnExtensions: PropTypes.array,
  columnSortingEnabled: PropTypes.bool,
};

SortingState.defaultProps = {
  sorting: undefined,
  defaultSorting: [],
  onSortingChange: undefined,
  columnExtensions: undefined,
  columnSortingEnabled: true,
};
