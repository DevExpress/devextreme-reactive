import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter, Template, PluginContainer, TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  tableRowsWithExpandedDetail,
  isDetailRowExpanded,
  tableColumnsWithDetail,
  isDetailToggleTableCell,
  isDetailTableRow,
} from '@devexpress/dx-grid-core';

const getDetailToggleTableCellProps = (
  params,
  { expandedRows },
  { setDetailRowExpanded },
) => ({
  ...params,
  row: params.tableRow.row,
  expanded: isDetailRowExpanded(expandedRows, params.tableRow.rowId),
  onToggle: () => setDetailRowExpanded({ rowId: params.tableRow.rowId }),
});

const getDetailTableCellProps = ({ detailComponent, ...params }) => ({
  ...params,
  row: params.tableRow.row,
});

const getDetailTableRowProps = params => ({
  ...params,
  row: params.tableRow.row,
});

const pluginDependencies = [
  { pluginName: 'Table' },
];

export class TableRowDetail extends React.PureComponent {
  render() {
    const {
      rowHeight,
      detailComponent: Detail,
      detailToggleCellComponent: DetailToggleCell,
      detailCellComponent: DetailCell,
      detailRowComponent: DetailRow,
      detailToggleColumnWidth,
    } = this.props;

    const tableColumnsComputed = ({ tableColumns }) =>
      tableColumnsWithDetail(tableColumns, detailToggleColumnWidth);
    const tableBodyRowsComputed = ({ tableBodyRows, expandedRows }) =>
      tableRowsWithExpandedDetail(tableBodyRows, expandedRows, rowHeight);

    return (
      <PluginContainer
        pluginName="TableRowDetail"
        dependencies={pluginDependencies}
      >
        <Getter name="tableColumns" computed={tableColumnsComputed} />
        <Getter name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => isDetailToggleTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {(getters, actions) => (
                <DetailToggleCell {...getDetailToggleTableCellProps(params, getters, actions)} />
              )}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={({ tableRow }) => isDetailTableRow(tableRow)}
        >
          {params => (
            <DetailCell
              {...getDetailTableCellProps(params)}
            >
              <Detail row={params.tableRow.row} />
            </DetailCell>
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isDetailTableRow(tableRow)}
        >
          {params => <DetailRow {...getDetailTableRowProps(params)} />}
        </Template>
      </PluginContainer>
    );
  }
}

TableRowDetail.propTypes = {
  detailComponent: PropTypes.func,
  detailToggleCellComponent: PropTypes.func.isRequired,
  detailCellComponent: PropTypes.func.isRequired,
  detailRowComponent: PropTypes.func.isRequired,
  detailToggleColumnWidth: PropTypes.number.isRequired,
  rowHeight: PropTypes.number,
};

TableRowDetail.defaultProps = {
  detailComponent: () => null,
  rowHeight: undefined,
};
