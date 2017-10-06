import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import {
  setRowsSelection,
  getAvailableSelection,
  getAvailableToSelect,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'LocalGrouping', optional: true },
];

const availableToSelectComputed = ({ rows, getRowId, isGroupRow }) =>
  getAvailableToSelect(rows, getRowId, isGroupRow);

export class SelectionState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selection: props.defaultSelection || [],
    };

    this.changeSelection = (selection) => {
      const { onSelectionChange } = this.props;
      this.setState({ selection });
      if (onSelectionChange) {
        onSelectionChange(selection);
      }
    };
  }
  render() {
    const selection = this.props.selection || this.state.selection;

    const selectionComputed = ({ availableToSelect }) =>
      getAvailableSelection(selection, availableToSelect);

    return (
      <PluginContainer
        pluginName="SelectionState"
        dependencies={pluginDependencies}
      >
        <Action
          name="setRowsSelection"
          action={({ rowIds, selected }) => {
            this.changeSelection(setRowsSelection(selection, { rowIds, selected }));
          }}
        />

        <Getter name="availableToSelect" computed={availableToSelectComputed} />
        <Getter name="selection" computed={selectionComputed} />
      </PluginContainer>
    );
  }
}

SelectionState.propTypes = {
  selection: PropTypes.array,
  defaultSelection: PropTypes.array,
  onSelectionChange: PropTypes.func,
};

SelectionState.defaultProps = {
  selection: undefined,
  defaultSelection: undefined,
  onSelectionChange: undefined,
};
