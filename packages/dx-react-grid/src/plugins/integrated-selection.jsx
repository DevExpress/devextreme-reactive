import React from 'react';
import { Getter, Action, Plugin } from '@devexpress/dx-react-core';
import {
  getAvailableToSelect,
  someSelected,
  allSelected,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'SelectionState' },
];

export class IntegratedSelection extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { availableToSelect: [] };

    this.toggleSelectAll = this.toggleSelectAll.bind(this);
    this.availableToSelect = this.availableToSelect.bind(this);
  }

  toggleSelectAll(state, getters, { toggleSelection }) {
    const { availableToSelect } = this.state;
    toggleSelection({ rowIds: availableToSelect, state });
  }
  availableToSelect({ rows, getRowId, isGroupRow }) {
    this.setState({ availableToSelect: getAvailableToSelect(rows, getRowId, isGroupRow) });
    return rows;
  }
  render() {
    const { availableToSelect } = this.state;

    const allSelectedComputed = ({ selection }) =>
      allSelected({ selection, availableToSelect });
    const someSelectedComputed = ({ selection }) =>
      someSelected({ selection, availableToSelect });

    return (
      <Plugin
        name="IntegratedSelection"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={this.availableToSelect} />
        <Getter name="allSelected" computed={allSelectedComputed} />
        <Getter name="someSelected" computed={someSelectedComputed} />
        <Getter name="selectAllAvailable" value={!!availableToSelect.length} />

        <Action name="toggleSelectAll" action={this.toggleSelectAll} />
      </Plugin>
    );
  }
}
