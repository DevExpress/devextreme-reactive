import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter, Template, PluginContainer,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  tableColumnsWithSelection,
  isSelectTableCell,
  isSelectAllTableCell,
  isDataTableRow,
} from '@devexpress/dx-grid-core';

export class TableSelection extends React.PureComponent {
  render() {
    const {
      highlightRow,
      selectByRowClick,
      showSelectionColumn,
      showSelectAll,
      headerCellComponent: HeaderCell,
      cellComponent: Cell,
      rowComponent: Row,
      selectionColumnWidth,
    } = this.props;

    const tableColumnsComputed = ({ tableColumns }) =>
      tableColumnsWithSelection(tableColumns, selectionColumnWidth);

    return (
      <PluginContainer
        pluginName="TableSelection"
        dependencies={[
          { pluginName: 'Table' },
          { pluginName: 'SelectionState' },
          { pluginName: 'IntegratedSelection', optional: !showSelectAll },
        ]}
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
                {({ selectAllAvailable, allSelected, someSelected }, { toggleSelectAll }) => (
                  <HeaderCell
                    {...params}
                    disabled={!selectAllAvailable}
                    allSelected={allSelected}
                    someSelected={someSelected}
                    onToggle={select => toggleSelectAll(select)}
                  />
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
                {({ selection }, { toggleSelection }) => (
                  <Cell
                    {...params}
                    row={params.tableRow.row}
                    selected={selection.indexOf(params.tableRow.rowId) !== -1}
                    onToggle={() => toggleSelection({ rowIds: [params.tableRow.rowId] })}
                  />
                )}
              </TemplateConnector>
            )}
          </Template>
        )}
        {(highlightRow || selectByRowClick) && (
          <Template
            name="tableRow"
            predicate={({ tableRow }) => isDataTableRow(tableRow)}
          >
            {params => (
              <TemplateConnector>
                {({ selection }, { toggleSelection }) => (
                  <Row
                    {...params}
                    selectByRowClick
                    selected={highlightRow && selection.indexOf(params.tableRow.rowId) !== -1}
                    onToggle={() => toggleSelection({ rowIds: [params.tableRow.rowId] })}
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
  headerCellComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  highlightRow: PropTypes.bool,
  selectByRowClick: PropTypes.bool,
  showSelectAll: PropTypes.bool,
  showSelectionColumn: PropTypes.bool,
  selectionColumnWidth: PropTypes.number.isRequired,
};

TableSelection.defaultProps = {
  highlightRow: false,
  selectByRowClick: false,
  showSelectAll: false,
  showSelectionColumn: true,
};
