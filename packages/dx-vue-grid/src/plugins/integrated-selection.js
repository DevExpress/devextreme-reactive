import { Getter, Action, Plugin } from '@devexpress/dx-vue-core';
import {
  rowsWithAvailableToSelect,
  someSelected,
  allSelected,
  unwrapSelectedRows,
} from '@devexpress/dx-grid-core';

const rowsWithAvailableToSelectComputed = ({ rows, getRowId, isGroupRow }) =>
  rowsWithAvailableToSelect(rows, getRowId, isGroupRow);
const allSelectedComputed = ({ rows, selection }) =>
  allSelected(rows, selection);
const someSelectedComputed = ({ rows, selection }) =>
  someSelected(rows, selection);
const selectAllAvailableComputed = ({ rows: { availableToSelect } }) =>
  !!availableToSelect.length;
const toggleSelectAll = (state, { rows: { availableToSelect } }, { toggleSelection }) => {
  toggleSelection({ rowIds: availableToSelect, state });
};
const unwrapRowsComputed = ({ rows }) => unwrapSelectedRows(rows);

const pluginDependencies = [
  { name: 'SelectionState' },
];

export const IntegratedSelection = {
  name: 'IntegratedSelection',
  render() {
    return (
      <Plugin
        name="IntegratedSelection"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={rowsWithAvailableToSelectComputed} />
        <Getter name="allSelected" computed={allSelectedComputed} />
        <Getter name="someSelected" computed={someSelectedComputed} />
        <Getter name="selectAllAvailable" computed={selectAllAvailableComputed} />
        <Action name="toggleSelectAll" action={toggleSelectAll} />
        <Getter name="rows" computed={unwrapRowsComputed} />
      </Plugin>
    );
  },
};
