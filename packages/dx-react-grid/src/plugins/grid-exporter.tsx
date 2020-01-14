import * as React from 'react';
import {
  Action, Actions, PluginHost, Getter, Template, TemplateConnector, Getters,
} from '@devexpress/dx-react-core';
import {
  exportHeader, ROOT_GROUP, buildGroupTree, findRanges, exportRows, getExportSummary,
  getCloseGroup, getOutlineLevels, getRowsToExport,
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

class GridExporterBase extends React.PureComponent<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      isExporting: false,
    };
  }

  performExport = (_: any, 
    {
    tableColumns, columns: dataColumns, getRowId,
    getCellValue, grouping, isGroupRow, rows, getCollapsedRows, selection,
    groupSummaryItems, totalSummaryItems,
  }: Getters,
  {
    finishExport,
  }: Actions) => {
    const columns = tableColumns.filter(c => c.type === Table.COLUMN_TYPE)

    const {
      onSave, customizeCell, customizeSummaryCell, customizeHeader, customizeFooter,
    } = this.props;
    const workbook: Excel.Workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Main');
    const outlineLevels = getOutlineLevels(grouping);
    const maxLevel = grouping?.length - 1;
    const allRows = getRowsToExport(rows, selection, getCollapsedRows, getRowId);

    const groupTree = buildGroupTree(
      allRows, outlineLevels, grouping, isGroupRow, groupSummaryItems, worksheet.lastRow!.number + 1
    );

    const exportSummary = getExportSummary(
      worksheet, dataColumns, customizeSummaryCell, defaultSummaryMessages,
    );
    const closeGroup = getCloseGroup(
      worksheet, groupTree, outlineLevels, maxLevel, groupSummaryItems, exportSummary,
    );

    const closeSheet = () => {
      worksheet.addRow({});

      totalSummaryItems.forEach((s) => {
        exportSummary(s, findRanges(groupTree, ROOT_GROUP, -1, maxLevel));
      });
    };

    // export routine
    customizeHeader(worksheet);

    exportHeader(worksheet, columns);

    exportRows(
      worksheet, allRows, dataColumns, columns, outlineLevels,
      getCellValue, closeGroup, customizeCell,
    );

    closeSheet();

    customizeFooter(worksheet);

    onSave(workbook);

    finishExport();
  }

  exportGrid = () => {
    this.setState({ isExporting: true });
  }

  finishExport = () => {
    this.setState({ isExporting: false });
  }

  render() {
    const {
      rows: propRows, columns: propColumns, getCellValue, getRowId, columnExtensions,
      grouping, showColumnsWhenGrouped, groupColumnExtensions, /* filters, sorting, */
      selection, totalSummaryItems, groupSummaryItems,
    } = this.props;
    const { isExporting } = this.state;

    if (!isExporting) return null;

    const summaryExists = totalSummaryItems || groupSummaryItems;
    const useSelection = !!selection;

    return (
      <PluginHost>
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
        {grouping && (
          <GroupingState grouping={grouping} />
        )}
        {summaryExists && (
          <SummaryState totalItems={totalSummaryItems} groupItems={groupSummaryItems} />
        )}
        {useSelection && (
          <SelectionState selection={selection} />
        )}

        {/* Integrated */}
        {grouping && (
          <TableColumnsWithGrouping
            columnExtensions={groupColumnExtensions}
            showColumnsWhenGrouped={showColumnsWhenGrouped}
          />
        )}
        {grouping && (
          <IntegratedGrouping />
        )}
        {summaryExists && (
          <IntegratedSummary />
        )}

        <Action name="finishExport" action={this.finishExport} />
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
      </PluginHost>
    );
  }
}

export const GridExporter: React.ComponentType<ExporterProps> = GridExporterBase;
