import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter, Template, Plugin, TemplateConnector, TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import {} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'TreeingState' },
  { name: 'Table' },
];

const tableBodyRowsComputed = ({ tableBodyRows, getRowLevelKey }) =>
  tableBodyRows.reduce((acc, tableRow) => {
    if (tableRow.type !== 'data') {
      acc.push(tableRow);
      return acc;
    }
    let rowLevel = getRowLevelKey(tableRow.row) && parseInt(getRowLevelKey(tableRow.row).replace('treeNode_', ''), 10);
    if (rowLevel === undefined) {
      rowLevel = (acc.length && acc[acc.length - 1].level + (getRowLevelKey(acc[acc.length - 1].row) ? 1 : 0)) || 0;
    }
    acc.push({
      ...tableRow,
      level: rowLevel,
    });
    return acc;
  }, []);

export class TableTreeing extends React.PureComponent {
  render() {
    const {
      showSelectionControls,
      stepperComponent: Stepper,
      toggleComponent: Toggle,
      selectComponent: Select,
      cellComponent: Cell,
    } = this.props;
    return (
      <Plugin
        name="TableTreeing"
        dependencies={pluginDependencies}
      >
        <Getter name="tableBodyRows" computed={(tableBodyRowsComputed)} />
        <Template
          name="tableHeaderCellBefore"
          predicate={({ column }) => column.name === 'name'}
        >
          <Toggle
            disabled
          />
          {showSelectionControls && (
            <TemplateConnector>
              {({ selectAllAvailable, allSelected, someSelected }, { toggleSelectAll }) => (
                <Select
                  disabled={!selectAllAvailable}
                  selected={allSelected}
                  indeterminate={someSelected}
                  onToggle={toggleSelectAll}
                />
              )}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => tableRow.type === 'data' && tableColumn.column && tableColumn.column.name === 'name'}
        >
          {params => (
            <TemplateConnector>
              {({ getCellValue }) => {
                const columnName = params.tableColumn.column.name;
                const value = getCellValue(params.tableRow.row, columnName);
                return (
                  <TemplatePlaceholder
                    name="valueFormatter"
                    params={{
                      row: params.tableRow.row,
                      column: params.tableColumn.column,
                      value,
                    }}
                  >
                    {content => (
                      <TemplateConnector>
                        {({ getCollapsedRows, expandedRowIds, selection }, { toggleRowExpanded, toggleSelection }) => (
                          <Cell
                            {...params}
                            row={params.tableRow.row}
                            column={params.tableColumn.column}
                            value={value}
                            controls={
                              <React.Fragment>
                                <Stepper
                                  level={params.tableRow.level}
                                />
                                <Toggle
                                  disabled={!(!!getCollapsedRows(params.tableRow.row) || expandedRowIds.indexOf(params.tableRow.rowId) > -1)}
                                  expanded={expandedRowIds.indexOf(params.tableRow.rowId) > -1}
                                  onToggle={() => toggleRowExpanded({ rowId: params.tableRow.rowId })}
                                />
                                {showSelectionControls && (
                                  <Select
                                    disabled={false}
                                    selected={selection.indexOf(params.tableRow.rowId) > -1}
                                    indeterminate={false}
                                    onToggle={() => toggleSelection({ rowIds: [params.tableRow.rowId] })}
                                  />
                                )}
                              </React.Fragment>
                            }
                          >
                            {content}
                          </Cell>
                        )}
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

TableTreeing.propTypes = {
  showSelectionControls: PropTypes.bool,
  stepperComponent: PropTypes.func.isRequired,
  toggleComponent: PropTypes.func.isRequired,
  selectComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
};

TableTreeing.defaultProps = {
  showSelectionControls: false,
};
