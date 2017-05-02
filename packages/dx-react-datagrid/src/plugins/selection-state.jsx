import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { setRowSelection, setRowsSelection, getAvailableSelection, getAvailableToSelect } from '@devexpress/dx-datagrid-core';

export class SelectionState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selection: props.defaultSelection || [],
    };

    this.changeSelection = (selection) => {
      const { selectionChange } = this.props;
      this.setState({ selection });
      if (selectionChange) {
        selectionChange(selection);
      }
    };
  }
  render() {
    const selection = this.props.selection || this.state.selection;

    return (
      <PluginContainer>
        <Action
          name="setRowSelection" action={({ rowId }) => {
            this.changeSelection(setRowSelection(selection, { rowId }));
          }}
        />
        <Action
          name="setRowsSelection"
          action={({ rowIds }) => {
            this.changeSelection(setRowsSelection(selection, { rowIds }));
          }}
        />

        <Getter
          name="availableToSelect"
          pureComputed={getAvailableToSelect}
          connectArgs={getter => [
            getter('rows'),
            getter('getRowId'),
          ]}
        />
        <Getter
          name="selection"
          pureComputed={getAvailableSelection}
          connectArgs={getter => [
            selection,
            getter('availableToSelect'),
          ]}
        />
      </PluginContainer>
    );
  }
}

SelectionState.propTypes = {
  selection: PropTypes.array,
  defaultSelection: PropTypes.array,
  selectionChange: PropTypes.func,
};

SelectionState.defaultProps = {
  selection: undefined,
  defaultSelection: undefined,
  selectionChange: undefined,
};
