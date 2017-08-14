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

const pluginDependencies = [
  { pluginName: 'SelectionState' },
  { pluginName: 'TableView' },
];

const tableExtraPropsComputed = ({ tableExtraProps }, { setRowsSelection }) =>
  tableExtraPropsWithSelection(tableExtraProps, setRowsSelection);
const tableBodyRowsComputed = ({ tableBodyRows, selection }) =>
  tableRowsWithSelection(tableBodyRows, selection);

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

    const tableColumnsComputed = ({ tableColumns }) =>
      tableColumnsWithSelection(tableColumns, selectionColumnWidth);

    return (
      <PluginContainer
        pluginName="TableSelection"
        dependencies={pluginDependencies}
      >
        {showSelectionColumn && (
          <Getter name="tableColumns" computed={tableColumnsComputed} />
        )}
        {highlightSelected && (
          <Getter name="tableBodyRows" computed={tableBodyRowsComputed} />
        )}
        {selectByRowClick && (
          <Getter name="tableExtraProps" computed={tableExtraPropsComputed} />
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
              toggleSelected: ({ rowId }) => action('setRowsSelection')({ rowIds: [rowId] }),
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

TableSelection.propTypes = {
  selectAllCellTemplate: PropTypes.func.isRequired,
  selectCellTemplate: PropTypes.func.isRequired,
  highlightSelected: PropTypes.bool,
  selectByRowClick: PropTypes.bool,
  showSelectAll: PropTypes.bool,
  showSelectionColumn: PropTypes.bool,
  selectionColumnWidth: PropTypes.number.isRequired,
};

TableSelection.defaultProps = {
  highlightSelected: false,
  selectByRowClick: false,
  showSelectAll: true,
  showSelectionColumn: true,
};
