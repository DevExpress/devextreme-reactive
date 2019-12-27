import * as React from 'react';
import {
  Action, Actions, PluginHost, Getter, Template, TemplateConnector, Getters,
} from '@devexpress/dx-react-core';
import { cellValueGetter, GridColumnExtension, tableColumnsWithDataRows, rowIdGetter, tableColumnsWithGrouping } from '@devexpress/dx-grid-core';
import { IntegratedGrouping } from './integrated-grouping';
import { GroupingState } from './grouping-state';
import { SummaryState } from './summary-state';
import { IntegratedSummary } from './integrated-summary';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import { Table } from './table';
import { defaultSummaryMessages } from '../components/summary/table-summary-content';
import { MemoizedComputed, memoize } from '@devexpress/dx-core';
import { ShowColumnWhenGroupedGetterFn, ExporterProps } from '../types';
import { SelectionState } from './selection-state';

const ROOT_GROUP = '__root__';

const showColumnWhenGroupedGetter: ShowColumnWhenGroupedGetterFn = (
  showColumnsWhenGrouped, columnExtensions = [],
) => {
  const map = columnExtensions.reduce((acc, columnExtension) => {
    acc[columnExtension.columnName] = columnExtension.showWhenGrouped;
    return acc;
  }, {});

  return columnName => map[columnName] || showColumnsWhenGrouped;
};

const filterSelectedRows = (rows, getRowId, selection) => {
  const selectionSet = new Set<any>(selection);
  return rows.filter(row => selectionSet.has(getRowId(row)));
};

const exportHeader = (worksheet: Excel.Worksheet, columns) => {
  const cols = columns
    .map(({ column, width }) => ({ ...column, width: (width || 150) / 8 }))
    .map(({ name, title, width }) => ({
      key: name, width,
    }));
  worksheet.columns = cols;

  let { lastRow } = worksheet;
  if (lastRow) {
    worksheet.addRow({});
  }
  
  const r = columns.reduce((acc, { column: { name, title }}) => ({
    ...acc,
    [name]: title,
  }), {});
  worksheet.addRow(r);
  
  worksheet.views.push({
    state: 'frozen', ySplit: worksheet.lastRow!.number,
  });
};

const buildGroupTree = (allRows, outlineLevels, startIndex) => {
  const groupTree = { [ROOT_GROUP]: [] as any[] };
  const maxLevel = Object.keys(outlineLevels).length - 1;

  let parentChain = {};
  let lastDataIndex = 0;
  let openGroup = '';
  let index = startIndex;
  let level = 0;
  let prevLevel = 0;

  allRows.forEach((row) => {
    const { groupedBy, compoundKey } = row;
    if (groupedBy) {
      level = outlineLevels[groupedBy];
      if (level === 0) {
        groupTree[ROOT_GROUP].push(compoundKey);
      }
      groupTree[compoundKey] = [];
      parentChain[level] = compoundKey;
      if (0 < level && level <= maxLevel) {
        groupTree[parentChain[level - 1]].push(compoundKey);
      }
      if (level === maxLevel) {
        if (openGroup) {
          // close prev group
          groupTree[openGroup].push(lastDataIndex);
        }
        openGroup = compoundKey;
        let start = index + 1;
        if (lastDataIndex > 0) {
          start += 1;
          index += 1;
        }
        groupTree[compoundKey].push(start);
      } else if (level < prevLevel) {
        index += maxLevel - level;
      }
      prevLevel = level;
    } else {
      lastDataIndex = index;
    }
    index += 1;
  });

  // TODO: consider grouping instead
  if (Object.keys(groupTree).length === 1 && groupTree[ROOT_GROUP].length === 0) {
    groupTree[ROOT_GROUP] = [startIndex, startIndex + allRows.length - 1];
  }

  return groupTree;
};

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

      openGroups.slice(currentLevel).reverse().forEach(closeGroup); // close nested groups first

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
}

class GridExporterBase extends React.PureComponent<any, any> {
  tableColumnsComputed: MemoizedComputed<GridColumnExtension[], typeof tableColumnsWithDataRows>;

  constructor(props) {
    super(props);

    this.state = {
      isExporting: false,
    };

    this.tableColumnsComputed = memoize(
      (columnExtensions: GridColumnExtension[]) => ({
        columns,
      }) => tableColumnsWithDataRows(columns, columnExtensions),
    );
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
      }
      customizeSummaryCell(cell, column, summary);
    };

    const findRanges = (compoundKey, level, result) => {
      if (level !== maxLevel) {
        const ranges = groupTree[compoundKey].reduce((acc, range) => (
          [...acc, ...findRanges(range, level + 1, result)]
        ), []);
        return [...result, ...ranges];
      } else {
        return [...result, groupTree[compoundKey]];
      }
    };

    const closeGroup = (group) => {
      const { groupedBy, compoundKey } = group;
      if (!groupSummaryItems) return;

      worksheet.addRow({});
      worksheet.lastRow!.outlineLevel = outlineLevels[groupedBy] + 1;

      const ranges = findRanges(compoundKey, outlineLevels[groupedBy], []);

      groupSummaryItems.forEach((s) => {
        exportSummary(s, ranges)
      });
    };

    const closeSheet = () => {
      worksheet.addRow({});

      totalSummaryItems.forEach((s) => {
        exportSummary(s, findRanges(ROOT_GROUP, -1, []));
      });
    }

    // export work
    customizeHeader(worksheet);

    exportHeader(worksheet, columns);

    const groupTree = buildGroupTree(allRows, outlineLevels, worksheet.lastRow!.number + 1);
    // console.log('v3', groupTree)

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
      rows: propRows, columns: propColumns, getCellValue, getRowId,
      grouping, showColumnsWhenGrouped, /* filters, sorting, */ selection, totalSummaryItems,
      groupSummaryItems, columnExtensions,
    } = this.props;
    const { isExporting } = this.state;
    
    if (!isExporting) return null;
    
    const summaryExists = totalSummaryItems || groupSummaryItems;
    const useSelection = !!selection;
    const tableColumnsComputed = this.tableColumnsComputed(columnExtensions!);

    const tableColumnsWithGroupingComputed = ({
      columns, tableColumns, grouping, draftGrouping,
    }: Getters) => tableColumnsWithGrouping(
      columns,
      tableColumns,
      grouping,
      draftGrouping,
      0,
      showColumnWhenGroupedGetter(showColumnsWhenGrouped!, columnExtensions),
    );

    return (
      <PluginHost>
        <Getter name="rows" value={propRows} />
        <Getter name="getRowId" value={rowIdGetter(getRowId!, propRows)} />
        <Getter name="columns" value={propColumns} />
        <Getter name="getCellValue" value={cellValueGetter(getCellValue!, propColumns)} />
        <Getter name="tableColumns" computed={tableColumnsComputed} />
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
          <Getter name="tableColumns" computed={tableColumnsWithGroupingComputed} />
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
    )
  }
}

export const GridExporter: React.ComponentType<ExporterProps> = GridExporterBase;
