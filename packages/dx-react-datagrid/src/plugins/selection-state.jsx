import React from 'react';
import { Getter, Action } from '@devexpress/dx-react-core';
import { setRowSelection, toggleSelectAll } from '@devexpress/dx-datagrid-core';

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
      <div>
        <Action
          name="setRowSelection" action={({ row }) => {
            this.changeSelection(setRowSelection(selection, { rowId: row.id }));
          }}
        />
        <Action
          name="toggleAllSelection"
          action={({ rows }) => {
            this.changeSelection(toggleSelectAll(selection, { rows, getRowId: row => row.id }));
          }}
        />

        <Getter name="selection" value={selection} />
      </div>
    );
  }
}

SelectionState.propTypes = {
  selection: React.PropTypes.array,
  defaultSelection: React.PropTypes.array,
  selectionChange: React.PropTypes.func,
};

SelectionState.defaultProps = {
  selection: undefined,
  defaultSelection: undefined,
  selectionChange: undefined,
};
