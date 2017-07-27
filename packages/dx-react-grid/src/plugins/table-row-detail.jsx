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
      <PluginContainer>
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
          predicate={({ column, row }) => isDetailToggleTableCell(row, column)}
          connectGetters={getter => ({
            expandedRows: getter('expandedRows'),
          })}
          connectActions={action => ({
            setDetailRowExpanded: action('setDetailRowExpanded'),
          })}
        >
          {({
            column,
            row,
            expandedRows,
            setDetailRowExpanded,
            ...restParams
          }) => detailToggleCellTemplate({
            ...restParams,
            row: row.original,
            expanded: isDetailRowExpanded(expandedRows, row.id),
            toggleExpanded: () => setDetailRowExpanded({ rowId: row.id }),
          })}
        </Template>

        <Getter
          name="tableBodyRows"
          pureComputed={tableRowsWithExpandedDetail}
          connectArgs={getter => [
            getter('tableBodyRows'),
            getter('expandedRows'),
            getter('getRowId'),
            rowHeight,
          ]}
        />
        <Template name="tableViewCell" predicate={({ row }) => isDetailTableRow(row)}>
          {({
            column,
            row: { original: row },
            ...params
          }) => detailCellTemplate({
            row,
            template: () => template({ row }),
            ...params,
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
