import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import {
  selectAllAvaliable,
  setRowsSelection,
  getAvailableToSelect,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'SelectionState' },
];

const selectAllAvailable = ({ selection, rows, getRowId, isGroupRow }) => {
  const availableToSelect = [...getAvailableToSelect(rows, getRowId, isGroupRow)];
  return !!availableToSelect.length;
};

const allSelected = ({ selection, rows, getRowId, isGroupRow }) => {
  const availableToSelect = [...getAvailableToSelect(rows, getRowId, isGroupRow)];
  return selection.length === availableToSelect.length && selection.length !== 0;
};

export class LocalSelection extends React.PureComponent {
  render() {
    this.toggleSelectAll = ({
      select,
      selection,
      rows,
      getRowId,
      isGroupRow,
      selected,
      toggleSelection,
    }) => {
      if (select === undefined) {
        toggleSelection({ rowIds: getAvailableToSelect(rows, getRowId, isGroupRow) });
        // newSelection = setRowsSelection(selection, { rowIds: getAvailableToSelect(rows, getRowId, isGroupRow), selected });
      } else if (select) {
        // choose all available rows
        toggleSelection({ rowIds: getAvailableToSelect(rows, getRowId, isGroupRow) });
        // newSelection = setRowsSelection(selection, { rowIds: getAvailableToSelect(rows, getRowId, isGroupRow), selected });
      } else {
        // choose no rows []
        toggleSelection({ rowIds: getAvailableToSelect(rows, getRowId, isGroupRow) });
        // newSelection = setRowsSelection(selection, { rowId: [], selected });
      }
    };

    return (
      <PluginContainer
        pluginName="LocalSelection"
        dependencies={pluginDependencies}
      >
        <Action
          name="toggleSelectAll"
          action={(props, { selection, rows, isGroupRow, getRowId }, { toggleSelection }) => {
            console.log('toggleSelectAll');
            this.toggleSelectAll({ select: true, selected: false, selection, rows, isGroupRow, getRowId, toggleSelection });
          }}
        />

        <Getter name="allSelected" computed={allSelected} />
        <Getter name="selectAllAvailable" computed={selectAllAvailable} />
      </PluginContainer>
    );
  }
}
