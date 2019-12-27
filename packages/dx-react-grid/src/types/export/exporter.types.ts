import { Workbook, Cell, Worksheet } from "exceljs";
import { Row, Column } from "@devexpress/dx-grid-core"; //TODO: reexport in index
import { GridProps } from "../grid";
import { GroupingStateProps } from "../grouping";
import { SummaryStateProps } from "../summary";

export type ExporterProps = 
  Omit<GridProps, 'rootComponent'> &
  Pick<GroupingStateProps, 'grouping'> &
  SummaryStateProps
& {
  onSave: (workbook: Workbook) => void;
  customizeCell: (cell: Cell, row: Row, column: Column) => void;
  customizeSummaryCell: (cell: Cell, row: Row, column: Column) => void;
  customizeHeader: (worksheet: Worksheet) => void;
  customizeFooter: (worksheet: Worksheet) => void;
}
