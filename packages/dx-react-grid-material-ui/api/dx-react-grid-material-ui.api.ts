// @public (undocumented)
namespace ColumnChooser {
  type OverlayProps = ColumnChooser_2.OverlayProps;
}

// @public (undocumented)
namespace ColumnChooser {
  type ToggleButtonProps = ColumnChooser_2.ToggleButtonProps;
}

// @public (undocumented)
namespace ColumnChooser {
  type ContainerProps = ColumnChooser_2.ContainerProps;
}

// @public (undocumented)
namespace ColumnChooser {
  type ItemProps = ColumnChooser_2.ItemProps;
}

// @public
declare const ColumnChooser: React.ComponentType<ColumnChooserProps> & {
  ToggleButton: React.ComponentType<ColumnChooser_2.ToggleButtonProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Overlay: React.ComponentType<ColumnChooser_2.OverlayProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Container: React.ComponentType<ColumnChooser_2.ContainerProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Item: React.ComponentType<ColumnChooser_2.ItemProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface ColumnChooserProps {
  containerComponent?: React.ComponentType<ColumnChooser_2.ContainerProps>;
  itemComponent?: React.ComponentType<ColumnChooser_2.ItemProps>;
  messages?: ColumnChooser_2.LocalizationMessages;
  overlayComponent?: React.ComponentType<ColumnChooser_2.OverlayProps>;
  toggleButtonComponent?: React.ComponentType<ColumnChooser_2.ToggleButtonProps>;
}

// @public (undocumented)
namespace DragDropProvider {
  type ContainerProps = DragDropProvider_2.ContainerProps;
}

// @public (undocumented)
namespace DragDropProvider {
  type ColumnProps = DragDropProvider_2.ColumnProps;
}

// @public
declare const DragDropProvider: React.ComponentType<DragDropProviderProps> & {
  Container: React.ComponentType<DragDropProvider_2.ContainerProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Column: React.ComponentType<DragDropProvider_2.ColumnProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface DragDropProviderProps {
  columnComponent?: React.ComponentType<DragDropProvider_2.ColumnProps>;
  containerComponent?: React.ComponentType<DragDropProvider_2.ContainerProps>;
}

// @public (undocumented)
namespace Grid {
  type RootProps = Grid_2.RootProps;
}

// @public
declare const Grid: React.ComponentType<GridProps> & {
  Root: React.ComponentType<Grid_2.RootProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface GridProps {
  columns: Array<Column>;
  getCellValue?: (row: any, columnName: string) => any;
  getRowId?: (row: any) => number | string;
  rootComponent?: React.ComponentType<Grid_2.RootProps>;
  rows: Array<any>;
}

// @public (undocumented)
namespace GroupingPanel {
  type ContainerProps = GroupingPanel_2.ContainerProps;
}

// @public (undocumented)
namespace GroupingPanel {
  type ItemProps = GroupingPanel_2.ItemProps;
}

// @public (undocumented)
namespace GroupingPanel {
  type EmptyMessageProps = GroupingPanel_2.EmptyMessageProps;
}

// @public
declare const GroupingPanel: React.ComponentType<GroupingPanelProps> & {
  Container: React.ComponentType<GroupingPanel_2.ContainerProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Item: React.ComponentType<GroupingPanel_2.ItemProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  EmptyMessage: React.ComponentType<GroupingPanel_2.EmptyMessageProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface GroupingPanelProps {
  containerComponent?: React.ComponentType<GroupingPanel_2.ContainerProps>;
  emptyMessageComponent?: React.ComponentType<GroupingPanel_2.EmptyMessageProps>;
  itemComponent?: React.ComponentType<GroupingPanel_2.ItemProps>;
  messages?: GroupingPanel_2.LocalizationMessages;
  showGroupingControls?: boolean;
  showSortingControls?: boolean;
}

// @public (undocumented)
namespace PagingPanel {
  type ContainerProps = PagingPanel_2.ContainerProps;
}

// @public
declare const PagingPanel: React.ComponentType<PagingPanelProps> & {
  Container: React.ComponentType<PagingPanel_2.ContainerProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface PagingPanelProps {
  containerComponent?: React.ComponentType<PagingPanel_2.ContainerProps>;
  messages?: PagingPanel_2.LocalizationMessages;
  pageSizes?: Array<number>;
}

// @public (undocumented)
namespace SearchPanel {
  type InputProps = SearchPanel_2.InputProps;
}

// @public
declare const SearchPanel: React.ComponentType<SearchPanelProps> & {
  Input: React.ComponentType<SearchPanel_2.InputProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface SearchPanelProps {
  inputComponent?: React.ComponentType<SearchPanel_2.InputProps>;
  messages?: SearchPanel_2.LocalizationMessages;
}

// @public (undocumented)
namespace Table {
  type ColumnExtension = Table_2.ColumnExtension;
}

// @public (undocumented)
namespace Table {
  type CellProps = Table_2.CellProps;
}

// @public (undocumented)
namespace Table {
  type DataCellProps = Table_2.DataCellProps;
}

// @public (undocumented)
namespace Table {
  type NoDataCellProps = Table_2.NoDataCellProps;
}

// @public (undocumented)
namespace Table {
  type RowProps = Table_2.RowProps;
}

// @public (undocumented)
namespace Table {
  type DataRowProps = Table_2.DataRowProps;
}

// @public
declare const Table: React.ComponentType<TableProps> & {
  COLUMN_TYPE: symbol;
  ROW_TYPE: symbol;
  NODATA_ROW_TYPE: symbol;
} & {
  Table: React.ComponentType<object & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  TableHead: React.ComponentType<object & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  TableBody: React.ComponentType<object & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Container: React.ComponentType<object & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Cell: React.ComponentType<Table_2.DataCellProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Row: React.ComponentType<Table_2.DataRowProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  NoDataCell: React.ComponentType<Table_2.NoDataCellProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  NoDataRow: React.ComponentType<Table_2.RowProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  StubRow: React.ComponentType<Table_2.RowProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  StubCell: React.ComponentType<Table_2.CellProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  StubHeaderCell: React.ComponentType<Table_2.CellProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
namespace TableBandHeader {
  type CellProps = TableBandHeader_2.CellProps;
}

// @public (undocumented)
namespace TableBandHeader {
  type ColumnBands = TableBandHeader_2.ColumnBands;
}

// @public
declare const TableBandHeader: React.ComponentType<TableBandHeaderProps> & {
  ROW_TYPE: symbol;
} & {
  Cell: React.ComponentType<React.ComponentType<Table_2.CellProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Row: React.ComponentType<React.ComponentType<Table_2.RowProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface TableBandHeaderProps {
  cellComponent?: React.ComponentType<TableBandHeader_2.CellProps>;
  columnBands?: Array<TableBandHeader_2.ColumnBands>;
  rowComponent?: React.ComponentType<Table_2.RowProps>;
}

// @public
declare const TableColumnReordering: React.ComponentType<TableColumnReorderingProps>;

// @public (undocumented)
interface TableColumnReorderingProps {
  defaultOrder?: Array<string>;
  onOrderChange?: (nextOrder: Array<string>) => void;
  order?: Array<string>;
}

// @public
declare const TableColumnResizing: React.ComponentType<TableColumnResizingProps>;

// @public (undocumented)
interface TableColumnResizingProps {
  columnWidths?: Array<TableColumnWidthInfo>;
  defaultColumnWidths?: Array<TableColumnWidthInfo>;
  minColumnWidth?: number;
  onColumnWidthsChange?: (nextColumnWidths: Array<TableColumnWidthInfo>) => void;
}

// @public (undocumented)
namespace TableColumnVisibility {
  type EmptyMessageProps = TableColumnVisibility_2.EmptyMessageProps;
}

// @public (undocumented)
namespace TableColumnVisibility {
  type ColumnExtension = TableColumnVisibility_2.ColumnExtension;
}

// @public
declare const TableColumnVisibility: React.ComponentType<TableColumnVisibilityProps> & {
  EmptyMessage: React.ComponentType<TableColumnVisibility_2.EmptyMessageProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface TableColumnVisibilityProps {
  columnExtensions?: Array<TableColumnVisibility_2.ColumnExtension>;
  columnTogglingEnabled?: boolean;
  defaultHiddenColumnNames?: Array<string>;
  emptyMessageComponent?: React.ComponentType<TableColumnVisibility_2.EmptyMessageProps>;
  hiddenColumnNames?: Array<string>;
  messages?: TableColumnVisibility_2.LocalizationMessages;
  onHiddenColumnNamesChange?: (hiddenColumnNames: Array<string>) => void;
}

// @public (undocumented)
namespace TableEditColumn {
  type CellProps = TableEditColumn_2.CellProps;
}

// @public (undocumented)
namespace TableEditColumn {
  type HeaderCellProps = TableEditColumn_2.HeaderCellProps;
}

// @public (undocumented)
namespace TableEditColumn {
  type CommandProps = TableEditColumn_2.CommandProps;
}

// @public
declare const TableEditColumn: React.ComponentType<TableEditColumnProps> & {
  COLUMN_TYPE: symbol;
} & {
  Command: React.ComponentType<TableEditColumn_2.CommandProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Cell: React.ComponentType<TableEditColumn_2.CellProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  HeaderCell: React.ComponentType<TableEditColumn_2.HeaderCellProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface TableEditColumnProps {
  cellComponent?: React.ComponentType<TableEditColumn_2.CellProps>;
  commandComponent?: React.ComponentType<TableEditColumn_2.CommandProps>;
  headerCellComponent?: React.ComponentType<TableEditColumn_2.HeaderCellProps>;
  messages?: TableEditColumn_2.LocalizationMessages;
  showAddCommand?: boolean;
  showDeleteCommand?: boolean;
  showEditCommand?: boolean;
  width?: number | string;
}

// @public (undocumented)
namespace TableEditRow {
  type CellProps = TableEditRow_2.CellProps;
}

// @public (undocumented)
namespace TableEditRow {
  type RowProps = TableEditRow_2.RowProps;
}

// @public
declare const TableEditRow: React.ComponentType<TableEditRowProps> & {
  ADDED_ROW_TYPE: symbol;
  EDIT_ROW_TYPE: symbol;
} & {
  Cell: React.ComponentType<TableEditRow_2.CellProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Row: React.ComponentType<TableEditRow_2.RowProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface TableEditRowProps {
  cellComponent?: React.ComponentType<TableEditRow_2.CellProps>;
  rowComponent?: React.ComponentType<TableEditRow_2.RowProps>;
  rowHeight?: number;
}

// @public (undocumented)
namespace TableFilterRow {
  type CellProps = TableFilterRow_2.CellProps;
}

// @public (undocumented)
namespace TableFilterRow {
  type FilterSelectorProps = TableFilterRow_2.FilterSelectorProps;
}

// @public (undocumented)
namespace TableFilterRow {
  type IconProps = TableFilterRow_2.IconProps;
}

// @public (undocumented)
namespace TableFilterRow {
  type EditorProps = TableFilterRow_2.EditorProps;
}

// @public (undocumented)
namespace TableFilterRow {
  type ToggleButtonProps = TableFilterRow_2.ToggleButtonProps;
}

// @public
declare const TableFilterRow: React.ComponentType<TableFilterRowProps> & {
  ROW_TYPE: symbol;
} & {
  Cell: React.ComponentType<TableFilterRow_2.CellProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Row: React.ComponentType<Table_2.RowProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  FilterSelector: React.ComponentType<TableFilterRow_2.FilterSelectorProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Icon: React.ComponentType<TableFilterRow_2.IconProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Editor: React.ComponentType<TableFilterRow_2.EditorProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  ToggleButton: React.ComponentType<TableFilterRow_2.ToggleButtonProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface TableFilterRowProps {
  cellComponent?: React.ComponentType<TableFilterRow_2.CellProps>;
  editorComponent?: React.ComponentType<TableFilterRow_2.EditorProps>;
  filterSelectorComponent?: React.ComponentType<TableFilterRow_2.FilterSelectorProps>;
  iconComponent?: React.ComponentType<TableFilterRow_2.IconProps>;
  messages?: TableFilterRow_2.LocalizationMessages;
  rowComponent?: React.ComponentType<Table_2.RowProps>;
  rowHeight?: number;
  showFilterSelector?: boolean;
  toggleButtonComponent?: React.ComponentType<TableFilterRow_2.ToggleButtonProps>;
}

// @public (undocumented)
namespace TableFixedColumns {
  type CellProps = TableFixedColumns_2.CellProps;
}

// @public
declare const TableFixedColumns: React.ComponentType<TableFixedColumnsProps> & {
  Cell: React.ComponentType<TableFixedColumns_2.CellProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface TableFixedColumnsProps {
  cellComponent?: React.ComponentType<TableFixedColumns_2.CellProps>;
  leftColumns?: Array<string | symbol>;
  rightColumns?: Array<string | symbol>;
}

// @public (undocumented)
namespace TableGroupRow {
  type ColumnExtension = TableGroupRow_2.ColumnExtension;
}

// @public (undocumented)
namespace TableGroupRow {
  type CellProps = TableGroupRow_2.CellProps;
}

// @public (undocumented)
namespace TableGroupRow {
  type RowProps = TableGroupRow_2.RowProps;
}

// @public (undocumented)
namespace TableGroupRow {
  type ContentProps = TableGroupRow_2.ContentProps;
}

// @public (undocumented)
namespace TableGroupRow {
  type IconProps = TableGroupRow_2.IconProps;
}

// @public (undocumented)
namespace TableGroupRow {
  type IndentCellProps = TableGroupRow_2.IndentCellProps;
}

// @public
declare const TableGroupRow: React.ComponentType<TableGroupRowProps> & {
  COLUMN_TYPE: symbol;
  ROW_TYPE: symbol;
} & {
  Row: React.ComponentType<TableGroupRow_2.RowProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Cell: React.ComponentType<TableGroupRow_2.CellProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Content: React.ComponentType<TableGroupRow_2.ContentProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Icon: React.ComponentType<TableGroupRow_2.IconProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface TableGroupRowProps {
  cellComponent?: React.ComponentType<TableGroupRow_2.CellProps>;
  columnExtensions?: Array<TableGroupRow_2.ColumnExtension>;
  contentComponent?: React.ComponentType<TableGroupRow_2.ContentProps>;
  iconComponent?: React.ComponentType<TableGroupRow_2.IconProps>;
  indentCellComponent?: React.ComponentType<TableGroupRow_2.IndentCellProps>;
  indentColumnWidth?: number;
  rowComponent?: React.ComponentType<TableGroupRow_2.RowProps>;
  showColumnsWhenGrouped?: boolean;
}

// @public (undocumented)
namespace TableHeaderRow {
  type CellProps = TableHeaderRow_2.CellProps;
}

// @public (undocumented)
namespace TableHeaderRow {
  type SortLabelProps = TableHeaderRow_2.SortLabelProps;
}

// @public (undocumented)
namespace TableHeaderRow {
  type ContentProps = TableHeaderRow_2.ContentProps;
}

// @public (undocumented)
namespace TableHeaderRow {
  type GroupButtonProps = TableHeaderRow_2.GroupButtonProps;
}

// @public
declare const TableHeaderRow: React.ComponentType<TableHeaderRowProps> & {
  ROW_TYPE: symbol;
} & {
  Row: React.ComponentType<Table_2.RowProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Cell: React.ComponentType<TableHeaderRow_2.CellProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Content: React.ComponentType<TableHeaderRow_2.ContentProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  SortLabel: React.ComponentType<TableHeaderRow_2.SortLabelProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Title: React.ComponentType<object & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  GroupButton: React.ComponentType<TableHeaderRow_2.GroupButtonProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface TableHeaderRowProps {
  cellComponent?: React.ComponentType<TableHeaderRow_2.CellProps>;
  contentComponent?: React.ComponentType<TableHeaderRow_2.ContentProps>;
  groupButtonComponent?: React.ComponentType<TableHeaderRow_2.GroupButtonProps>;
  messages?: TableHeaderRow_2.LocalizationMessages;
  rowComponent?: React.ComponentType<Table_2.RowProps>;
  showGroupingControls?: boolean;
  showSortingControls?: boolean;
  sortLabelComponent?: React.ComponentType<TableHeaderRow_2.SortLabelProps>;
  titleComponent?: React.ComponentType<object>;
}

// @public (undocumented)
interface TableProps {
  bodyComponent?: React.ComponentType<object>;
  cellComponent?: React.ComponentType<Table_2.DataCellProps>;
  columnExtensions?: Array<Table_2.ColumnExtension>;
  containerComponent?: React.ComponentType<object>;
  footerComponent?: React.ComponentType<object>;
  headComponent?: React.ComponentType<object>;
  messages?: Table_2.LocalizationMessages;
  noDataCellComponent?: React.ComponentType<Table_2.NoDataCellProps>;
  noDataRowComponent?: React.ComponentType<Table_2.RowProps>;
  rowComponent?: React.ComponentType<Table_2.DataRowProps>;
  stubCellComponent?: React.ComponentType<Table_2.CellProps>;
  stubHeaderCellComponent?: React.ComponentType<Table_2.CellProps>;
  stubRowComponent?: React.ComponentType<Table_2.RowProps>;
  tableComponent?: React.ComponentType<object>;
}

// @public (undocumented)
namespace TableRowDetail {
  type ContentProps = TableRowDetail_2.ContentProps;
}

// @public (undocumented)
namespace TableRowDetail {
  type CellProps = TableRowDetail_2.CellProps;
}

// @public (undocumented)
namespace TableRowDetail {
  type RowProps = TableRowDetail_2.RowProps;
}

// @public (undocumented)
namespace TableRowDetail {
  type ToggleCellProps = TableRowDetail_2.ToggleCellProps;
}

// @public
declare const TableRowDetail: React.ComponentType<TableRowDetailProps> & {
  COLUMN_TYPE: symbol;
  ROW_TYPE: symbol;
} & {
  Cell: React.ComponentType<TableRowDetail_2.CellProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Row: React.ComponentType<TableRowDetail_2.RowProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  ToggleCell: React.ComponentType<TableRowDetail_2.ToggleCellProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface TableRowDetailProps {
  cellComponent?: React.ComponentType<TableRowDetail_2.CellProps>;
  contentComponent?: React.ComponentType<TableRowDetail_2.ContentProps>;
  rowComponent?: React.ComponentType<TableRowDetail_2.RowProps>;
  rowHeight?: number;
  toggleCellComponent?: React.ComponentType<TableRowDetail_2.ToggleCellProps>;
  toggleColumnWidth?: number;
}

// @public (undocumented)
namespace TableSelection {
  type HeaderCellProps = TableSelection_2.HeaderCellProps;
}

// @public (undocumented)
namespace TableSelection {
  type CellProps = TableSelection_2.CellProps;
}

// @public
declare const TableSelection: React.ComponentType<TableSelectionProps> & {
  COLUMN_TYPE: symbol;
} & {
  HeaderCell: React.ComponentType<TableSelection_2.HeaderCellProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Cell: React.ComponentType<TableSelection_2.CellProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface TableSelectionProps {
  cellComponent?: React.ComponentType<TableSelection_2.CellProps>;
  headerCellComponent?: React.ComponentType<TableSelection_2.HeaderCellProps>;
  highlightRow?: boolean;
  selectByRowClick?: boolean;
  selectionColumnWidth?: number;
  showSelectAll?: boolean;
  showSelectionColumn?: boolean;
}

// @public (undocumented)
namespace TableSummaryRow {
  type CellProps = TableSummaryRow_2.CellProps;
}

// @public (undocumented)
namespace TableSummaryRow {
  type ContentProps = TableSummaryRow_2.ContentProps;
}

// @public (undocumented)
namespace TableSummaryRow {
  type IndentProps = TableSummaryRow_2.IndentProps;
}

// @public (undocumented)
namespace TableSummaryRow {
  type ItemProps = TableSummaryRow_2.ItemProps;
}

// @public
declare const TableSummaryRow: React.ComponentType<TableSummaryRowProps> & {
  TREE_ROW_TYPE: symbol;
  GROUP_ROW_TYPE: symbol;
  TOTAL_ROW_TYPE: symbol;
} & {
  Cell: React.ComponentType<TableSummaryRow_2.CellProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  TotalRow: React.ComponentType<React.ComponentType<Table_2.RowProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  GroupRow: React.ComponentType<React.ComponentType<Table_2.RowProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  TreeRow: React.ComponentType<React.ComponentType<Table_2.RowProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  TotalCell: React.ComponentType<React.ComponentType<TableSummaryRow_2.CellProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  GroupCell: React.ComponentType<React.ComponentType<TableSummaryRow_2.CellProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  TreeCell: React.ComponentType<React.ComponentType<TableSummaryRow_2.CellProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  TreeColumnCell: React.ComponentType<React.ComponentType<TableSummaryRow_2.CellProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  TreeColumnContent: React.ComponentType<React.ComponentType<TableSummaryRow_2.ContentProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  TreeColumnIndent: React.ComponentType<React.ComponentType<TableSummaryRow_2.IndentProps> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Item: React.ComponentType<React.ComponentType<object> & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface TableSummaryRowProps {
  formatlessSummaryTypes?: Array<string>;
  groupCellComponent?: React.ComponentType<TableSummaryRow_2.CellProps>;
  groupRowComponent?: React.ComponentType<Table_2.RowProps>;
  itemComponent?: React.ComponentType<TableSummaryRow_2.ItemProps>;
  messages?: TableSummaryRow_2.LocalizationMessages;
  totalCellComponent?: React.ComponentType<TableSummaryRow_2.CellProps>;
  totalRowComponent?: React.ComponentType<Table_2.RowProps>;
  treeCellComponent?: React.ComponentType<TableSummaryRow_2.CellProps>;
  treeColumnCellComponent?: React.ComponentType<TableSummaryRow_2.CellProps>;
  treeColumnContentComponent?: React.ComponentType<TableSummaryRow_2.ContentProps>;
  treeColumnIndentComponent?: React.ComponentType<TableSummaryRow_2.IndentProps>;
  treeRowComponent?: React.ComponentType<Table_2.RowProps>;
}

// @public (undocumented)
namespace TableTreeColumn {
  type CellProps = TableTreeColumn_2.CellProps;
}

// @public (undocumented)
namespace TableTreeColumn {
  type ContentProps = TableTreeColumn_2.ContentProps;
}

// @public (undocumented)
namespace TableTreeColumn {
  type IndentProps = TableTreeColumn_2.IndentProps;
}

// @public (undocumented)
namespace TableTreeColumn {
  type ExpandButtonProps = TableTreeColumn_2.ExpandButtonProps;
}

// @public (undocumented)
namespace TableTreeColumn {
  type CheckboxProps = TableTreeColumn_2.CheckboxProps;
}

// @public
declare const TableTreeColumn: React.ComponentType<TableTreeColumnProps> & {
  Cell: React.ComponentType<TableTreeColumn_2.CellProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Content: React.ComponentType<TableTreeColumn_2.ContentProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Indent: React.ComponentType<TableTreeColumn_2.IndentProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  ExpandButton: React.ComponentType<TableTreeColumn_2.ExpandButtonProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Checkbox: React.ComponentType<TableTreeColumn_2.CheckboxProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface TableTreeColumnProps {
  cellComponent?: React.ComponentType<TableTreeColumn_2.CellProps>;
  checkboxComponent?: React.ComponentType<TableTreeColumn_2.CheckboxProps>;
  contentComponent?: React.ComponentType<TableTreeColumn_2.ContentProps>;
  expandButtonComponent?: React.ComponentType<TableTreeColumn_2.ExpandButtonProps>;
  for?: string;
  indentComponent?: React.ComponentType<TableTreeColumn_2.IndentProps>;
  showSelectAll?: boolean;
  showSelectionControls?: boolean;
}

// @public (undocumented)
namespace Toolbar {
  type RootProps = Toolbar_2.RootProps;
}

// @public
declare const Toolbar: React.ComponentType<ToolbarProps> & {
  Root: React.ComponentType<Toolbar_2.RootProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface ToolbarProps {
  rootComponent?: React.ComponentType<Toolbar_2.RootProps>;
}

// @public
declare const VirtualTable: React.ComponentType<VirtualTableProps> & {
  COLUMN_TYPE: symbol;
  ROW_TYPE: symbol;
  NODATA_ROW_TYPE: symbol;
} & {
  Table: React.ComponentType<object & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  TableHead: React.ComponentType<object & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  TableBody: React.ComponentType<object & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Container: React.ComponentType<object & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Cell: React.ComponentType<Table_2.DataCellProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  Row: React.ComponentType<Table_2.DataRowProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  NoDataCell: React.ComponentType<Table_2.CellProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  NoDataRow: React.ComponentType<Table_2.RowProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  StubRow: React.ComponentType<Table_2.RowProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  StubCell: React.ComponentType<Table_2.CellProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
  StubHeaderCell: React.ComponentType<Table_2.CellProps & { // (undocumented)
 className?: string; // (undocumented)
 style?: React.CSSProperties; // (undocumented)
 [x: string]: any }>;
};

// @public (undocumented)
interface VirtualTableProps {
  bodyComponent?: React.ComponentType<object>;
  cellComponent?: React.ComponentType<Table_2.DataCellProps>;
  columnExtensions?: Array<Table_2.ColumnExtension>;
  containerComponent?: React.ComponentType<object>;
  estimatedRowHeight?: number;
  footerComponent?: React.ComponentType<object>;
  headComponent?: React.ComponentType<object>;
  height?: number | string;
  messages?: Table_2.LocalizationMessages;
  noDataCellComponent?: React.ComponentType<Table_2.NoDataCellProps>;
  noDataRowComponent?: React.ComponentType<Table_2.RowProps>;
  rowComponent?: React.ComponentType<Table_2.DataRowProps>;
  stubCellComponent?: React.ComponentType<Table_2.CellProps>;
  stubHeaderCellComponent?: React.ComponentType<Table_2.CellProps>;
  stubRowComponent?: React.ComponentType<Table_2.RowProps>;
  tableComponent?: React.ComponentType<object>;
}


// (No @packageDocumentation comment for this package)
