// WARNING: Unsupported export: OverlayProps
// WARNING: Unsupported export: ToggleButtonProps
// WARNING: Unsupported export: ContainerProps
// WARNING: Unsupported export: ItemProps
// @public (undocumented)
module ColumnChooser {
}

// @public (undocumented)
interface ColumnChooserProps {
  containerComponent?: React.ComponentType<ColumnChooserBase.ContainerProps>;
  itemComponent?: React.ComponentType<ColumnChooserBase.ItemProps>;
  messages?: ColumnChooserBase.LocalizationMessages;
  overlayComponent?: React.ComponentType<ColumnChooserBase.OverlayProps>;
  toggleButtonComponent?: React.ComponentType<ColumnChooserBase.ToggleButtonProps>;
}

// WARNING: Unsupported export: ContainerProps
// WARNING: Unsupported export: ColumnProps
// @public (undocumented)
module DragDropProvider {
}

// @public (undocumented)
interface DragDropProviderProps {
  columnComponent?: React.ComponentType<DragDropProviderBase.ColumnProps>;
  containerComponent?: React.ComponentType<DragDropProviderBase.ContainerProps>;
}

// WARNING: Unsupported export: RootProps
// @public (undocumented)
module Grid {
}

// @public (undocumented)
interface GridProps {
  columns: ReadonlyArray<Column>;
  getCellValue?: (row: any, columnName: string) => any;
  getRowId?: (row: any) => number | string;
  rootComponent?: React.ComponentType<GridBase.RootProps>;
  rows: ReadonlyArray<any>;
}

// WARNING: Unsupported export: ContainerProps
// WARNING: Unsupported export: ItemProps
// WARNING: Unsupported export: EmptyMessageProps
// @public (undocumented)
module GroupingPanel {
}

// @public (undocumented)
interface GroupingPanelProps {
  containerComponent?: React.ComponentType<GroupingPanelBase.ContainerProps>;
  emptyMessageComponent?: React.ComponentType<GroupingPanelBase.EmptyMessageProps>;
  itemComponent?: React.ComponentType<GroupingPanelBase.ItemProps>;
  messages?: GroupingPanelBase.LocalizationMessages;
  showGroupingControls?: boolean;
  showSortingControls?: boolean;
}

// WARNING: Unsupported export: ContainerProps
// @public (undocumented)
module PagingPanel {
}

// @public (undocumented)
interface PagingPanelProps {
  containerComponent?: React.ComponentType<PagingPanelBase.ContainerProps>;
  messages?: PagingPanelBase.LocalizationMessages;
  pageSizes?: Array<number>;
}

// WARNING: Unsupported export: InputProps
// @public (undocumented)
module SearchPanel {
}

// @public (undocumented)
interface SearchPanelProps {
  inputComponent?: React.ComponentType<SearchPanelBase.InputProps>;
  messages?: SearchPanelBase.LocalizationMessages;
}

// WARNING: Unsupported export: ColumnExtension
// WARNING: Unsupported export: CellProps
// WARNING: Unsupported export: DataCellProps
// WARNING: Unsupported export: NoDataCellProps
// WARNING: Unsupported export: RowProps
// WARNING: Unsupported export: DataRowProps
// @public (undocumented)
module Table {
}

// WARNING: Unsupported export: CellProps
// WARNING: Unsupported export: ColumnBands
// @public (undocumented)
module TableBandHeader {
}

// @public (undocumented)
interface TableBandHeaderProps {
  cellComponent?: React.ComponentType<TableBandHeaderBase.CellProps>;
  columnBands?: Array<TableBandHeaderBase.ColumnBands>;
  rowComponent?: React.ComponentType<TableBase.RowProps>;
}

// @public (undocumented)
interface TableColumnReorderingProps {
  defaultOrder?: Array<string>;
  onOrderChange?: (nextOrder: Array<string>) => void;
  order?: Array<string>;
}

// @public (undocumented)
interface TableColumnResizingProps {
  columnWidths?: Array<TableColumnWidthInfo>;
  defaultColumnWidths?: Array<TableColumnWidthInfo>;
  minColumnWidth?: number;
  onColumnWidthsChange?: (nextColumnWidths: Array<TableColumnWidthInfo>) => void;
}

// WARNING: Unsupported export: EmptyMessageProps
// WARNING: Unsupported export: ColumnExtension
// @public (undocumented)
module TableColumnVisibility {
}

// @public (undocumented)
interface TableColumnVisibilityProps {
  columnExtensions?: Array<TableColumnVisibilityBase.ColumnExtension>;
  columnTogglingEnabled?: boolean;
  defaultHiddenColumnNames?: Array<string>;
  emptyMessageComponent?: React.ComponentType<TableColumnVisibilityBase.EmptyMessageProps>;
  hiddenColumnNames?: Array<string>;
  messages?: TableColumnVisibilityBase.LocalizationMessages;
  onHiddenColumnNamesChange?: (hiddenColumnNames: Array<string>) => void;
}

// WARNING: Unsupported export: CellProps
// WARNING: Unsupported export: HeaderCellProps
// WARNING: Unsupported export: CommandProps
// @public (undocumented)
module TableEditColumn {
}

// @public (undocumented)
interface TableEditColumnProps {
  cellComponent?: React.ComponentType<TableEditColumnBase.CellProps>;
  commandComponent?: React.ComponentType<TableEditColumnBase.CommandProps>;
  headerCellComponent?: React.ComponentType<TableEditColumnBase.HeaderCellProps>;
  messages?: TableEditColumnBase.LocalizationMessages;
  showAddCommand?: boolean;
  showDeleteCommand?: boolean;
  showEditCommand?: boolean;
  width?: number | string;
}

// WARNING: Unsupported export: CellProps
// WARNING: Unsupported export: RowProps
// @public (undocumented)
module TableEditRow {
}

// @public (undocumented)
interface TableEditRowProps {
  cellComponent?: React.ComponentType<TableEditRowBase.CellProps>;
  rowComponent?: React.ComponentType<TableEditRowBase.RowProps>;
  rowHeight?: number;
}

// WARNING: Unsupported export: CellProps
// WARNING: Unsupported export: FilterSelectorProps
// WARNING: Unsupported export: IconProps
// WARNING: Unsupported export: EditorProps
// WARNING: Unsupported export: ToggleButtonProps
// @public (undocumented)
module TableFilterRow {
}

// @public (undocumented)
interface TableFilterRowProps {
  cellComponent?: React.ComponentType<TableFilterRowBase.CellProps>;
  editorComponent?: React.ComponentType<TableFilterRowBase.EditorProps>;
  filterSelectorComponent?: React.ComponentType<TableFilterRowBase.FilterSelectorProps>;
  iconComponent?: React.ComponentType<TableFilterRowBase.IconProps>;
  messages?: TableFilterRowBase.LocalizationMessages;
  rowComponent?: React.ComponentType<TableBase.RowProps>;
  rowHeight?: number;
  showFilterSelector?: boolean;
  toggleButtonComponent?: React.ComponentType<TableFilterRowBase.ToggleButtonProps>;
}

// WARNING: Unsupported export: CellProps
// @public (undocumented)
module TableFixedColumns {
}

// @public (undocumented)
interface TableFixedColumnsProps {
  cellComponent?: React.ComponentType<TableFixedColumnsBase.CellProps>;
  leftColumns?: Array<string | symbol>;
  rightColumns?: Array<string | symbol>;
}

// WARNING: Unsupported export: ColumnExtension
// WARNING: Unsupported export: CellProps
// WARNING: Unsupported export: RowProps
// WARNING: Unsupported export: ContentProps
// WARNING: Unsupported export: IconProps
// WARNING: Unsupported export: IndentCellProps
// @public (undocumented)
module TableGroupRow {
}

// @public (undocumented)
interface TableGroupRowProps {
  cellComponent?: React.ComponentType<TableGroupRowBase.CellProps>;
  columnExtensions?: Array<TableGroupRowBase.ColumnExtension>;
  contentComponent?: React.ComponentType<TableGroupRowBase.ContentProps>;
  iconComponent?: React.ComponentType<TableGroupRowBase.IconProps>;
  indentCellComponent?: React.ComponentType<TableGroupRowBase.IndentCellProps>;
  indentColumnWidth?: number;
  rowComponent?: React.ComponentType<TableGroupRowBase.RowProps>;
  showColumnsWhenGrouped?: boolean;
}

// WARNING: Unsupported export: CellProps
// WARNING: Unsupported export: SortLabelProps
// WARNING: Unsupported export: ContentProps
// WARNING: Unsupported export: GroupButtonProps
// @public (undocumented)
module TableHeaderRow {
}

// @public (undocumented)
interface TableHeaderRowProps {
  cellComponent?: React.ComponentType<TableHeaderRowBase.CellProps>;
  contentComponent?: React.ComponentType<TableHeaderRowBase.ContentProps>;
  groupButtonComponent?: React.ComponentType<TableHeaderRowBase.GroupButtonProps>;
  messages?: TableHeaderRowBase.LocalizationMessages;
  rowComponent?: React.ComponentType<TableBase.RowProps>;
  showGroupingControls?: boolean;
  showSortingControls?: boolean;
  sortLabelComponent?: React.ComponentType<TableHeaderRowBase.SortLabelProps>;
  titleComponent?: React.ComponentType<object>;
}

// @public (undocumented)
interface TableProps {
  bodyComponent?: React.ComponentType<object>;
  cellComponent?: React.ComponentType<TableBase.DataCellProps>;
  columnExtensions?: Array<TableBase.ColumnExtension>;
  containerComponent?: React.ComponentType<object>;
  footerComponent?: React.ComponentType<object>;
  headComponent?: React.ComponentType<object>;
  messages?: TableBase.LocalizationMessages;
  noDataCellComponent?: React.ComponentType<TableBase.NoDataCellProps>;
  noDataRowComponent?: React.ComponentType<TableBase.RowProps>;
  rowComponent?: React.ComponentType<TableBase.DataRowProps>;
  stubCellComponent?: React.ComponentType<TableBase.CellProps>;
  stubHeaderCellComponent?: React.ComponentType<TableBase.CellProps>;
  stubRowComponent?: React.ComponentType<TableBase.RowProps>;
  tableComponent?: React.ComponentType<object>;
}

// WARNING: Unsupported export: ContentProps
// WARNING: Unsupported export: CellProps
// WARNING: Unsupported export: RowProps
// WARNING: Unsupported export: ToggleCellProps
// @public (undocumented)
module TableRowDetail {
}

// @public (undocumented)
interface TableRowDetailProps {
  cellComponent?: React.ComponentType<TableRowDetailBase.CellProps>;
  contentComponent?: React.ComponentType<TableRowDetailBase.ContentProps>;
  rowComponent?: React.ComponentType<TableRowDetailBase.RowProps>;
  rowHeight?: number;
  toggleCellComponent?: React.ComponentType<TableRowDetailBase.ToggleCellProps>;
  toggleColumnWidth?: number;
}

// WARNING: Unsupported export: HeaderCellProps
// WARNING: Unsupported export: CellProps
// @public (undocumented)
module TableSelection {
}

// @public (undocumented)
interface TableSelectionProps {
  cellComponent?: React.ComponentType<TableSelectionBase.CellProps>;
  headerCellComponent?: React.ComponentType<TableSelectionBase.HeaderCellProps>;
  highlightRow?: boolean;
  selectByRowClick?: boolean;
  selectionColumnWidth?: number;
  showSelectAll?: boolean;
  showSelectionColumn?: boolean;
}

// WARNING: Unsupported export: CellProps
// WARNING: Unsupported export: ContentProps
// WARNING: Unsupported export: IndentProps
// WARNING: Unsupported export: ItemProps
// @public (undocumented)
module TableSummaryRow {
}

// @public (undocumented)
interface TableSummaryRowProps {
  formatlessSummaryTypes?: Array<string>;
  groupCellComponent?: React.ComponentType<TableSummaryRowBase.CellProps>;
  groupRowComponent?: React.ComponentType<TableBase.RowProps>;
  itemComponent?: React.ComponentType<TableSummaryRowBase.ItemProps>;
  messages?: TableSummaryRowBase.LocalizationMessages;
  totalCellComponent?: React.ComponentType<TableSummaryRowBase.CellProps>;
  totalRowComponent?: React.ComponentType<TableBase.RowProps>;
  treeCellComponent?: React.ComponentType<TableSummaryRowBase.CellProps>;
  treeColumnCellComponent?: React.ComponentType<TableSummaryRowBase.CellProps>;
  treeColumnContentComponent?: React.ComponentType<TableSummaryRowBase.ContentProps>;
  treeColumnIndentComponent?: React.ComponentType<TableSummaryRowBase.IndentProps>;
  treeRowComponent?: React.ComponentType<TableBase.RowProps>;
}

// WARNING: Unsupported export: CellProps
// WARNING: Unsupported export: ContentProps
// WARNING: Unsupported export: IndentProps
// WARNING: Unsupported export: ExpandButtonProps
// WARNING: Unsupported export: CheckboxProps
// @public (undocumented)
module TableTreeColumn {
}

// @public (undocumented)
interface TableTreeColumnProps {
  cellComponent?: React.ComponentType<TableTreeColumnBase.CellProps>;
  checkboxComponent?: React.ComponentType<TableTreeColumnBase.CheckboxProps>;
  contentComponent?: React.ComponentType<TableTreeColumnBase.ContentProps>;
  expandButtonComponent?: React.ComponentType<TableTreeColumnBase.ExpandButtonProps>;
  for?: string;
  indentComponent?: React.ComponentType<TableTreeColumnBase.IndentProps>;
  showSelectAll?: boolean;
  showSelectionControls?: boolean;
}

// WARNING: Unsupported export: RootProps
// @public (undocumented)
module Toolbar {
}

// @public (undocumented)
interface ToolbarProps {
  rootComponent?: React.ComponentType<ToolbarBase.RootProps>;
}

// @public (undocumented)
interface VirtualTableProps {
  bodyComponent?: React.ComponentType<object>;
  cellComponent?: React.ComponentType<TableBase.DataCellProps>;
  columnExtensions?: Array<TableBase.ColumnExtension>;
  containerComponent?: React.ComponentType<object>;
  estimatedRowHeight?: number;
  footerComponent?: React.ComponentType<object>;
  headComponent?: React.ComponentType<object>;
  height?: number | string;
  messages?: TableBase.LocalizationMessages;
  noDataCellComponent?: React.ComponentType<TableBase.NoDataCellProps>;
  noDataRowComponent?: React.ComponentType<TableBase.RowProps>;
  rowComponent?: React.ComponentType<TableBase.DataRowProps>;
  stubCellComponent?: React.ComponentType<TableBase.CellProps>;
  stubHeaderCellComponent?: React.ComponentType<TableBase.CellProps>;
  stubRowComponent?: React.ComponentType<TableBase.RowProps>;
  tableComponent?: React.ComponentType<object>;
}

// WARNING: Unsupported export: TableColumnReordering
// WARNING: Unsupported export: TableColumnResizing
// WARNING: Unsupported export: VirtualTable
// (No @packagedocumentation comment for this package)
