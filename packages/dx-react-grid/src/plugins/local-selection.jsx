import React from 'react';
import PropTypes from 'prop-types';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import {
  selectAllAvaliable,
  setRowsSelection,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'SelectionState' },
];

const selectAllAvailable = ({ rows, getRowId, isGroupRow }) =>
  selectAllAvaliable(rows, getRowId, isGroupRow);

const toggleSelectAll = ({ condition, selection, rowIds, selected }) => {
  setRowsSelection(selection, { rowIds, selected })

  // if (condition) {
  //   selectionAll();
  // } else {
  //   unSelectionAll();
  // }
};

export class LocalSelection extends React.PureComponent {
  render() {

    return (
      <PluginContainer
        pluginName="LocalSelection"
        dependencies={pluginDependencies}
      >
        <Action
          name="toggleSelectAll"
          action={({ rows, getRowId, isGroupRow }) => {
            this.toggleSelectAll();
          }}
        />

        <Getter name="allSelected" computed={ все заселекчены && true } />
        <Getter name="selectAllAvailable" computed={selectAllAvailable} />
      </PluginContainer>
    );
  }
}
