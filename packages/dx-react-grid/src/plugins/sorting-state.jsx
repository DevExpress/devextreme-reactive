import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Action, Plugin } from '@devexpress/dx-react-core';
import { changeColumnSorting, getColumnExtensionValueGetter } from '@devexpress/dx-grid-core';

import { createStateHelper } from '../utils/state-helper';

const columnExtensionValueGetter = (columnExtensions, defaultValue) =>
  getColumnExtensionValueGetter(columnExtensions, 'sortingEnabled', defaultValue);


const calculatePersistentSorting = (initialSorting, columnExtensions) => {
  if (columnExtensions) {
    return columnExtensions.reduce((acc, ext) => {
      if (ext.sortingEnabled === false) {
        if (initialSorting.findIndex(sortItem => sortItem.columnName === ext.columnName) > -1) {
          acc.push(ext.columnName);
        }
      }
      return acc;
    }, []);
  }
  return [];
};

export class SortingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sorting: props.defaultSorting,
    };

    const persistentSorting =
      calculatePersistentSorting(this.state.sorting, props.columnExtensions);

    const stateHelper = createStateHelper(this);

    this.changeColumnSorting = stateHelper.applyReducer
      .bind(stateHelper, (prevState, payload) => {
        let { keepOther } = payload;
        if (persistentSorting.length) {
          if (keepOther) {
            keepOther = Array.isArray(keepOther)
              ? [...new Set([...keepOther, ...persistentSorting])]
              : [...new Set([
                ...prevState.sorting.map(item => item.columnName),
                ...persistentSorting,
              ])];
          } else {
            keepOther = persistentSorting;
          }
        }
        return changeColumnSorting(prevState, { ...payload, keepOther });
      });
  }
  getState() {
    const {
      sorting = this.state.sorting,
    } = this.props;
    return {
      ...this.state,
      sorting,
    };
  }
  notifyStateChange(nextState, state) {
    const { sorting } = nextState;
    const { onSortingChange } = this.props;
    if (onSortingChange && sorting !== state.sorting) {
      onSortingChange(sorting);
    }
  }
  render() {
    const { sorting } = this.getState();
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
