import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import {
  selectAllAvaliable,
  setRowsSelection,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'SelectionState' },
];

const selectAllAvailable = ({ rows, getRowId, isGroupRow }) =>
  selectAllAvaliable(rows, getRowId, isGroupRow);

const allSelected = ({ selection, availableToSelect }) =>
  selection.length === availableToSelect.length && selection.length !== 0;

export class LocalSelection extends React.PureComponent {
  render() {
    this.toggleSelectAll = ({
      select,
      selection,
      rowIds,
      selected,
    }) => {
      if (select === undefined) {
        setRowsSelection(selection, { rowIds, selected });
      } else if (select) {
        // choose all available rows
        setRowsSelection(selection, { rowIds: selectAllAvaliable, selected });
      } else {
        // choose no rows []
        setRowsSelection(selection, { rowId: [], selected });
      }
    };

    return (
      <PluginContainer
        pluginName="LocalSelection"
        dependencies={pluginDependencies}
      >
        <Action
          name="toggleSelectAll"
          action={({ rows, getRowId, isGroupRow }) => {
            this.toggleSelectAll({ rows, getRowId, isGroupRow });
          }}
        />

        <Getter name="allSelected" computed={allSelected} />
        <Getter name="selectAllAvailable" computed={selectAllAvailable} />
      </PluginContainer>
    );
  }
}
