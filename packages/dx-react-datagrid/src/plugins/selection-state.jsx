import React from 'react';
import { Getter, Action } from '@devexpress/dx-react-core';
import { setRowSelection, setRowsSelection, getAvaliableSelection, getAvaliableToSelect } from '@devexpress/dx-datagrid-core';

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
          name="setRowSelection" action={({ rowId }) => {
            this.changeSelection(setRowSelection(selection, { rowId }));
          }}
        />
        <Action
          name="toggleAllSelection"
          action={({ rowIds }) => {
            this.changeSelection(setRowsSelection(selection, { rowIds }));
          }}
        />

        <Getter
          name="avaliableToSelect"
          pureComputed={getAvaliableToSelect}
          connectArgs={getter => [
            getter('rows'),
          ]}
        />
        <Getter
          name="selection"
          pureComputed={getAvaliableSelection}
          connectArgs={getter => [
            selection,
            getter('avaliableToSelect'),
          ]}
        />
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
