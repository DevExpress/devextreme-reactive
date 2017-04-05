import React from 'react';
import { Getter, Action, Template } from '@devexpress/dx-react-core';

export class TableColumnSelection extends React.PureComponent {
  constructor(props) {
    super(props);

    this._tableColumns = (tableColumns, showCheckboxes) => {
      if (!showCheckboxes) return tableColumns;
      return [{ type: 'select', name: 'select', width: 20 }, ...tableColumns];
    };

    this._tableBodyRows = (tableBodyRows, selection) => {
      const selectionSet = new Set(selection);
      return tableBodyRows
        .map((row) => {
          if (!selectionSet.has(row.id)) return row;
          return Object.assign({ selected: true }, row);
        });
    };
  }
  render() {
    const { selectByRowClick, showCheckboxes, showSelectAll } = this.props;
    const SelectAllCell = this.props.selectAllCellTemplate;
    const SelectCell = this.props.selectCellTemplate;

    return (
      <div>
        <Getter
          name="tableColumns"
          pureComputed={this._tableColumns}
          connectArgs={getter => [
            getter('tableColumns'),
            showCheckboxes,
          ]}
        />
        <Getter
          name="tableBodyRows"
          pureComputed={this._tableBodyRows}
          connectArgs={getter => [
            getter('tableBodyRows'),
            getter('selection'),
          ]}
        />
        <Action
          name="tableClick"
          action={({ rowId, columnName }, action) => {
            if (!selectByRowClick) return;
            action('setRowSelection')({ rowId });
          }}
        />

        <Template
          name="tableViewCell"
          predicate={({ column, row }) => showCheckboxes && showSelectAll && column.type === 'select' && row.type === 'heading'}
          connectGetters={(getter) => {
            const availableToSelect = getter('availableToSelect');
            const selection = getter('selection');
            return {
              availableToSelect,
              allSelected: selection.length === availableToSelect.length && selection.length !== 0,
              someSelected: selection.length !== availableToSelect.length && selection.length !== 0,
            };
          }}
          connectActions={action => ({
            toggleAll: availableToSelect => action('toggleAllSelection')({ rowIds: availableToSelect }),
          })}
        >
          {({ allSelected, someSelected, toggleAll, availableToSelect }) => (
            <SelectAllCell
              allSelected={allSelected}
              someSelected={someSelected}
              toggleAll={() => toggleAll(availableToSelect)}
            />
          )}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ column, row }) => showCheckboxes && column.type === 'select' && !row.type}
          connectGetters={(getter, { row }) => ({
            selected: getter('selection').indexOf(row.id) > -1,
          })}
          connectActions={(action, { row }) => ({
            toggleSelected: () => action('setRowSelection')({ rowId: row.id }),
          })}
        >
          {({ selected, toggleSelected }) => (
            <SelectCell selected={selected} changeSelected={toggleSelected} />
          )}
        </Template>
      </div>
    );
  }
}
TableColumnSelection.defaultProps = {
  selectByRowClick: false,
  showSelectAll: true,
  showCheckboxes: true,
};
TableColumnSelection.propTypes = {
  selectAllCellTemplate: React.PropTypes.func.isRequired,
  selectCellTemplate: React.PropTypes.func.isRequired,
  selectByRowClick: React.PropTypes.bool,
  showSelectAll: React.PropTypes.bool,
  showCheckboxes: React.PropTypes.bool,
};
