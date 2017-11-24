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

const getDetailToggleCellProps = (
  params,
  { expandedRows },
  { setDetailRowExpanded },
) => ({
  ...params,
  row: params.tableRow.row,
  expanded: isDetailRowExpanded(expandedRows, params.tableRow.rowId),
  onToggle: () => setDetailRowExpanded({ rowId: params.tableRow.rowId }),
});

const getDetailCellProps = ({ contentComponent, ...params }) => ({
  ...params,
  row: params.tableRow.row,
});

const getDetailRowProps = params => ({
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
      contentComponent: DetailContent,
      detailCellComponent: DetailToggleCell,
      cellComponent: DetailCell,
      rowComponent: DetailRow,
      toggleColumnWidth,
    } = this.props;

    const tableColumnsComputed = ({ tableColumns }) =>
      tableColumnsWithDetail(tableColumns, toggleColumnWidth);
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
                <DetailToggleCell {...getDetailToggleCellProps(params, getters, actions)} />
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
              {...getDetailCellProps(params)}
            >
              <DetailContent row={params.tableRow.row} />
            </DetailCell>
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isDetailTableRow(tableRow)}
        >
          {params => <DetailRow {...getDetailRowProps(params)} />}
        </Template>
      </PluginContainer>
    );
  }
}

TableRowDetail.propTypes = {
  contentComponent: PropTypes.func,
  detailCellComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  toggleColumnWidth: PropTypes.number.isRequired,
  rowHeight: PropTypes.number,
};

TableRowDetail.defaultProps = {
  contentComponent: () => null,
  rowHeight: undefined,
};
