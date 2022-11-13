import * as React from 'react';

import {
  Action, Actions, Plugin, Getter, Template, TemplateConnector, Getters,
} from '@devexpress/dx-react-core';
import {
  exportHeader, exportRows, closeGroupGetter, closeSheet, groupOutlineLevels, rowsToExport,
  buildGroupTree, exportSummaryGetter, maximumGroupLevel,
} from '@devexpress/dx-grid-core';
import {
  IntegratedGrouping, GroupingState, SummaryState, IntegratedSummary, Table, SelectionState,
  FilteringState, IntegratedFiltering, SortingState, IntegratedSorting,
  TableColumnsWithGrouping, TableColumnsWithDataRowsGetter,
  VisibleTableColumns, OrderedTableColumns, GridCoreGetters,
  defaultSummaryMessages,
} from '@devexpress/dx-react-grid';

import { createWorkbook, createWorksheet } from './helpers';
import { ExporterProps } from '../types';

const maxGroupLevelComputed = ({ grouping }: Getters) => maximumGroupLevel(grouping);
const outlineLevelsComputed = ({ grouping }: Getters) => groupOutlineLevels(grouping);
const rowsToExportComputed = ({
  rows, selection, grouping, getCollapsedRows, getRowId, isGroupRow,
}: Getters) => rowsToExport(
  rows, selection, grouping, getCollapsedRows, getRowId, isGroupRow,
);
const groupTreeComputed = ({
  rows, outlineLevels, grouping, isGroupRow, groupSummaryItems,
}: Getters) => buildGroupTree(
  rows, outlineLevels, grouping, isGroupRow, groupSummaryItems,
);
const exportSummaryComputed = ({
  worksheet, tableColumns, customizeSummaryCell,
}: Getters) => exportSummaryGetter(
  worksheet, tableColumns, customizeSummaryCell, defaultSummaryMessages,
);
const getCloseGroupComputed = ({
  worksheet, groupTree, outlineLevels, maxGroupLevel, groupSummaryItems, exportSummary,
}: Getters) => closeGroupGetter(
  worksheet, groupTree, outlineLevels, maxGroupLevel, groupSummaryItems, exportSummary,
);

export class GridExporterCore extends React.PureComponent<ExporterProps> {
  static defaultProps = {
    grouping: [],
    customizeHeader: () => {},
    customizeFooter: () => {},
    customizeCell: () => {},
    customizeSummaryCell: () => {},
  };

  performExport = (_: any,
    {
    tableColumns, columns: dataColumns, exportSummary, getCloseGroup,
    getCellValue, isGroupRow, rows, worksheet, workbook, maxGroupLevel,
    totalSummaryItems, outlineLevels, groupTree,
  }: Getters,
  {
    finishExport,
  }: Actions) => {
    const {
      onSave, customizeCell, customizeHeader, customizeFooter,
    } = this.props;
    const columns = tableColumns.filter(c => c.type === Table.COLUMN_TYPE);

    customizeHeader!(worksheet);

    exportHeader(worksheet, columns);
    const dataRowsOffset = worksheet.lastRow?.number + 1;

    exportRows(
      worksheet, rows, dataColumns, columns, isGroupRow, outlineLevels, dataRowsOffset,
      getCellValue, getCloseGroup, customizeCell!,
    );

    closeSheet(
      worksheet, groupTree, maxGroupLevel, dataRowsOffset, totalSummaryItems, exportSummary,
    );

    customizeFooter!(worksheet);

    onSave(workbook);

    finishExport();
  }

  render() {
    const {
      rows: propRows, columns: propColumns, getCellValue, getRowId, columnExtensions,
      columnOrder, hiddenColumnNames, grouping, showColumnsWhenGrouped, groupColumnExtensions,
      filters, sorting, selection, totalSummaryItems, groupSummaryItems, customizeSummaryCell,
      exportSelected,
    } = this.props;

    const workbook = createWorkbook();
    const worksheet = createWorksheet(workbook);

    const summaryExists = totalSummaryItems || groupSummaryItems;
    const useGrouping = !!grouping?.length;
    const useSelection = exportSelected && !!selection;
    const useFilters = !!filters;
    const useSorting = !!sorting;
    const useColumnOrder = !!columnOrder;
    const useColumnVisibility = !!hiddenColumnNames;

    return (
      <Plugin>
        <GridCoreGetters
          rows={propRows}
          columns={propColumns}
          getRowId={getRowId}
          getCellValue={getCellValue}
        />
        <TableColumnsWithDataRowsGetter
          columnExtensions={columnExtensions}
        />
        {useColumnVisibility && (
          <VisibleTableColumns hiddenColumnNames={hiddenColumnNames} />
        )}
        {useColumnOrder && (
          <OrderedTableColumns order={columnOrder} />
        )}
        <Getter name="isExporting" value />

        {/* State */}
        {useFilters && (
          <FilteringState filters={filters} />
        )}
        {useSorting && (
          <SortingState sorting={sorting} />
        )}
        {useGrouping && (
          <GroupingState grouping={grouping} />
        )}
        {summaryExists && (
          <SummaryState totalItems={totalSummaryItems} groupItems={groupSummaryItems} />
        )}
        {useSelection && (
          <SelectionState selection={selection} />
        )}

        {/* Integrated */}
        {useGrouping && (
          <TableColumnsWithGrouping
            columnExtensions={groupColumnExtensions}
            showColumnsWhenGrouped={showColumnsWhenGrouped}
          />
        )}
        {useFilters && (
          <IntegratedFiltering />
        )}
        {useSorting && (
          <IntegratedSorting />
        )}
        {useGrouping && (
          <IntegratedGrouping />
        )}
        {summaryExists && (
          <IntegratedSummary />
        )}

        <Getter name="customizeSummaryCell" value={customizeSummaryCell} />
        <Getter name="workbook" value={workbook} />
        <Getter name="worksheet" value={worksheet} />
        <Getter name="maxGroupLevel" computed={maxGroupLevelComputed} />
        <Getter name="outlineLevels" computed={outlineLevelsComputed} />
        <Getter name="rows" computed={rowsToExportComputed} />
        <Getter name="groupTree" computed={groupTreeComputed} />
        <Getter name="exportSummary" computed={exportSummaryComputed} />
        <Getter name="getCloseGroup" computed={getCloseGroupComputed} />

        <Action name="performExport" action={this.performExport} />
        <Template name="root">
          {() => (
            <TemplateConnector>
              {(_, { performExport }) => {
                performExport();
                return null;
              }}
            </TemplateConnector>
          )}
        </Template>
      </Plugin>
    );
  }
}
