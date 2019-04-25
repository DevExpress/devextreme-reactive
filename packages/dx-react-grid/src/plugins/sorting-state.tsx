import * as React from 'react';
import {
  Getter, Action, Plugin, createStateHelper, ActionFn,
} from '@devexpress/dx-react-core';
import {
  changeColumnSorting,
  getColumnExtensionValueGetter,
  getPersistentSortedColumns,
  calculateKeepOther,
  ChangeSortingPayload,
} from '@devexpress/dx-grid-core';
import { SortingStateProps, SortingStateState } from '../types';

const columnExtensionValueGetter = (
  columnExtensions, defaultValue,
) => getColumnExtensionValueGetter(columnExtensions, 'sortingEnabled', defaultValue);

class SortingStateBase extends React.PureComponent<SortingStateProps, SortingStateState> {
  static defaultProps = {
    defaultSorting: [],
    columnSortingEnabled: true,
  };
  changeColumnSorting: ActionFn<ChangeSortingPayload>;

  constructor(props) {
    super(props);

    this.state = {
      sorting: props.sorting || props.defaultSorting,
    };

    const stateHelper = createStateHelper(
      this,
      {
        sorting: () => {
          const { onSortingChange } = this.props;
          return onSortingChange;
        },
      },
    );

    this.changeColumnSorting = stateHelper.applyReducer
      .bind(stateHelper, (prevState, payload) => {
        const { sorting = prevState.sorting } = this.props;
        const persistentSortedColumns = getPersistentSortedColumns(sorting, props.columnExtensions);
        const keepOther = calculateKeepOther(
          prevState.sorting, payload.keepOther, persistentSortedColumns,
        );
        return changeColumnSorting(prevState, { ...payload, keepOther });
      });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      sorting = prevState.sorting,
    } = nextProps;

    return {
      sorting,
    };
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

// tslint:disable-next-line: max-line-length
/** A plugin that manages the sorting state. It controls the list of columns that participate in sorting. */
export const SortingState: React.ComponentType<SortingStateProps> = SortingStateBase;
