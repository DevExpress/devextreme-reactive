import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Getter, Template, Plugin, TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  tableRowsWithExpandedDetail,
  tableDetailCellColSpanGetter,
  isDetailRowExpanded,
  tableColumnsWithDetail,
  isDetailToggleTableCell,
  isDetailTableRow,
  isDetailTableCell,
  TABLE_DETAIL_TYPE,
} from '@devexpress/dx-grid-core';

const getCellColSpanComputed = (
  { getTableCellColSpan },
) => tableDetailCellColSpanGetter(getTableCellColSpan);

const pluginDependencies = [
  { name: 'RowDetailState' },
  { name: 'Table' },
];

export class TableRowDetail extends React.PureComponent {
  render() {
    const {
      rowHeight,
      contentComponent: Content,
      toggleCellComponent: ToggleCell,
      cellComponent: Cell,
      rowComponent: Row,
      toggleColumnWidth,
    } = this.props;

    const tableColumnsComputed = (
      { tableColumns },
    ) => tableColumnsWithDetail(tableColumns, toggleColumnWidth);
    const tableBodyRowsComputed = (
      { tableBodyRows, expandedDetailRowIds },
    ) => tableRowsWithExpandedDetail(tableBodyRows, expandedDetailRowIds, rowHeight);

    return (
      <Plugin
        name="TableRowDetail"
        dependencies={pluginDependencies}
      >
        <Getter name="tableColumns" computed={tableColumnsComputed} />
        <Getter name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Getter name="getTableCellColSpan" computed={getCellColSpanComputed} />

        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => isDetailToggleTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {({ expandedDetailRowIds }, { toggleDetailRowExpanded }) => (
                <ToggleCell
                  {...params}
                  row={params.tableRow.row}
                  expanded={isDetailRowExpanded(expandedDetailRowIds, params.tableRow.rowId)}
                  onToggle={() => toggleDetailRowExpanded({ rowId: params.tableRow.rowId })}
                />
              )}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={({ tableRow }) => isDetailTableRow(tableRow)}
        >
          {params => (
            <TemplateConnector>
              {({ tableColumns }) => {
                if (isDetailTableCell(params.tableColumn, tableColumns)) {
                  return (
                    <Cell
                      {...params}
                      row={params.tableRow.row}
                    >
                      <Content row={params.tableRow.row} />
                    </Cell>
                  );
                }
                return null;
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isDetailTableRow(tableRow)}
        >
          {params => (
            <Row
              {...params}
              row={params.tableRow.row}
            />
          )}
        </Template>
      </Plugin>
    );
  }
}

TableRowDetail.ROW_TYPE = TABLE_DETAIL_TYPE;
TableRowDetail.COLUMN_TYPE = TABLE_DETAIL_TYPE;

TableRowDetail.propTypes = {
  contentComponent: PropTypes.func,
  toggleCellComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  toggleColumnWidth: PropTypes.number.isRequired,
  rowHeight: PropTypes.number,
};

TableRowDetail.defaultProps = {
  contentComponent: () => null,
  rowHeight: undefined,
};

TableRowDetail.components = {
  rowComponent: 'Row',
  cellComponent: 'Cell',
  toggleCellComponent: 'ToggleCell',
};
