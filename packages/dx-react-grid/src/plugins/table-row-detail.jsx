import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, PluginContainer } from '@devexpress/dx-react-core';
import { expandedDetailRows, isDetailRowExpanded } from '@devexpress/dx-grid-core';

export class TableRowDetail extends React.PureComponent {
  constructor(props) {
    super(props);

    this._tableColumns = tableColumns => [{ type: 'detail', width: 25 }, ...tableColumns];
  }
  render() {
    const { rowHeight, template, detailToggleTemplate, detailCellTemplate } = this.props;

    return (
      <PluginContainer>
        <Getter
          name="tableColumns"
          pureComputed={this._tableColumns}
          connectArgs={getter => [
            getter('tableColumns'),
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
            }) => detailToggleTemplate({
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
  detailToggleTemplate: PropTypes.func.isRequired,
  detailCellTemplate: PropTypes.func.isRequired,
  rowHeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['auto']),
  ]),
};

TableRowDetail.defaultProps = {
  rowHeight: 'auto',
  template: undefined,
};
