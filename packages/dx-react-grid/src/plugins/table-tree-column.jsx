import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Template, Plugin, TemplateConnector, TemplatePlaceholder } from '@devexpress/dx-react-core';
import { isTreeTableCell } from '@devexpress/dx-grid-core';

export class TableTreeColumn extends React.PureComponent {
  render() {
    const {
      for: forColumnName,
      showSelectionControls,
      showSelectAll,
      indentComponent: Indent,
      expandButtonComponent: ExpandButton,
      checkboxComponent: Checkbox,
      contentComponent: Content,
      cellComponent: Cell,
    } = this.props;
    return (
      <Plugin
        name="TableTreeColumn"
        dependencies={[
          { name: 'DataTypeProvider', optional: true },
          { name: 'TreeDataState' },
          { name: 'SelectionState', optional: !showSelectionControls },
          { name: 'IntegratedSelection', optional: !showSelectAll },
          { name: 'Table' },
          { name: 'TableHeaderRow', optional: true },
        ]}
      >
        <Template
          name="tableHeaderCellBefore"
          predicate={({ column }) => column.name === forColumnName}
        >
          <ExpandButton
            visible={false}
          />
          {showSelectionControls && showSelectAll && (
            <TemplateConnector>
              {({ selectAllAvailable, allSelected, someSelected }, { toggleSelectAll }) => (
                <Checkbox
                  disabled={!selectAllAvailable}
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={toggleSelectAll}
                />
              )}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) =>
            isTreeTableCell(tableRow, tableColumn, forColumnName)}
        >
          {params => (
            <TemplateConnector>
              {({
                getCollapsedRows, expandedRowIds, selection, isTreeRowLeaf, getTreeRowLevel,
                getCellValue,
              }, {
                toggleRowExpanded, toggleSelection,
              }) => {
                const { row, rowId } = params.tableRow;
                const columnName = params.tableColumn.column.name;
                const value = getCellValue(row, columnName);
                const collapsedRows = getCollapsedRows(row);
                return (
                  <TemplatePlaceholder
                    name="valueFormatter"
                    params={{
                      row,
                      column: params.tableColumn.column,
                      value,
                    }}
                  >
                    {content => (
                      <Cell
                        {...params}
                        row={row}
                        column={params.tableColumn.column}
                        value={value}
                      >
                        <Indent
                          level={getTreeRowLevel(row)}
                        />
                        <ExpandButton
                          visible={collapsedRows ? !!collapsedRows.length : !isTreeRowLeaf(row)}
                          expanded={expandedRowIds.indexOf(rowId) > -1}
                          onToggle={() => toggleRowExpanded({ rowId })}
                        />
                        {showSelectionControls && (
                          <Checkbox
                            disabled={false}
                            checked={selection.indexOf(rowId) > -1}
                            indeterminate={false}
                            onChange={() => toggleSelection({ rowIds: [rowId] })}
                          />
                        )}
                        <Content>
                          {content || value}
                        </Content>
                      </Cell>
                    )}
                  </TemplatePlaceholder>
                );
              }}
            </TemplateConnector>
          )}
        </Template>
      </Plugin>
    );
  }
}

TableTreeColumn.propTypes = {
  for: PropTypes.string.isRequired,
  showSelectionControls: PropTypes.bool,
  showSelectAll: PropTypes.bool,
  cellComponent: PropTypes.func.isRequired,
  indentComponent: PropTypes.func.isRequired,
  expandButtonComponent: PropTypes.func.isRequired,
  checkboxComponent: PropTypes.func.isRequired,
  contentComponent: PropTypes.func.isRequired,
};

TableTreeColumn.defaultProps = {
  showSelectionControls: false,
  showSelectAll: false,
};
