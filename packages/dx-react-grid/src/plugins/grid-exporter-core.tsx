import * as React from 'react';
import {
  Action, Actions, Plugin, Getter, Template, TemplateConnector, Getters,
} from '@devexpress/dx-react-core';
import {
  exportHeader, exportRows,
  closeGroupGetter, closeSheet, outlineLevels, rowsToExport, groupTree, exportSummaryGetter, maxGroupLevel, createWorkbook, createWorksheet,
} from '@devexpress/dx-grid-core';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import { IntegratedGrouping } from './integrated-grouping';
import { GroupingState } from './grouping-state';
import { SummaryState } from './summary-state';
import { IntegratedSummary } from './integrated-summary';
import { Table } from './table';
import { defaultSummaryMessages } from '../components/summary/table-summary-content';
import { ExporterProps } from '../types';
import { SelectionState } from './selection-state';
import {
  TableColumnsWithGrouping, TableColumnsWithDataRowsGetter, GridCoreGetters,
} from './internal';

const maxGroupLevelComputed = ({ grouping }: Getters) => maxGroupLevel(grouping);
const outlineLevelsComputed = ({ grouping }: Getters) => outlineLevels(grouping);
const rowsToExportComputed = ({
  rows, selection, getCollapsedRows, getRowId,
}: Getters) => rowsToExport(
  rows, selection, getCollapsedRows, getRowId,
);
const groupTreeComputed = ({
  rows, outlineLevels, grouping, isGroupRow, groupSummaryItems,
}: Getters) => groupTree(
  rows, outlineLevels, grouping, isGroupRow, groupSummaryItems,
);
const exportSummaryComputed = ({
  worksheet, columns, customizeSummaryCell,
}: Getters) => exportSummaryGetter(
  worksheet, columns, customizeSummaryCell, defaultSummaryMessages,
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
    const columns = tableColumns.filter(c => c.type === Table.COLUMN_TYPE)

    customizeHeader!(worksheet);

    exportHeader(worksheet, columns);
    const dataRowsOffset = worksheet.lastRow?.number + 1;

    exportRows(
      worksheet, rows, dataColumns, columns, isGroupRow, outlineLevels, dataRowsOffset,
      getCellValue, getCloseGroup, customizeCell!,
    );

    closeSheet(worksheet, groupTree, maxGroupLevel, dataRowsOffset, totalSummaryItems, exportSummary);

    customizeFooter!(worksheet);

    onSave(workbook);

    finishExport();
  }

  render() {
    const {
      rows: propRows, columns: propColumns, getCellValue, getRowId, columnExtensions,
      grouping, showColumnsWhenGrouped, groupColumnExtensions, /* filters, sorting, */
      selection, totalSummaryItems, groupSummaryItems, customizeSummaryCell,
    } = this.props;
    // const { isExporting } = this.state;
    // console.log('render', isExporting)

    // if (!isExporting) return null;

    const workbook = createWorkbook();
    const worksheet = createWorksheet(workbook);

    const summaryExists = totalSummaryItems || groupSummaryItems;
    const useGrouping = !!grouping?.length;
    const useSelection = !!selection;

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
        <Getter name="isExporting" value />

        {/* State */}
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

        {/* <Action name="finishExport" action={this.finishExport} /> */}
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
