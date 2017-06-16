import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, PluginContainer } from '@devexpress/dx-react-core';
import { expandedDetailRows, isDetailRowExpanded, tableColumnsWithDetail } from '@devexpress/dx-grid-core';

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
          predicate={({ column, row }) => column.type === 'detail' && !row.type}
          connectGetters={getter => ({
            getRowId: getter('getRowId'),
            expandedRows: getter('expandedRows'),
          })}
          connectActions={action => ({
            setDetailRowExpanded: action('setDetailRowExpanded'),
          })}
        >
          {({
              row,
              getRowId,
              expandedRows,
              setDetailRowExpanded,
              ...restParams
            }) => detailToggleCellTemplate({
              ...restParams,
              expanded: isDetailRowExpanded(expandedRows, getRowId(row)),
              toggleExpanded: () => setDetailRowExpanded({ rowId: getRowId(row) }),
            })}
        </Template>

        <Getter
          name="tableBodyRows"
          pureComputed={expandedDetailRows}
          connectArgs={getter => [
            getter('tableBodyRows'),
            getter('expandedRows'),
            getter('getRowId'),
            rowHeight,
          ]}
        />
        <Template name="tableViewCell" predicate={({ row }) => row.type === 'detailRow'}>
          {({ row, ...params }) => detailCellTemplate({
            ...params,
            row: row.for,
            template: () => template({ row: row.for }),
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
