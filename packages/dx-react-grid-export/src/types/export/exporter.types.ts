import { Workbook, Cell as ExcelCell, Worksheet, Row as ExcelRow } from 'exceljs';
/* tslint:disable no-submodule-imports */
import {
  SortingStateProps, GroupingStateProps, TableGroupRowProps, SelectionStateProps,
  TableProps, TableColumnVisibilityProps, TableGroupRow, FilteringStateProps,
  GridProps, SummaryItem, GroupSummaryItem, Column, CustomizeSummaryCellFn,
} from '@devexpress/dx-react-grid/dist/dx-react-grid';
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
  columnOrder?: string[],
  groupColumnExtensions?: TableGroupRow.ColumnExtension[],
  totalSummaryItems?: SummaryItem[],
  groupSummaryItems?: GroupSummaryItem[],
  onSave: (workbook: Workbook) => void;
  customizeCell?: (cell: ExcelCell, row: ExcelRow, column: Column) => void;
  customizeSummaryCell?: CustomizeSummaryCellFn;
  customizeHeader?: (worksheet: Worksheet) => void;
  customizeFooter?: (worksheet: Worksheet) => void;
};

/** @internal */
export type ExporterState = {
  isExporting: boolean;
};
