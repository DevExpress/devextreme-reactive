import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, PluginContainer } from '@devexpress/dx-react-core';
import {
  getColumnSortingDirection,
  tableRowsWithHeading,
  isHeadingTableCell,
  isHeadingTableRow,
} from '@devexpress/dx-grid-core';

const tableHeaderRowsComputed = ({ tableHeaderRows }) => tableRowsWithHeading(tableHeaderRows);

export class TableHeaderRow extends React.PureComponent {
  render() {
    const {
      allowSorting,
      allowGroupingByClick,
      allowDragging,
      headerCellTemplate,
      headerRowTemplate,
    } = this.props;

    return (
      <PluginContainer
        pluginName="TableHeaderRow"
        dependencies={[
          { pluginName: 'TableView' },
          { pluginName: 'SortingState', optional: !allowSorting },
          { pluginName: 'GroupingState', optional: !allowGroupingByClick },
          { pluginName: 'DragDropContext', optional: !allowDragging },
        ]}
      >
        <Getter name="tableHeaderRows" computed={tableHeaderRowsComputed} />

        <Template
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) => isHeadingTableCell(tableRow, tableColumn)}
          connectGetters={(getter, { tableColumn: { column } }) => {
            const sorting = getter('sorting');
            const columns = getter('columns');
            const grouping = getter('grouping');

            const groupingSupported = grouping !== undefined &&
                grouping.length < columns.length - 1;

            const result = {
              sortingSupported: sorting !== undefined,
              groupingSupported,
              draggingSupported: !grouping || groupingSupported,
            };

            if (result.sortingSupported) {
              result.sortingDirection = getColumnSortingDirection(sorting, column.name);
            }

            if (result.draggingSupported) {
              result.dragPayload = [{ type: 'column', columnName: column.name }];
            }

            return result;
          }}
          connectActions={(action, { tableColumn: { column } }) => ({
            changeSortingDirection: ({ keepOther, cancel }) => action('setColumnSorting')({ columnName: column.name, keepOther, cancel }),
            groupByColumn: () => action('groupByColumn')({ columnName: column.name }),
          })}
        >
          {({
            sortingSupported,
            groupingSupported,
            draggingSupported,
            ...restParams
          }) => headerCellTemplate({
            ...restParams,
            allowSorting: allowSorting && sortingSupported,
            allowGroupingByClick: allowGroupingByClick && groupingSupported,
            allowDragging: allowDragging && draggingSupported,
            column: restParams.tableColumn.column,
          })}
        </Template>
        <Template
          name="tableViewRow"
          predicate={({ tableRow }) => isHeadingTableRow(tableRow)}
        >
          {params => headerRowTemplate(params)}
        </Template>
      </PluginContainer>
    );
  }
}

TableHeaderRow.propTypes = {
  allowSorting: PropTypes.bool,
  allowGroupingByClick: PropTypes.bool,
  allowDragging: PropTypes.bool,
  headerCellTemplate: PropTypes.func.isRequired,
  headerRowTemplate: PropTypes.func.isRequired,
};

TableHeaderRow.defaultProps = {
  allowSorting: false,
  allowGroupingByClick: false,
  allowDragging: false,
};
