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

const selectAllAvailable = ({ rows, getRowId, isGroupRow }) => {
  const availableToSelect = getAvailableToSelect(rows, getRowId, isGroupRow);
  debugger // selectAllAvailable
  return !!availableToSelect.length;
};

const allSelected = ({ selection, rows, getRowId, isGroupRow }) => {
  const availableToSelect = getAvailableToSelect(rows, getRowId, isGroupRow);
  const result = selection.length === availableToSelect.length && selection.length !== 0;
  return result;
};

export class LocalSelection extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { availableToSelect: [] };

    this.toggleSelectAll = this.toggleSelectAll.bind(this);
    this.allSelected = this.allSelected.bind(this);
    this.selectAllAvailable = this.selectAllAvailable.bind(this);
    // this.availableToSelect = this.availableToSelect.bind(this);

    this.availableToSelect = ({ rows, getRowId, isGroupRow }) => {
      debugger
      const av = getAvailableToSelect(rows, getRowId, isGroupRow);
      this.setState({ availableToSelect: av });
      return rows;
    };
  }
  toggleSelectAll(select, { selection }, { toggleSelection }) {
    const { availableToSelect } = this.state;
    debugger // toggleSelectAll
    if (select === undefined) {
      toggleSelection({ rowIds: availableToSelect });
    } else if (select) {
      toggleSelection({ rowIds: availableToSelect, selected: true });
    } else {
      toggleSelection({ rowIds: selection, selected: false });
    }
  }
  allSelected({ selection }) {
    debugger // allSelected
    const { availableToSelect } = this.state;
    const result = selection.length === availableToSelect.length && selection.length !== 0;
    return result;
  }
  selectAllAvailable() {
    const { availableToSelect } = this.state;
    debugger // selectAllAvailable
    return !!availableToSelect.length;
  }
  availableToSelect({ rows, getRowId, isGroupRow }) {
    this.setState({ availableToSelect: getAvailableToSelect(rows, getRowId, isGroupRow) });
    return rows;
  }
  render() {
    return (
      <PluginContainer
        pluginName="LocalSelection"
        dependencies={pluginDependencies}
      >
        <Action
          name="toggleSelectAll"
          action={this.toggleSelectAll}
        />

        <Getter name="rows" computed={this.availableToSelect} />
        <Getter name="allSelected" computed={this.allSelected} />
        {/* <Getter name="someSelected" computed={this.sameSelected} /> */}
        <Getter name="selectAllAvailable" computed={selectAllAvailable} />
      </PluginContainer>
    );
  }
}
