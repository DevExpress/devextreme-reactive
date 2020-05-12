import * as React from 'react';
import { Workbook, Cell as ExcelCell, Worksheet, Row as ExcelRow } from 'exceljs';
/* tslint:disable no-submodule-imports */
import {
  SortingStateProps, GroupingStateProps, TableGroupRowProps, SelectionStateProps,
  TableProps, TableColumnVisibilityProps, TableGroupRow, FilteringStateProps,
  GridProps, GroupSummaryItem, SummaryItem, Column,
} from '@devexpress/dx-react-grid/dist/dx-react-grid';
import {
  CustomizeSummaryCellFn,
} from '../index';
/* tslint:enable no-submodule-imports */

export type ExporterProps =
  Omit<GridProps, 'rootComponent'> &
  Pick<FilteringStateProps, 'filters'> &
  Pick<SortingStateProps, 'sorting'> &
  Pick<GroupingStateProps, 'grouping'> &
  Pick<TableGroupRowProps, 'showColumnsWhenGrouped'> &
  Pick<SelectionStateProps, 'selection'> &
  Pick<TableProps, 'columnExtensions'> &
  Pick<TableColumnVisibilityProps, 'hiddenColumnNames'> &
{
  /** The column order. */
  columnOrder?: string[],
  /** Specifies additional properties for the columns used in grouping. */
  groupColumnExtensions?: TableGroupRow.ColumnExtension[],
  /** Total summary items. */
  totalSummaryItems?: SummaryItem[],
  /** Group summary items. */
  groupSummaryItems?: GroupSummaryItem[],
  /** A function that should save the Excel document. */
  onSave: (workbook: Workbook) => void;
  /** Customizes Excel cells. */
  customizeCell?: (cell: ExcelCell, row: ExcelRow, column: Column) => void;
  /** Customizes Excel cells that display summaries. */
  customizeSummaryCell?: CustomizeSummaryCellFn;
  /** Customizes the document's header. */
  customizeHeader?: (worksheet: Worksheet) => void;
  /** Customizes the document's footer. */
  customizeFooter?: (worksheet: Worksheet) => void;
  /** @internal */
  exportSelected: boolean;
  /** A reference to the GridExporter instance */
  ref?: React.RefObject<any>;
};

/** @internal */
export type ExporterState = {
  isExporting: boolean;
  selectedOnly: boolean;
};

export declare const GridExporter: React.ComponentType<ExporterProps> & {
  /** Initiates data export. */
  exportGrid: (options?: any) => void;
};
