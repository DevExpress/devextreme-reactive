import * as React from 'react';
import {
  Action, Actions, PluginHost, Getter, Template, TemplateConnector, Getters,
} from '@devexpress/dx-react-core';
import { filterSelectedRows, exportHeader, ROOT_GROUP, buildGroupTree, findRanges } from '@devexpress/dx-grid-core';
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

const exportRows = (
  worksheet, allRows, dataColumns, columns, outlineLevels,
  getCellValue, closeGroup, customizeCell,
) => {
  let currentLevel = 0;
  let openGroups: any[] = [];

  allRows.forEach((row) => {
    let r;

    if (row.groupedBy) {
      currentLevel = outlineLevels[row.groupedBy];

      // close nested groups first
      openGroups.slice(currentLevel).reverse().forEach(closeGroup);

      openGroups = openGroups.slice(0, currentLevel);
      openGroups[currentLevel] = { groupedBy: row.groupedBy, compoundKey: row.compoundKey };

      // add group row 
      const title = dataColumns.find(({ name }) => name === row.groupedBy).title;
      r = { [columns[0].column.name]: `${title}: ${row.value}` };
      
      worksheet.addRow(r);
      const lastIndex = worksheet.lastRow!.number;

      // merge into single cell
      worksheet.mergeCells(lastIndex, 1, lastIndex, columns.length);
      worksheet.lastRow!.getCell(1).font = { bold: true };

      if (currentLevel > 0) {
        worksheet.lastRow!.outlineLevel = currentLevel;
      }
      currentLevel += 1;
    } else {
      r = columns.reduce((acc, { column: { name }}) => ({
        ...acc,
        [name]: getCellValue(row, name),
      }), {});
      worksheet.addRow(r);
      worksheet.lastRow!.outlineLevel = currentLevel;
    }

    worksheet.lastRow!.eachCell((cell, colNumber) => {
      customizeCell(cell, row, columns[colNumber - 1].column);
    });
  });

  openGroups.reverse().forEach(closeGroup)
}

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
    getCellValue, grouping, rows, getCollapsedRows, selection,
    groupSummaryItems, groupSummaryValues, totalSummaryItems, totalSummaryValues,
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
    const outlineLevels = grouping?.reduce((acc, { columnName }, index) => ({ ...acc, [columnName]: index }), {});
    const maxLevel = grouping?.length - 1;

    const expandRows = rows =>
      rows.reduce((acc, row) => (
        [...acc, row, ...(expandRows(getCollapsedRows(row) || []))]
      ), []
    );

    let allRows = expandRows(rows);
    if (!!selection) {
      allRows = filterSelectedRows(rows, getRowId, selection);
    }

    const operations = {
      count: 'COUNTA',
    };

    const exportSummary = ({ columnName, type }, ranges) => {
      const row = worksheet.lastRow!;
      const letter = worksheet.getColumn(columnName).letter;
      const operation = operations[type] || type.toUpperCase();
      const rangesStr = ranges.map(range => (
        range
          .map(r => `${letter}${r}`)
          .filter((val, index, arr) => arr.indexOf(val) === index)
          .join(':')
      )).join(',');

      const cell = row.getCell(columnName);
      cell.value = {
        formula: `${operation}(${rangesStr})`,
        date1904: false,
      };
      cell.numFmt = `"${defaultSummaryMessages[type]}:" 0`;

      const column = dataColumns.find(({ name }) => name === columnName);
      const summary = {
        type,
        ranges,
      };
      customizeSummaryCell(cell, column, summary);
    };

    const closeGroup = (group) => {
      const { groupedBy, compoundKey } = group;
      if (!groupSummaryItems) return;

      worksheet.addRow({});
      worksheet.lastRow!.outlineLevel = outlineLevels[groupedBy] + 1;

      const ranges = findRanges(groupTree, compoundKey, outlineLevels[groupedBy], maxLevel, []);

      groupSummaryItems.forEach((s) => {
        exportSummary(s, ranges)
      });
    };

    const closeSheet = () => {
      worksheet.addRow({});

      totalSummaryItems.forEach((s) => {
        exportSummary(s, findRanges(groupTree, ROOT_GROUP, -1, maxLevel, []));
      });
    };

    // export work
    customizeHeader(worksheet);

    exportHeader(worksheet, columns);

    const groupTree = buildGroupTree(allRows, outlineLevels, worksheet.lastRow!.number + 1);

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
