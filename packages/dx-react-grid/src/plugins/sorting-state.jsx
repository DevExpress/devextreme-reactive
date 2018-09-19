import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Getter, Action, Plugin, createStateHelper,
} from '@devexpress/dx-react-core';
import {
  changeColumnSorting,
  getColumnExtensionValueGetter,
  getPersistentSortedColumns,
  calculateKeepOther,
} from '@devexpress/dx-grid-core';

const columnExtensionValueGetter = (columnExtensions, defaultValue) => getColumnExtensionValueGetter(columnExtensions, 'sortingEnabled', defaultValue);

export class SortingState extends React.PureComponent {
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
