import React from 'react';
import { Getter, Action } from '@devexpress/dx-react-core';
import { sortedRows, setColumnSorting } from '@devexpress/dx-datagrid-core';

export class SortingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sortings: props.defaultSortings || [],
    };

    this._setColumnSorting = (sortings, { columnName, direction, keepOther }) => {
      const { sortingsChange } = this.props;
      const nextSortings = setColumnSorting(sortings, { columnName, direction, keepOther });
      this.setState({ sortings: nextSortings });
      if (sortingsChange) {
        sortingsChange(nextSortings);
      }
    };
  }
  render() {
    const sortings = this.props.sortings || this.state.sortings;

    return (
      <div>
        <Action
          name="setColumnSorting"
          action={({ columnName, direction, keepOther }) => {
            this._setColumnSorting(sortings, { columnName, direction, keepOther });
          }}
        />

        <Getter
          name="rows"
          pureComputed={sortedRows}
          connectArgs={getter => [
            getter('rows')(),
            sortings,
          ]}
        />

        <Getter name="sortings" value={sortings} />
      </div>
    );
  }
}

SortingState.propTypes = {
  sortings: React.PropTypes.array,
  defaultSortings: React.PropTypes.array,
  sortingsChange: React.PropTypes.func,
};

SortingState.defaultProps = {
  sortings: undefined,
  defaultSortings: undefined,
  sortingsChange: undefined,
};
