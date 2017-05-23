import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { setColumnSorting } from '@devexpress/dx-grid-core';

export class SortingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sorting: props.defaultSorting || [],
    };

    this._setColumnSorting = (sorting, { columnName, direction, keepOther, cancel }) => {
      const { onSortingChange } = this.props;
      const nextSorting = setColumnSorting(sorting, { columnName, direction, keepOther, cancel });
      this.setState({ sorting: nextSorting });
      if (onSortingChange) {
        onSortingChange(nextSorting);
      }
    };
  }
  render() {
    const sorting = this.props.sorting || this.state.sorting;

    return (
      <PluginContainer>
        <Action
          name="setColumnSorting"
          action={({ columnName, direction, keepOther, cancel }) => {
            this._setColumnSorting(sorting, { columnName, direction, keepOther, cancel });
          }}
        />

        <Getter name="sorting" value={sorting} />
      </PluginContainer>
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
  defaultSorting: undefined,
  onSortingChange: undefined,
};
