import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Getter, Template, Plugin, TemplateConnector, TemplatePlaceholder,
} from '@devexpress/dx-react-core';

const tableBodyRowsComputed = ({ tableBodyRows, getRowLevelKey }) =>
  tableBodyRows.reduce((acc, tableRow) => {
    if (tableRow.type !== 'data') {
      acc.push(tableRow);
      return acc;
    }
    let rowLevel = getRowLevelKey(tableRow.row) && parseInt(getRowLevelKey(tableRow.row).replace('treeNode_', ''), 10);
    if (rowLevel === undefined) {
      rowLevel = (acc.length && acc[acc.length - 1].level
        + (getRowLevelKey(acc[acc.length - 1].row) ? 1 : 0)) || 0;
    }
    acc.push({
      ...tableRow,
      level: rowLevel,
    });
    return acc;
  }, []);

export class TableTreeColumn extends React.PureComponent {
  render() {
    const {
      for: forColumnName,
      showSelectionControls,
      showSelectAll,
      indentComponent: Indent,
      toggleButtonComponent: ToggleButton,
      checkboxComponent: Checkbox,
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
        <Getter name="tableBodyRows" computed={(tableBodyRowsComputed)} />
        <Template
          name="tableHeaderCellBefore"
          predicate={({ column }) => column.name === (forColumnName || 'name')}
        >
          <ToggleButton
            disabled
          />
          {showSelectionControls && showSelectAll && (
            <TemplateConnector>
              {({ selectAllAvailable, allSelected, someSelected }, { toggleSelectAll }) => (
                <Checkbox
                  disabled={!selectAllAvailable}
                  selected={allSelected}
                  someSelected={someSelected}
                  onToggle={toggleSelectAll}
                />
              )}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => tableRow.type === 'data' && tableColumn.type === 'data' && tableColumn.column.name === forColumnName}
        >
          {params => (
            <TemplateConnector>
              {({ getCellValue }) => {
                const { level, row, rowId } = params.tableRow;
                const columnName = params.tableColumn.column.name;
                const value = getCellValue(row, columnName);
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
                      <TemplateConnector>
                        {({
                          getCollapsedRows, expandedRowIds, selection, isLeafRow,
                        }, {
                          toggleRowExpanded, toggleSelection,
                        }) => {
                          const collapsedRows = getCollapsedRows(row);
                          return (
                            <Cell
                              {...params}
                              row={row}
                              column={params.tableColumn.column}
                              value={value}
                              controls={
                                <React.Fragment>
                                  <Indent
                                    level={level}
                                  />
                                  <ToggleButton
                                    visible={collapsedRows
                                      ? !!collapsedRows.length : !isLeafRow(row)}
                                    expanded={expandedRowIds.indexOf(rowId) > -1}
                                    onToggle={() =>
                                      toggleRowExpanded({ rowId })}
                                  />
                                  {showSelectionControls && (
                                    <Checkbox
                                      disabled={false}
                                      selected={selection.indexOf(rowId) > -1}
                                      someSelected={false}
                                      onToggle={() =>
                                        toggleSelection({ rowIds: [rowId] })}
                                    />
                                  )}
                                </React.Fragment>
                              }
                            >
                              {content}
                            </Cell>
                          );
                      }}
                      </TemplateConnector>
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
  toggleButtonComponent: PropTypes.func.isRequired,
  checkboxComponent: PropTypes.func.isRequired,
};

TableTreeColumn.defaultProps = {
  showSelectionControls: false,
  showSelectAll: false,
};
