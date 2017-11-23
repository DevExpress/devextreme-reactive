import React from 'react';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { getAvailableToSelect } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'SelectionState' },
];

export class LocalSelection extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { availableToSelect: [] };

    this.toggleSelectAll = this.toggleSelectAll.bind(this);
    this.availableToSelect = this.availableToSelect.bind(this);
  }

  toggleSelectAll(select, { selection }, { toggleSelection }) {
    const { availableToSelect } = this.state;
    if (select === undefined) {
      toggleSelection({ rowIds: availableToSelect });
    } else if (select) {
      toggleSelection({ rowIds: availableToSelect, selected: true });
    } else {
      toggleSelection({ rowIds: selection, selected: false });
    }
  }
  availableToSelect({ rows, getRowId, isGroupRow }) {
    this.setState({ availableToSelect: getAvailableToSelect(rows, getRowId, isGroupRow) });
    return rows;
  }
  render() {
    const { availableToSelect } = this.state;

    const selectAllAvailableComputed = () =>
      !!availableToSelect.length;
    const allSelectedComputed = ({ selection }) => {
      const selectionRows = new Set(selection);
      let consist = true;
      availableToSelect.forEach((elem) => {
        if (!selectionRows.has(elem)) {
          consist = false;
          return false;
        }
        return true;
      });
      return consist && selection.length !== 0 && availableToSelect.length !== 0; // if all of available consist in selection selection.length === availableToSelect.length
    };
    const someSelectedComputed = ({ selection }) => {
      // const availableRows = new Set(availableToSelect);
      const selectionRows = new Set(selection);
      let consist = true;
      debugger;
      // availableToSelect.forEach((elem) => {
      //   if (selection.indexOf(elem) === -1) {
      //     consist = false;
      //     return false;
      //   }
      //   return true;
      // });
      // let consistInAvailable = false;
      // availableToSelect.forEach((elem) => {
      //   if (selection.indexOf(elem) !== -1) {
      //     consistInAvailable = true;
      //     return true;
      //   }
      //   return false;
      // });
      availableToSelect.forEach((elem) => {
        if (!selectionRows.has(elem)) {
          consist = false;
          return false;
        }
        return true;
      });
      let consistInAvailable = false;
      availableToSelect.forEach((elem) => {
        if (selectionRows.has(elem)) {
          consistInAvailable = true;
          return true;
        }
        return false;
      });
      return availableToSelect.length !== 0 && !consist && selection.length !== 0 && consistInAvailable; // selection.length !== availableToSelect.length
    };

    return (
      <PluginContainer
        pluginName="LocalSelection"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={this.availableToSelect} />
        <Getter name="allSelected" computed={allSelectedComputed} />
        <Getter name="someSelected" computed={someSelectedComputed} />
        <Getter name="selectAllAvailable" value={selectAllAvailableComputed()} />

        <Action name="toggleSelectAll" action={this.toggleSelectAll} />
      </PluginContainer>
    );
  }
}
