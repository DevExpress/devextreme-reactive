import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, PluginContainer } from '@devexpress/dx-react-core';
import { setDetailRowExpanded, expandedDetailRows, isDetailRowExpanded } from '@devexpress/dx-grid-core';

export class TableRowDetail extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      expandedRows: props.defaultExpandedRows || [],
    };

    this._setDetailRowExpanded = ({ rowId }) => {
      const prevExpandedDetails = this.props.expandedRows || this.state.expandedRows;
      const expandedRows = setDetailRowExpanded(prevExpandedDetails, { rowId });
      const { onExpandedRowsChange } = this.props;
      this.setState({ expandedRows });
      if (onExpandedRowsChange) {
        onExpandedRowsChange(expandedRows);
      }
    };

    this._tableColumns = tableColumns => [{ type: 'detail', width: 25 }, ...tableColumns];
  }
  render() {
    const expandedRows = this.props.expandedRows || this.state.expandedRows;
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
          })}
        >
          {({ row, getRowId, ...restParams }) => detailToggleTemplate({
            ...restParams,
            expanded: isDetailRowExpanded(expandedRows, getRowId(row)),
            toggleExpanded: () => this._setDetailRowExpanded({ rowId: getRowId(row) }),
          })}
        </Template>

        <Getter
          name="tableBodyRows"
          pureComputed={expandedDetailRows}
          connectArgs={getter => [
            getter('tableBodyRows'),
            expandedRows,
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
  expandedRows: PropTypes.array,
  defaultExpandedRows: PropTypes.array,
  onExpandedRowsChange: PropTypes.func,
  template: PropTypes.func,
  detailToggleTemplate: PropTypes.func.isRequired,
  detailCellTemplate: PropTypes.func.isRequired,
  rowHeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['auto']),
  ]),
};

TableRowDetail.defaultProps = {
  expandedRows: undefined,
  defaultExpandedRows: undefined,
  onExpandedRowsChange: undefined,
  rowHeight: 'auto',
  template: undefined,
};
