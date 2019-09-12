import { Workbook, Cell } from "exceljs";
import { Row, Column } from "@devexpress/dx-grid-core"; //TODO: reexport in index

export interface ExporterProps {
  onSave: (workbook: Workbook) => void;
  customizeCell: (cell: Cell, row: Row, column: Column) => void;
}
