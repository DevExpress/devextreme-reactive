import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Getter, Template, Plugin, TemplateConnector, TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  getColumnSortingDirection,
  tableRowsWithHeading,
  isHeadingTableCell,
  isHeadingTableRow,
  TABLE_DATA_TYPE,
  TABLE_HEADING_TYPE,
} from '@devexpress/dx-grid-core';

const isRtlComputed = (({ isRtl }) => isRtl);
const tableHeaderRowsComputed = ({ tableHeaderRows }) => tableRowsWithHeading(tableHeaderRows);

export class TableHeaderRow extends React.PureComponent {
  render() {
    const {
      showSortingControls,
      showGroupingControls,
      cellComponent: HeaderCell,
      rowComponent: HeaderRow,
      contentComponent: Content,
      sortLabelComponent: SortLabel,
      groupButtonComponent: GroupButton,
      titleComponent: Title,
      messages,
    } = this.props;
    const getMessage = getMessagesFormatter(messages);

    return (
      <Plugin
        name="TableHeaderRow"
        dependencies={[
          { name: 'Table' },
          { name: 'SortingState', optional: !showSortingControls },
          { name: 'GroupingState', optional: !showGroupingControls },
          { name: 'DragDropProvider', optional: true },
          { name: 'TableColumnResizing', optional: true },
        ]}
      >
        <Getter name="isRtl" computed={isRtlComputed} />
        <Getter name="tableHeaderRows" computed={tableHeaderRowsComputed} />

        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => isHeadingTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {({
                isRtl, sorting, tableColumns, draggingEnabled, tableColumnResizingEnabled,
                isColumnSortingEnabled, isColumnGroupingEnabled,
              }, {
                changeColumnSorting, changeColumnGrouping,
                changeTableColumnWidth, draftTableColumnWidth, cancelTableColumnWidthDraft,
              }) => {
                const { name: columnName, title: columnTitle } = params.tableColumn.column;
                const atLeastOneDataColumn = tableColumns
                  .filter(({ type }) => type === TABLE_DATA_TYPE).length > 1;
                const sortingEnabled = isColumnSortingEnabled
                  && isColumnSortingEnabled(columnName);
                const groupingEnabled = isColumnGroupingEnabled
                  && isColumnGroupingEnabled(columnName)
                  && atLeastOneDataColumn;
                return (
                  <HeaderCell
                    {...params}
                    isRtl={isRtl}
                    column={params.tableColumn.column}
                    draggingEnabled={draggingEnabled && atLeastOneDataColumn}
                    resizingEnabled={tableColumnResizingEnabled}
                    onWidthChange={({ shift }) => changeTableColumnWidth({ columnName, shift })}
                    onWidthDraft={({ shift }) => draftTableColumnWidth({ columnName, shift })}
                    onWidthDraftCancel={() => cancelTableColumnWidthDraft()}
                    // @deprecated
                    sortingEnabled={sortingEnabled}
                    // @deprecated
                    groupingEnabled={groupingEnabled}
                    // @deprecated
                    showSortingControls={showSortingControls}
                    // @deprecated
                    showGroupingControls={showGroupingControls}
                    // @deprecated
                    sortingDirection={showSortingControls && sorting !== undefined
                      ? getColumnSortingDirection(sorting, columnName) : undefined}
                    // @deprecated
                    onSort={
                      ({ direction, keepOther }) => changeColumnSorting({
                        columnName, direction, keepOther,
                      })}
                    // @deprecated
                    onGroup={() => changeColumnGrouping({ columnName })}
                    // @deprecated
                    before={(
                      <TemplatePlaceholder
                        name="tableHeaderCellBefore"
                        params={{
                          column: params.tableColumn.column,
                        }}
                      />
                    )}
                  >
                    <TemplatePlaceholder
                      name="tableHeaderCellBefore"
                      params={{
                        column: params.tableColumn.column,
                      }}
                    />
                    <Content
                      column={params.tableColumn.column}
                      align={params.tableColumn.align}
                    >
                      {showSortingControls ? (
                        <SortLabel
                          column={params.tableColumn.column}
                          align={params.tableColumn.align}
                          direction={getColumnSortingDirection(sorting, columnName)}
                          disabled={!sortingEnabled}
                          onSort={({ direction, keepOther }) => {
                            changeColumnSorting({ columnName, direction, keepOther });
                          }}
                          getMessage={getMessage}
                        >
                          <Title>
                            {columnTitle || columnName}
                          </Title>
                        </SortLabel>
                      ) : (
                        <Title>
                          {columnTitle || columnName}
                        </Title>
                      )}
                    </Content>
                    {showGroupingControls ? (
                      <GroupButton
                        disabled={!groupingEnabled}
                        onGroup={() => changeColumnGrouping({ columnName })}
                      />
                    ) : null}
                  </HeaderCell>
                );
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isHeadingTableRow(tableRow)}
        >
          {params => <HeaderRow {...params} />}
        </Template>
      </Plugin>
    );
  }
}

TableHeaderRow.ROW_TYPE = TABLE_HEADING_TYPE;

TableHeaderRow.propTypes = {
  showSortingControls: PropTypes.bool,
  showGroupingControls: PropTypes.bool,
  cellComponent: PropTypes.func.isRequired,
  contentComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  titleComponent: PropTypes.func.isRequired,
  sortLabelComponent: PropTypes.func.isRequired,
  groupButtonComponent: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

TableHeaderRow.defaultProps = {
  showSortingControls: false,
  showGroupingControls: false,
  messages: null,
};

TableHeaderRow.components = {
  cellComponent: 'Cell',
  rowComponent: 'Row',
  contentComponent: 'Content',
  sortLabelComponent: 'SortLabel',
  titleComponent: 'Title',
  groupButtonComponent: 'GroupButton',
};
