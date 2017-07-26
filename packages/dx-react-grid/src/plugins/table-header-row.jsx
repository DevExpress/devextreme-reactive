import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, PluginContainer } from '@devexpress/dx-react-core';
import {
  getColumnSortingDirection,
  tableRowsWithHeading,
  isHeadingTableCell,
} from '@devexpress/dx-grid-core';

export class TableHeaderRow extends React.PureComponent {
  render() {
    const { allowSorting, allowGroupingByClick, allowDragging, headerCellTemplate } = this.props;

    return (
      <PluginContainer>
        <Getter
          name="tableHeaderRows"
          pureComputed={tableRowsWithHeading}
          connectArgs={getter => [
            getter('tableHeaderRows'),
          ]}
        />
        <Template
          name="tableViewCell"
          predicate={({ row, column }) => isHeadingTableCell(row, column)}
          connectGetters={(getter, { column: { original: column } }) => {
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

            return result;
          }}
          connectActions={(action, { column: { original: column } }) => ({
            changeSortingDirection: ({ keepOther, cancel }) => action('setColumnSorting')({ columnName: column.name, keepOther, cancel }),
            groupByColumn: () => action('groupByColumn')({ columnName: column.name }),
          })}
        >
          {({
            row,
            column: { original: column },
            sortingSupported,
            groupingSupported,
            draggingSupported,
            ...restParams
          }) => headerCellTemplate({
            column,
            allowSorting: allowSorting && sortingSupported,
            allowGroupingByClick: allowGroupingByClick && groupingSupported,
            allowDragging: allowDragging && draggingSupported,
            dragPayload: [{ type: 'column', columnName: column.name }],
            ...restParams,
          })}
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
};

TableHeaderRow.defaultProps = {
  allowSorting: false,
  allowGroupingByClick: false,
  allowDragging: false,
};
