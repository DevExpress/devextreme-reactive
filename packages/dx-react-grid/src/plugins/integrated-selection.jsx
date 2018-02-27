import React from 'react';
import { Getter, Action, Plugin } from '@devexpress/dx-react-core';
import {
  rowsWithAlailableToSelect,
  someSelected,
  allSelected,
  unwrapSelecetedRows,
} from '@devexpress/dx-grid-core';

const rowsWithAlailableToSelectComputed = ({ rows, getRowId, isGroupRow }) =>
  rowsWithAlailableToSelect(rows, getRowId, isGroupRow);
const allSelectedComputed = ({ rows, selection }) =>
  allSelected(rows, selection);
const someSelectedComputed = ({ rows, selection }) =>
  someSelected(rows, selection);
const selectAllAvailableComputed = ({ rows: { availableToSelect } }) =>
  !!availableToSelect.length;
const toggleSelectAll = (state, { rows: { availableToSelect } }, { toggleSelection }) => {
  toggleSelection({ rowIds: availableToSelect, state });
};
const unwrapRowsComputed = ({ rows }) => unwrapSelecetedRows(rows);

const pluginDependencies = [
  { name: 'SelectionState' },
];

// eslint-disable-next-line react/prefer-stateless-function
export class IntegratedSelection extends React.PureComponent {
  render() {
    return (
      <Plugin
        name="IntegratedSelection"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={rowsWithAlailableToSelectComputed} />
        <Getter name="allSelected" computed={allSelectedComputed} />
        <Getter name="someSelected" computed={someSelectedComputed} />
        <Getter name="selectAllAvailable" computed={selectAllAvailableComputed} />
        <Action name="toggleSelectAll" action={toggleSelectAll} />
        <Getter name="rows" computed={unwrapRowsComputed} />
      </Plugin>
    );
  }
}
