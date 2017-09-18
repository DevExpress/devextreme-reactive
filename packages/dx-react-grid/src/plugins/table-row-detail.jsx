import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter, Template, PluginContainer,
  TemplateConnector, TemplateRenderer,
} from '@devexpress/dx-react-core';
import {
  tableRowsWithExpandedDetail,
  isDetailRowExpanded,
  tableColumnsWithDetail,
  isDetailToggleTableCell,
  isDetailTableRow,
} from '@devexpress/dx-grid-core';

const getDetailToggleTableCellTemplateArgs = (
  params,
  { expandedRows },
  { setDetailRowExpanded },
) => ({
  ...params,
  row: params.tableRow.row,
  expanded: isDetailRowExpanded(expandedRows, params.tableRow.rowId),
  toggleExpanded: () => setDetailRowExpanded({ rowId: params.tableRow.rowId }),
});

const getDetailTableCellTemplateArgs = (
  { template, ...params },
) => ({
  ...params,
  row: params.tableRow.row,
  template: () => template({ row: params.tableRow.row }),
});

const getDetailTableRowTemplateArgs = params => ({
  ...params,
  row: params.tableRow.row,
});

const pluginDependencies = [
  { pluginName: 'TableView' },
];

export class TableRowDetail extends React.PureComponent {
  render() {
    const {
      rowHeight,
      template,
      detailToggleCellTemplate,
      detailCellTemplate,
      detailRowTemplate,
      detailToggleCellWidth,
    } = this.props;

    const tableColumnsComputed = ({ tableColumns }) =>
      tableColumnsWithDetail(tableColumns, detailToggleCellWidth);
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
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) => isDetailToggleTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {(getters, actions) => (
                <TemplateRenderer
                  template={detailToggleCellTemplate}
                  params={getDetailToggleTableCellTemplateArgs(params, getters, actions)}
                />
              )}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ tableRow }) => isDetailTableRow(tableRow)}
        >
          {params => (
            <TemplateRenderer
              template={detailCellTemplate}
              params={getDetailTableCellTemplateArgs({ template, ...params })}
            />
          )}
        </Template>
        <Template
          name="tableViewRow"
          predicate={({ tableRow }) => isDetailTableRow(tableRow)}
        >
          {params => (
            <TemplateConnector>
              {() => (
                <TemplateRenderer
                  template={detailRowTemplate}
                  params={getDetailTableRowTemplateArgs(params)}
                />
              )}
            </TemplateConnector>
          )}
        </Template>
      </PluginContainer>
    );
  }
}

TableRowDetail.propTypes = {
  template: PropTypes.func,
  detailToggleCellTemplate: PropTypes.func.isRequired,
  detailCellTemplate: PropTypes.func.isRequired,
  detailRowTemplate: PropTypes.func.isRequired,
  detailToggleCellWidth: PropTypes.number.isRequired,
  rowHeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['auto']),
  ]),
};

TableRowDetail.defaultProps = {
  rowHeight: 'auto',
  template: undefined,
};
