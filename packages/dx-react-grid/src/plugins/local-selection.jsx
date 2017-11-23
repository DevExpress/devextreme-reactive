import React from 'react';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { getAvailableToSelect } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'SelectionState' },
];

const allArray1inArray2 = (availableToSelect, selectionRows) => {
  let consist = true;
  availableToSelect.forEach((elem) => {
    if (!selectionRows.has(elem)) {
      consist = false;
      return false;
    }
    return true;
  });
  return consist;
};

const someArray1InArray2 = (selectionRows, availableToSelect) => {
  let consistSelectionInAvailable = false; // need when pager selection consist in available
  availableToSelect.forEach((elem) => {
    if (selectionRows.has(elem)) {
      consistSelectionInAvailable = true;
      return true;
    }
    return false;
  });
  return consistSelectionInAvailable;
};

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
      const allAvailableInSelection = () => allArray1inArray2(availableToSelect, selectionRows);
      return selection.length !== 0 && availableToSelect.length !== 0 && allAvailableInSelection();
    };
    const someSelectedComputed = ({ selection }) => {
      const selectionRows = new Set(selection);
      const allAvailableInSelection = () => allArray1inArray2(availableToSelect, selectionRows);
      const consistSelectionInAvailable = () =>
        someArray1InArray2(selectionRows, availableToSelect);
      return availableToSelect.length !== 0 && selection.length !== 0
        && consistSelectionInAvailable() && !allAvailableInSelection();
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
