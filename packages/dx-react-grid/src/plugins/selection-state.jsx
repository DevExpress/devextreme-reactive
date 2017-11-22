import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import {
  setRowsSelection,
  getAvailableSelection,
  selectAllAvaliable,
  getAvailableToSelect,
} from '@devexpress/dx-grid-core';

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

    const selectionComputed = ({ rows, getRowId, isGroupRow }) => {
      const availableToSelect = [...getAvailableToSelect(rows, getRowId, isGroupRow)];
      const result = getAvailableSelection(selection, availableToSelect);
      return result;
    };

    return (
      <PluginContainer
        pluginName="SelectionState"
      >
        <Action
          name="toggleSelection"
          action={({ rowIds, selected }) => {
            console.log('toggleSelection');
            this.changeSelection(setRowsSelection(selection, { rowIds, selected }));
          }}
        />

        <Getter name="selection" value={selection} />
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
