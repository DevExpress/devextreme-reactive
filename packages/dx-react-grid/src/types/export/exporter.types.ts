import { Workbook, Cell, Worksheet } from 'exceljs';
import { Row, Column, SummaryItem, GroupSummaryItem } from '../index';
import { GridProps } from '../grid';
import { GroupingStateProps, TableGroupRowProps, TableGroupRow } from '../grouping';
import { SelectionStateProps } from '../selection';
import { TableProps } from '../tables';
import { FilteringStateProps } from '../filtering';
import { SortingStateProps } from '../sorting';

export type ExporterProps =
  Omit<GridProps, 'rootComponent'> &
  Pick<FilteringStateProps, 'filters'> &
  Pick<SortingStateProps, 'sorting'> &
  Pick<GroupingStateProps, 'grouping'> &
  Pick<TableGroupRowProps, 'showColumnsWhenGrouped'> &
  Pick<SelectionStateProps, 'selection'> &
  Pick<TableProps, 'columnExtensions'>
& {
  groupColumnExtensions?: TableGroupRow.ColumnExtension[],
  totalSummaryItems?: SummaryItem[],
  groupSummaryItems?: GroupSummaryItem[],
  onSave: (workbook: Workbook) => void;
  customizeCell?: (cell: Cell, row: Row, column: Column) => void;
  customizeSummaryCell?: (cell: Cell, row: Row, column: Column) => void;
  customizeHeader?: (worksheet: Worksheet) => void;
  customizeFooter?: (worksheet: Worksheet) => void;
};

/** @internal */
export type ExporterState = {
  isExporting: boolean;
};
