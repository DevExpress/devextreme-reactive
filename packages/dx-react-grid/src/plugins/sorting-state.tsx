import * as React from 'react';
import {
  Getter, Action, Plugin, createStateHelper, ActionFn,
} from '@devexpress/dx-react-core';
import {
  changeColumnSorting,
  getColumnExtensionValueGetter,
  getPersistentSortedColumns,
  calculateKeepOther,
  Sorting,
  ChangeSortingPayload,
} from '@devexpress/dx-grid-core';

// tslint:disable-next-line: no-namespace
export namespace SortingState {
  /** Describes additional column properties that the plugin can handle. */
  export interface ColumnExtension {
    /** The name of a column to extend. */
    columnName: string;
    /** Specifies whether sorting is enabled for a column. */
    sortingEnabled: boolean;
  }
}

export interface SortingStateProps {
  /** Specifies the applied sorting. */
  sorting?: Array<Sorting>;
  /** Specifies initial sorting in the uncontrolled mode. */
  defaultSorting?: Array<Sorting>;
  /** Specifies whether sorting is enabled for all columns. */
  columnSortingEnabled?: boolean;
  /** Additional column properties that the plugin can handle. */
  columnExtensions?: Array<SortingState.ColumnExtension>;
  /** Handles sorting changes. */
  onSortingChange?: (sorting: Array<Sorting>) => void;
}
interface SortingStateState {
  sorting: boolean;
}

const columnExtensionValueGetter = (
  columnExtensions, defaultValue,
) => getColumnExtensionValueGetter(columnExtensions, 'sortingEnabled', defaultValue);

export class SortingState extends React.PureComponent<SortingStateProps, SortingStateState> {
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
