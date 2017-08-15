import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, PluginContainer } from '@devexpress/dx-react-core';
import {
  tableRowsWithExpandedDetail,
  isDetailRowExpanded,
  tableColumnsWithDetail,
  isDetailToggleTableCell,
  isDetailTableRow,
} from '@devexpress/dx-grid-core';

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
      detailToggleCellWidth,
    } = this.props;

    return (
      <PluginContainer
        pluginName="TableRowDetail"
        dependencies={pluginDependencies}
      >
        <Getter
          name="tableColumns"
          pureComputed={tableColumnsWithDetail}
          connectArgs={getter => [
            getter('tableColumns'),
            detailToggleCellWidth,
          ]}
        />
        <Template
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) => isDetailToggleTableCell(tableRow, tableColumn)}
          connectGetters={getter => ({
            expandedRows: getter('expandedRows'),
          })}
          connectActions={action => ({
            setDetailRowExpanded: action('setDetailRowExpanded'),
          })}
        >
          {({
            expandedRows,
            setDetailRowExpanded,
            ...restParams
          }) => detailToggleCellTemplate({
            ...restParams,
            row: restParams.tableRow.row,
            expanded: isDetailRowExpanded(expandedRows, restParams.tableRow.rowId),
            toggleExpanded: () => setDetailRowExpanded({ rowId: restParams.tableRow.rowId }),
          })}
        </Template>

        <Getter
          name="tableBodyRows"
          pureComputed={tableRowsWithExpandedDetail}
          connectArgs={getter => [
            getter('tableBodyRows'),
            getter('expandedRows'),
            rowHeight,
          ]}
        />
        <Template name="tableViewCell" predicate={({ tableRow }) => isDetailTableRow(tableRow)}>
          {params => detailCellTemplate({
            ...params,
            row: params.tableRow.row,
            template: () => template({ row: params.tableRow.row }),
          })}
        </Template>
      </PluginContainer>
    );
  }
}

TableRowDetail.propTypes = {
  template: PropTypes.func,
  detailToggleCellTemplate: PropTypes.func.isRequired,
  detailCellTemplate: PropTypes.func.isRequired,
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
