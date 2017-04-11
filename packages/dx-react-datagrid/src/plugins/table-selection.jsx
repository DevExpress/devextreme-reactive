import React from 'react';
import { Getter, Template } from '@devexpress/dx-react-core';
import extendWithEventListener from '../utils/extendWithEventListener';

export class TableSelection extends React.PureComponent {
  constructor(props) {
    super(props);

    this._tableColumns = (tableColumns, showCheckboxes) => {
      if (!showCheckboxes) return tableColumns;
      return [{ type: 'select', name: 'select', width: 20 }, ...tableColumns];
    };

    this._tableBodyRows = (highlightSelected, tableBodyRows, selection) => {
      if (!highlightSelected) return tableBodyRows;
      const selectionSet = new Set(selection);
      return tableBodyRows
        .map((row) => {
          if (!selectionSet.has(row.id)) return row;
          return Object.assign({ selected: true }, row);
        });
    };

    this._tableExtraProps = (selectByRowClick, tableExtraProps,
        availableToSelect, setRowSelection) => {
      if (!selectByRowClick) return tableExtraProps;
      return extendWithEventListener(tableExtraProps, 'onClick', ({ row }) => {
        const rowId = row.id;
        if (availableToSelect.indexOf(rowId) === -1) return;
        setRowSelection({ rowId });
      });
    };
  }
  render() {
    const { highlightSelected, selectByRowClick, showCheckboxes, showSelectAll } = this.props;
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
            highlightSelected,
            getter('tableBodyRows'),
            getter('selection'),
          ]}
        />
        <Getter
          name="tableExtraProps"
          pureComputed={this._tableExtraProps}
          connectArgs={(getter, action) => [
            selectByRowClick,
            getter('tableExtraProps'),
            getter('availableToSelect'),
            action('setRowSelection'),
          ]}
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
            toggleAll: availableToSelect => action('setRowsSelection')({ rowIds: availableToSelect }),
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
TableSelection.defaultProps = {
  highlightSelected: false,
  selectByRowClick: false,
  showSelectAll: true,
  showCheckboxes: true,
};
TableSelection.propTypes = {
  selectAllCellTemplate: React.PropTypes.func.isRequired,
  selectCellTemplate: React.PropTypes.func.isRequired,
  highlightSelected: React.PropTypes.bool,
  selectByRowClick: React.PropTypes.bool,
  showSelectAll: React.PropTypes.bool,
  showCheckboxes: React.PropTypes.bool,
};
