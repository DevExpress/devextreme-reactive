import { DxGetter, DxAction, DxPlugin } from '@devexpress/dx-vue-core';
import {
  rowsWithAvailableToSelect,
  someSelected,
  allSelected,
  unwrapSelectedRows,
} from '@devexpress/dx-grid-core';

const rowsWithAvailableToSelectComputed = (
  { rows, getRowId, isGroupRow },
) => rowsWithAvailableToSelect(rows, getRowId, isGroupRow);
const allSelectedComputed = ({ rows, selection }) => allSelected(rows, selection);
const someSelectedComputed = ({ rows, selection }) => someSelected(rows, selection);
const selectAllAvailableComputed = ({ rows: { availableToSelect } }) => !!availableToSelect.length;
const toggleSelectAll = (state, { rows: { availableToSelect } }, { toggleSelection }) => {
  toggleSelection({ rowIds: availableToSelect, state });
};
const unwrapRowsComputed = ({ rows }) => unwrapSelectedRows(rows);

const pluginDependencies = [
  { name: 'DxSelectionState' },
];

export const DxIntegratedSelection = {
  name: 'DxIntegratedSelection',
  render() {
    return (
      <DxPlugin
        name="DxIntegratedSelection"
        dependencies={pluginDependencies}
      >
        <DxGetter name="rows" computed={rowsWithAvailableToSelectComputed} />
        <DxGetter name="allSelected" computed={allSelectedComputed} />
        <DxGetter name="someSelected" computed={someSelectedComputed} />
        <DxGetter name="selectAllAvailable" computed={selectAllAvailableComputed} />
        <DxAction name="toggleSelectAll" action={toggleSelectAll} />
        <DxGetter name="rows" computed={unwrapRowsComputed} />
      </DxPlugin>
    );
  },
};
