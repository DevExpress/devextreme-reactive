import * as React from 'react';
import { Getter, Action, Plugin, Getters, Actions } from '@devexpress/dx-react-core';
import {
  rowsWithAvailableToSelect,
  someSelected,
  allSelected,
  unwrapSelectedRows,
} from '@devexpress/dx-grid-core';
import { IntegratedSelectionProps } from '../types';

const rowsWithAvailableToSelectComputed = (
  { rows, getRowId, isGroupRow }: Getters,
) => rowsWithAvailableToSelect(rows, getRowId, isGroupRow);
const allSelectedComputed = ({ rows, selection }: Getters) => allSelected(rows, selection);
const someSelectedComputed = ({ rows, selection }: Getters) => someSelected(rows, selection);
const selectAllAvailableComputed = (
  { rows: { availableToSelect } }: Getters,
) => !!availableToSelect.length;

const toggleSelectAll = (
  state, { rows: { availableToSelect } }: Getters, { toggleSelection }: Actions,
) => {
  toggleSelection({ state, rowIds: availableToSelect });
};
const unwrapRowsComputed = ({ rows }: Getters) => unwrapSelectedRows(rows);

const pluginDependencies = [
  { name: 'SelectionState' },
];

// eslint-disable-next-line react/prefer-stateless-function
class IntegratedSelectionBase extends React.PureComponent<IntegratedSelectionProps> {
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
  }
}

/* tslint:disable: max-line-length */
/** A plugin that performs built-in selection. */
export const IntegratedSelection: React.ComponentType<IntegratedSelectionProps> = IntegratedSelectionBase;
/* tslint:enable: max-line-length */
