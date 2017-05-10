import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, PluginContainer } from '@devexpress/dx-react-core';
import extendWithEventListener from '../utils/extendWithEventListener';

export class TableSelection extends React.PureComponent {
  constructor(props) {
    super(props);

    this._tableColumns = tableColumns =>
      [{ type: 'select', name: 'select', width: 30 }, ...tableColumns];

    this._tableBodyRows = (tableBodyRows, selection, getRowId) => {
      const selectionSet = new Set(selection);
      return tableBodyRows
        .map((row) => {
          if (!selectionSet.has(getRowId(row))) return row;
          return Object.assign({ selected: true, _originalRow: row }, row);
        });
    };

    this._tableExtraProps = (tableExtraProps, availableToSelect, setRowSelection, getRowId) =>
      extendWithEventListener(tableExtraProps, 'onClick', ({ row }) => {
        const rowId = getRowId(row);
        if (availableToSelect.indexOf(rowId) === -1) return;
        setRowSelection({ rowId });
      });
  }
  render() {
    const { highlightSelected, selectByRowClick, showSelectionColumn, showSelectAll } = this.props;
    const SelectAllCell = this.props.selectAllCellTemplate;
    const SelectCell = this.props.selectCellTemplate;

    return (
      <PluginContainer>
        {showSelectionColumn && (
          <Getter
            name="tableColumns"
            pureComputed={this._tableColumns}
            connectArgs={getter => [
              getter('tableColumns'),
            ]}
          />
        )}
        {highlightSelected && (
          <Getter
            name="tableBodyRows"
            pureComputed={this._tableBodyRows}
            connectArgs={getter => [
              getter('tableBodyRows'),
              getter('selection'),
              getter('getRowId'),
            ]}
          />
        )}
        {selectByRowClick && (
          <Getter
            name="tableExtraProps"
            pureComputed={this._tableExtraProps}
            connectArgs={(getter, action) => [
              getter('tableExtraProps'),
              getter('availableToSelect'),
              action('setRowSelection'),
              getter('getRowId'),
            ]}
          />
        )}

        {(showSelectionColumn && showSelectAll) && (
          <Template
            name="tableViewCell"
            predicate={({ column, row }) => column.type === 'select' && row.type === 'heading'}
            connectGetters={(getter) => {
              const availableToSelect = getter('availableToSelect');
              const selection = getter('selection');
              const selectionExists = selection.length !== 0;
              return {
                availableToSelect,
                selectionAvailable: !!availableToSelect.length,
                allSelected: selection.length === availableToSelect.length && selectionExists,
                someSelected: selection.length !== availableToSelect.length && selectionExists,
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
        )}
        {showSelectionColumn && (
          <Template
            name="tableViewCell"
            predicate={({ column, row }) => showSelectionColumn && column.type === 'select' && !row.type}
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
        )}
      </PluginContainer>
    );
  }
}
TableSelection.defaultProps = {
  highlightSelected: false,
  selectByRowClick: false,
  showSelectAll: true,
  showSelectionColumn: true,
};
TableSelection.propTypes = {
  selectAllCellTemplate: PropTypes.func.isRequired,
  selectCellTemplate: PropTypes.func.isRequired,
  highlightSelected: PropTypes.bool,
  selectByRowClick: PropTypes.bool,
  showSelectAll: PropTypes.bool,
  showSelectionColumn: PropTypes.bool,
};
