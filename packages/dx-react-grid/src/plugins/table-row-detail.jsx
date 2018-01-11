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

const pluginDependencies = [
  { pluginName: 'Table' },
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
              {({ expandedRows }, { toggleDetailRowExpanded }) => (
                <ToggleCell
                  {...params}
                  row={params.tableRow.row}
                  expanded={isDetailRowExpanded(expandedRows, params.tableRow.rowId)}
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
            <Cell
              {...params}
              row={params.tableRow.row}
            >
              <Content row={params.tableRow.row} />
            </Cell>
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
      </PluginContainer>
    );
  }
}

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
