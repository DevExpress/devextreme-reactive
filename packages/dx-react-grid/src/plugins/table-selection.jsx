import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, PluginContainer } from '@devexpress/dx-react-core';
import {
  tableColumnsWithSelection,
  tableRowsWithSelection,
  tableExtraPropsWithSelection,
  isSelectTableCell,
  isSelectAllTableCell,
} from '@devexpress/dx-grid-core';

export class TableSelection extends React.PureComponent {
  render() {
    const {
      highlightSelected,
      selectByRowClick,
      showSelectionColumn,
      showSelectAll,
      selectionColumnWidth,
      selectAllCellTemplate,
      selectCellTemplate,
    } = this.props;

    return (
      <PluginContainer>
        {showSelectionColumn && (
          <Getter
            name="tableColumns"
            pureComputed={tableColumnsWithSelection}
            connectArgs={getter => [
              getter('tableColumns'),
              selectionColumnWidth,
            ]}
          />
        )}
        {highlightSelected && (
          <Getter
            name="tableBodyRows"
            pureComputed={tableRowsWithSelection}
            connectArgs={getter => [
              getter('tableBodyRows'),
              getter('selection'),
            ]}
          />
        )}
        {selectByRowClick && (
          <Getter
            name="tableExtraProps"
            pureComputed={tableExtraPropsWithSelection}
            connectArgs={(getter, action) => [
              getter('tableExtraProps'),
              action('setRowSelection'),
            ]}
          />
        )}

        {(showSelectionColumn && showSelectAll) && (
          <Template
            name="tableViewCell"
            predicate={({ tableRow, tableColumn }) => isSelectAllTableCell(tableRow, tableColumn)}
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
            {({
              toggleAll,
              availableToSelect,
              ...restParams
            }) => selectAllCellTemplate({
              ...restParams,
              toggleAll: () => toggleAll(availableToSelect),
            })}
          </Template>
        )}
        {showSelectionColumn && (
          <Template
            name="tableViewCell"
            predicate={({ tableRow, tableColumn }) => isSelectTableCell(tableRow, tableColumn)}
            connectGetters={getter => ({
              selection: getter('selection'),
            })}
            connectActions={action => ({
              toggleSelected: ({ rowId }) => action('setRowSelection')({ rowId }),
            })}
          >
            {({
              selection,
              toggleSelected,
              ...restParams
            }) => selectCellTemplate({
              row: restParams.tableRow.row,
              selected: selection.indexOf(restParams.tableRow.rowId) > -1,
              changeSelected: () => toggleSelected({ rowId: restParams.tableRow.rowId }),
              ...restParams,
            })}
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
  selectionColumnWidth: PropTypes.number.isRequired,
};
