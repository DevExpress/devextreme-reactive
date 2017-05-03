import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { setColumnSorting } from '@devexpress/dx-datagrid-core';

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
      <PluginContainer>
        <Action
          name="setColumnSorting"
          action={({ columnName, direction, keepOther }) => {
            this._setColumnSorting(sortings, { columnName, direction, keepOther });
          }}
        />

        <Getter name="sortings" value={sortings} />
      </PluginContainer>
    );
  }
}

SortingState.propTypes = {
  sortings: PropTypes.array,
  defaultSortings: PropTypes.array,
  sortingsChange: PropTypes.func,
};

SortingState.defaultProps = {
  sortings: undefined,
  defaultSortings: undefined,
  sortingsChange: undefined,
};
