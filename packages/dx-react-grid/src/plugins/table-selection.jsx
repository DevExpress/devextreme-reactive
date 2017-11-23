import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter, Template, PluginContainer,
  TemplateConnector, TemplateRenderer,
} from '@devexpress/dx-react-core';
import {
  tableColumnsWithSelection,
  isSelectTableCell,
  isSelectAllTableCell,
  isDataTableRow,
} from '@devexpress/dx-grid-core';

const getSelectTableCellProps = (
  params,
  { selection },
  { setRowsSelection },
) => ({
  ...params,
  row: params.tableRow.row,
  selected: selection.indexOf(params.tableRow.rowId) > -1,
  changeSelected: () => setRowsSelection({ rowIds: [params.tableRow.rowId] }),
});

const getSelectAllTableCellProps = (
  params,
  { availableToSelect, selection },
  { setRowsSelection },
) => ({
  ...params,
  selectionAvailable: !!availableToSelect.length,
  allSelected: selection.length === availableToSelect.length && selection.length !== 0,
  someSelected: selection.length !== availableToSelect.length && selection.length !== 0,
  toggleAll: () => setRowsSelection({ rowIds: availableToSelect }),
});

const getSelectTableRowProps = (
  { selectByRowClick, highlightSelected, ...restParams },
  { selection },
  { setRowsSelection },
) => {
  const { rowId } = restParams.tableRow;
  return ({
    ...restParams,
    selectByRowClick,
    selected: highlightSelected && selection.indexOf(rowId) > -1,
    changeSelected: () => setRowsSelection({ rowIds: [rowId] }),
  });
};

const pluginDependencies = [
  { pluginName: 'SelectionState' },
  { pluginName: 'Table' },
];

export class TableSelection extends React.PureComponent {
  render() {
    const {
      highlightSelected,
      showSelectionColumn,
      showSelectAll,
      selectionColumnWidth,
      selectAllCellComponent: SelectAllCell,
      selectCellComponent: SelectCell,
      selectRowComponent: SelectRow,
      selectByRowClick,
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

        {(showSelectionColumn && showSelectAll) && (
          <Template
            name="tableCell"
            predicate={({ tableRow, tableColumn }) => isSelectAllTableCell(tableRow, tableColumn)}
          >
            {params => (
              <TemplateConnector>
                {(getters, actions) => (
                  <SelectAllCell {...getSelectAllTableCellProps(params, getters, actions)} />
                )}
              </TemplateConnector>
            )}
          </Template>
        )}
        {showSelectionColumn && (
          <Template
            name="tableCell"
            predicate={({ tableRow, tableColumn }) => isSelectTableCell(tableRow, tableColumn)}
          >
            {params => (
              <TemplateConnector>
                {(getters, actions) => (
                  <SelectCell {...getSelectTableCellProps(params, getters, actions)} />
                )}
              </TemplateConnector>
            )}
          </Template>
        )}
        {(highlightSelected || selectByRowClick) && (
          <Template
            name="tableRow"
            predicate={({ tableRow }) => isDataTableRow(tableRow)}
          >
            {params => (
              <TemplateConnector>
                {(getters, actions) => (
                  <SelectRow
                    {...getSelectTableRowProps({
                      selectByRowClick,
                      highlightSelected,
                      ...params,
                    }, getters, actions)}
                  />
                )}
              </TemplateConnector>
            )}
          </Template>
        )}
      </PluginContainer>
    );
  }
}

TableSelection.propTypes = {
  selectAllCellComponent: PropTypes.func.isRequired,
  selectCellComponent: PropTypes.func.isRequired,
  selectRowComponent: PropTypes.func.isRequired,
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
