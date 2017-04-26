import React from 'react';
import { Getter, Template } from '@devexpress/dx-react-core';
import extendWithEventListener from '../utils/extendWithEventListener';

export class TableSelection extends React.PureComponent {
  constructor(props) {
    super(props);

    this._tableColumns = (tableColumns, showCheckboxes) => {
      if (!showCheckboxes) return tableColumns;
      return [{ type: 'select', width: 30 }, ...tableColumns];
    };

    this._tableBodyRows = (highlightSelected, tableBodyRows, selection, getRowId) => {
      if (!highlightSelected) return tableBodyRows;
      const selectionSet = new Set(selection);
      return tableBodyRows
        .map((row) => {
          if (!selectionSet.has(getRowId(row))) return row;
          return Object.assign({ selected: true, _originalRow: row }, row);
        });
    };

    this._tableExtraProps = (selectByRowClick, tableExtraProps,
        availableToSelect, setRowSelection, getRowId) => {
      if (!selectByRowClick) return tableExtraProps;
      return extendWithEventListener(tableExtraProps, 'onClick', ({ row }) => {
        const rowId = getRowId(row);
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
            getter('getRowId'),
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
            getter('getRowId'),
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
          {({ toggleAll, availableToSelect, ...params }) => (
            <SelectAllCell
              {...params}
              toggleAll={() => toggleAll(availableToSelect)}
            />
          )}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ column, row }) => showCheckboxes && column.type === 'select' && !row.type}
          connectGetters={(getter, { row }) => ({
            rowId: getter('getRowId')(row),
            selection: getter('selection'),
          })}
          connectActions={action => ({
            toggleSelected: ({ rowId }) => action('setRowSelection')({ rowId }),
          })}
        >
          {({ rowId, selection, toggleSelected, ...restParams }) => (
            <SelectCell
              {...restParams}
              selected={selection.indexOf(rowId) > -1}
              changeSelected={() => toggleSelected({ rowId })}
            />
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
