import React from 'react';
import { Getter, Template } from '@devexpress/dx-react-core';
import { setDetailRowExpanded, expandedDetailRows, isDetailRowExpanded } from '@devexpress/dx-datagrid-core';

export class TableRowDetail extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      expandedDetails: props.defaultExpandedDetails || [],
    };

    this._setDetailRowExpanded = ({ rowId }) => {
      const prevExpandedDetails = this.props.expandedDetails || this.state.expandedDetails;
      const expandedDetails = setDetailRowExpanded(prevExpandedDetails, { rowId });
      const { expandedDetailsChange } = this.props;
      this.setState({ expandedDetails });
      if (expandedDetailsChange) {
        expandedDetailsChange(expandedDetails);
      }
    };

    this._tableColumns = tableColumns => [{ type: 'detail', width: 29 }, ...tableColumns];
  }
  render() {
    const expandedDetails = this.props.expandedDetails || this.state.expandedDetails;
    const { rowHeight, template, detailToggleTemplate } = this.props;

    return (
      <div>
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
            expanded: isDetailRowExpanded(expandedDetails, getRowId(row)),
            toggleExpanded: () => this._setDetailRowExpanded({ rowId: getRowId(row) }),
          })}
        </Template>

        <Getter
          name="tableBodyRows"
          pureComputed={expandedDetailRows}
          connectArgs={getter => [
            getter('tableBodyRows'),
            expandedDetails,
            getter('getRowId'),
            rowHeight,
          ]}
        />
        <Template name="tableViewCell" predicate={({ row }) => row.type === 'detailRow'}>
          {({ row, ...params }) => template({ ...params, row: row.for })}
        </Template>
      </div>
    );
  }
}

TableRowDetail.propTypes = {
  expandedDetails: React.PropTypes.array,
  defaultExpandedDetails: React.PropTypes.array,
  expandedDetailsChange: React.PropTypes.func,
  template: React.PropTypes.func.isRequired,
  detailToggleTemplate: React.PropTypes.func.isRequired,
  rowHeight: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.oneOf(['auto']),
  ]),
};

TableRowDetail.defaultProps = {
  expandedDetails: undefined,
  defaultExpandedDetails: undefined,
  expandedDetailsChange: undefined,
  rowHeight: 'auto',
};
