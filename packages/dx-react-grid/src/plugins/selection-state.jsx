import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import {
  setRowsSelection,
  getAvailableSelection,
  selectAllAvaliable,
} from '@devexpress/dx-grid-core';

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

    const selectionComputed = ({ selectAllAvailable }) =>
      selectAllAvaliable(selection, selectAllAvailable);

    return (
      <PluginContainer
        pluginName="SelectionState"
      >
        <Action
          name="toggleSelection"
          action={({ rowIds, selected }) => {
            this.changeSelection(setRowsSelection(selection, { rowIds, selected }));
          }}
        />

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
