import React from 'react';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import {
  getAvailableToSelect,
  someSelected,
  allSelected,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'SelectionState' },
];

export class IntegratedSelection extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { availableToSelect: [] };

    this.toggleAllRowsSelection = this.toggleAllRowsSelection.bind(this);
    this.availableToSelect = this.availableToSelect.bind(this);
  }

  toggleAllRowsSelection(select, { selection }, { toggleSelection }) {
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

    const allSelectedComputed = ({ selection }) =>
      allSelected({ selection, availableToSelect });
    const someSelectedComputed = ({ selection }) =>
      someSelected({ selection, availableToSelect });

    return (
      <PluginContainer
        pluginName="IntegratedSelection"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={this.availableToSelect} />
        <Getter name="allSelected" computed={allSelectedComputed} />
        <Getter name="someSelected" computed={someSelectedComputed} />
        <Getter name="allRowsSelectionAvailable" value={!!availableToSelect.length} />

        <Action name="toggleAllRowsSelection" action={this.toggleAllRowsSelection} />
      </PluginContainer>
    );
  }
}
