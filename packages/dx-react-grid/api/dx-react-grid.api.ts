// @public
interface ChangeSet {
  added?: ReadonlyArray<any>;
  changed?: {
    // (undocumented)
    [key: string]: any;
  };
  deleted?: ReadonlyArray<number | string>;
}

// @public
interface Column {
    getCellValue?: GetCellValueFn;
    name: string;
    title?: string;
}

// @public
interface ColumnBands {
  children?: ColumnBands[];
  columnName?: string;
  title?: string;
}

// @public
declare const ColumnChooser: React.ComponentType<ColumnChooserProps>;

// @public (undocumented)
namespace ColumnChooser {
    interface ContainerProps {
        children: React.ReactNode;
    }
    interface ItemProps {
        disabled: boolean;
        item: ColumnChooserItem;
        onToggle(): void;
    }
    // (undocumented)
    interface LocalizationMessages {
        showColumnChooser?: string;
    }
    interface OverlayProps {
        children: React.ReactNode;
        onHide(): void;
        target: React.ReactInstance;
        visible: boolean;
    }
    interface ToggleButtonProps {
        // (undocumented)
        active?: boolean;
        buttonRef: (ref: React.ReactInstance) => void;
        getMessage: (messageKey: string) => string;
        onToggle(): void;
    }
}

// @public (undocumented)
interface ColumnChooserItem {
  column: Column;
  hidden: boolean;
}

// @public (undocumented)
interface ColumnChooserProps {
    containerComponent: React.ComponentType<ColumnChooser.ContainerProps>;
    itemComponent: React.ComponentType<ColumnChooser.ItemProps>;
    messages?: ColumnChooser.LocalizationMessages;
    overlayComponent: React.ComponentType<ColumnChooser.OverlayProps>;
    toggleButtonComponent: React.ComponentType<ColumnChooser.ToggleButtonProps>;
}

// @public
declare const CustomGrouping: React.ComponentType<CustomGroupingProps>;

// @public (undocumented)
interface CustomGroupingProps {
  expandedGroups?: GroupKey[] | null;
  getChildGroups: (currentRows: Array<any>, grouping: Grouping, rootRows: Array<any>) => Array<{
    // (undocumented)
    key: number | string;
    // (undocumented)
    value?: any;
    // (undocumented)
    childRows?: Array<any>;
  }>;
  grouping?: Grouping[] | null;
}

// @public
declare const CustomPaging: React.ComponentType<CustomPagingProps>;

// @public (undocumented)
interface CustomPagingProps {
  totalCount?: number;
}

// @public
declare const CustomSummary: React.ComponentType<CustomSummaryProps>;

// @public (undocumented)
interface CustomSummaryProps {
  groupValues?: {
    // (undocumented)
    [key: string]: Array<any>;
  };
  totalValues?: Array<any>;
  treeValues?: {
    // (undocumented)
    [key: string]: Array<any>;
  };
}

// @public
declare const CustomTreeData: React.ComponentType<CustomTreeDataProps>;

// @public (undocumented)
interface CustomTreeDataProps {
  getChildRows: (currentRow: any | null, rootRows: Array<any>) => Array<any> | null;
}

// @public
declare const DataTypeProvider: React.ComponentType<DataTypeProviderProps>;

// @public (undocumented)
namespace DataTypeProvider {
  interface ValueEditorProps {
    column: Column;
    onValueChange: (newValue: any) => void;
    row?: any;
    value: any;
  }
  interface ValueFormatterProps {
    column: Column;
    row?: any;
    value: any;
  }
}

// @public (undocumented)
interface DataTypeProviderProps {
  availableFilterOperations?: Array<FilterOperation>;
  editorComponent?: React.ComponentType<DataTypeProvider.ValueEditorProps>;
  for: Array<string>;
  formatterComponent?: React.ComponentType<DataTypeProvider.ValueFormatterProps>;
}

// @public (undocumented)
type DefaultPredicateFn = (value: any, filter: Filter, row: any) => boolean;

// @public
declare const DragDropProvider: React.ComponentType<DragDropProviderProps>;

// @public (undocumented)
namespace DragDropProvider {
  interface ColumnProps {
    column: Column;
  }
  interface ContainerProps {
    children: React.ReactNode;
    clientOffset: {
      // (undocumented)
      x: number;
      // (undocumented)
      y: number;
    };
  }
}

// @public (undocumented)
interface DragDropProviderProps {
  columnComponent: React.ComponentType<DragDropProvider.ColumnProps>;
  containerComponent: React.ComponentType<DragDropProvider.ContainerProps>;
}

// @public (undocumented)
interface EditingColumnExtension {
    columnName: string;
    createRowChange?: (row: any, value: any, columnName: string) => any;
    editingEnabled?: boolean;
}

// @public
declare const EditingState: React.ComponentType<EditingStateProps>;

// @public (undocumented)
namespace EditingState {
  interface ColumnExtension {
    columnName: string;
    createRowChange?: (row: any, value: any, columnName: string) => any;
    editingEnabled?: boolean;
  }
}

// @public (undocumented)
interface EditingStateProps {
  addedRows?: Array<any>;
  columnEditingEnabled?: boolean;
  columnExtensions?: Array<EditingState.ColumnExtension>;
  createRowChange?: (row: any, value: string | number, columnName: string) => any;
  defaultAddedRows?: Array<any>;
  defaultEditingRowIds?: Array<number | string>;
  defaultRowChanges?: {
    // (undocumented)
    [key: string]: any;
  };
  editingRowIds?: Array<number | string>;
  onAddedRowsChange?: (addedRows: Array<any>) => void;
  onCommitChanges: (changes: ChangeSet) => void;
  // (undocumented)
  onDeletedRowIdsChange?: (deletedRowIds: Array<number | string>) => void;
  onEditingRowIdsChange?: (editingRowIds: Array<number | string>) => void;
  onRowChangesChange?: (rowChanges: {
    // (undocumented)
    [key: string]: any;
  }) => void;
  rowChanges?: {
    // (undocumented)
    [key: string]: any;
  };
}

// @public
interface Filter {
    columnName: string;
    operation?: FilterOperation;
    value?: string;
}

// @public
interface FilterExpression {
    filters: Array<FilterExpression | Filter>;
    operator: 'and' | 'or';
}

// @public
declare const FilteringState: React.ComponentType<FilteringStateProps>;

// @public (undocumented)
namespace FilteringState {
  interface ColumnExtension {
    columnName: string;
    filteringEnabled: boolean;
  }
}

// @public (undocumented)
interface FilteringStateProps {
  columnExtensions?: FilteringState.ColumnExtension[];
  columnFilteringEnabled?: boolean;
  defaultFilters?: Filter[];
  filters?: Filter[];
  onFiltersChange?: (filters: Filter[]) => void;
}

// @public
declare type FilterOperation = string;

// @public (undocumented)
declare type GetCellValueFn = (row: any, columnName: string) => any;

// @public
declare const Grid: React.ComponentType<GridProps>;

// @public (undocumented)
namespace Grid {
    interface RootProps {
        children?: React.ReactNode;
    }
}

// @public (undocumented)
declare type GridColumnExtension = {
    columnName: string;
    width?: number;
    align?: 'left' | 'right' | 'center';
    wordWrapEnabled?: boolean;
} & IntegratedFiltering.ColumnExtension;

// @public (undocumented)
interface GridProps {
    columns: Column[];
    getCellValue?: (row: any, columnName: string) => any;
    getRowId?: (row: any) => number | string;
    rootComponent: React.ComponentType<Grid.RootProps>;
    rows: any[];
}

// @public
interface Grouping {
  columnName: string;
}

// @public
declare const GroupingPanel: React.ComponentType<GroupingPanelProps>;

// @public (undocumented)
namespace GroupingPanel {
    interface ContainerProps {
        children?: React.ReactNode;
    }
    interface EmptyMessageProps {
        getMessage: (messageKey: string) => string;
    }
    interface ItemProps {
        groupingEnabled: boolean;
        item: GroupingPanelItem;
        onGroup: () => void;
        onSort: (parameters: {
            // (undocumented)
            direction?: 'asc' | 'desc' | null;
            // (undocumented)
            keepOther?: boolean;
        }) => void;
        showGroupingControls: boolean;
        showSortingControls: boolean;
        sortingDirection?: 'asc' | 'desc';
        sortingEnabled: boolean;
    }
    // (undocumented)
    interface LocalizationMessages {
        groupByColumn?: string;
    }
}

// @public
interface GroupingPanelItem {
  column: Column;
  draft?: boolean;
}

// @public (undocumented)
interface GroupingPanelProps {
    containerComponent: React.ComponentType<GroupingPanel.ContainerProps>;
    emptyMessageComponent: React.ComponentType<GroupingPanel.EmptyMessageProps>;
    itemComponent: React.ComponentType<GroupingPanel.ItemProps>;
    messages?: GroupingPanel.LocalizationMessages;
    showGroupingControls?: boolean;
    showSortingControls?: boolean;
}

// @public
declare const GroupingState: React.ComponentType<GroupingStateProps>;

// @public (undocumented)
namespace GroupingState {
  interface ColumnExtension {
    columnName: string;
    groupingEnabled: boolean;
  }
}

// @public (undocumented)
interface GroupingStateProps {
  columnExtensions?: Array<GroupingState.ColumnExtension>;
  columnGroupingEnabled?: boolean;
  defaultExpandedGroups?: Array<GroupKey>;
  defaultGrouping?: Array<Grouping>;
  expandedGroups?: Array<GroupKey>;
  grouping?: Array<Grouping>;
  onExpandedGroupsChange?: (expandedGroups: Array<GroupKey>) => void;
  onGroupingChange?: (grouping: Array<Grouping>) => void;
}

// @public
declare type GroupKey = string;

// @public
interface GroupRow {
    key: number | string;
    value: any;
}

// @public (undocumented)
declare const IntegratedFiltering: React.ComponentType<IntegratedFilteringProps> & {
  defaultPredicate: DefaultPredicateFn;
};

// @public (undocumented)
declare namespace IntegratedFiltering {
    interface ColumnExtension {
        columnName: string;
        predicate?: (value: any, filter: Filter, row: any) => boolean;
    }
}

// @public (undocumented)
type IntegratedFilteringProps = {
  columnExtensions?: IntegratedFiltering.ColumnExtension[];
};

// @public
declare const IntegratedGrouping: React.ComponentType<IntegratedGroupingProps>;

// @public (undocumented)
namespace IntegratedGrouping {
  interface ColumnExtension {
    columnName: string;
    criteria?: (value: any) => {
      // (undocumented)
      key: string | number;
      // (undocumented)
      value?: any;
    };
  }
}

// @public (undocumented)
interface IntegratedGroupingProps {
  columnExtensions?: Array<IntegratedGrouping.ColumnExtension>;
}

// @public
declare const IntegratedPaging: React.ComponentType<IntegratedPagingProps>;

// @public (undocumented)
interface IntegratedPagingProps {
}

// @public
declare const IntegratedSelection: React.ComponentType<IntegratedSelectionProps>;

// @public (undocumented)
interface IntegratedSelectionProps {
}

// @public
declare const IntegratedSorting: React.ComponentType<IntegratedSortingProps>;

// @public (undocumented)
namespace IntegratedSorting {
  interface ColumnExtension {
    columnName: string;
    compare?: (a: any, b: any) => number;
  }
}

// @public (undocumented)
interface IntegratedSortingProps {
  columnExtensions?: Array<IntegratedSorting.ColumnExtension>;
}

// @public
declare const IntegratedSummary: React.ComponentType<IntegratedSummaryProps> & {
  defaultCalculator: (type: SummaryType, rows: Array<any>, getValue: (row: any) => any) => any;
};

// @public (undocumented)
interface IntegratedSummaryProps {
  calculator?: (type: SummaryType, rows: Array<any>, getValue: (row: any) => any) => any;
}

// @public
declare const PagingPanel: React.ComponentType<PagingPanelProps>;

// @public (undocumented)
namespace PagingPanel {
    interface ContainerProps {
        currentPage: number;
        getMessage: (messageKey: string, parameters?: {
            // (undocumented)
            from: number;
            // (undocumented)
            to: number;
            // (undocumented)
            count: number;
        }) => string;
        onCurrentPageChange: (page: number) => void;
        onPageSizeChange: (size: number) => void;
        pageSize: number;
        pageSizes: Array<number>;
        totalCount: number;
        totalPages: number;
    }
    // (undocumented)
    interface LocalizationMessages {
        info?: (parameters: {
            // (undocumented)
            from: number;
            // (undocumented)
            to: number;
            // (undocumented)
            count: number;
        }) => string | string;
        rowsPerPage?: string;
        showAll?: string;
    }
}

// @public (undocumented)
interface PagingPanelProps {
    containerComponent: React.ComponentType<PagingPanel.ContainerProps>;
    messages?: PagingPanel.LocalizationMessages;
    pageSizes?: Array<number>;
}

// @public
declare const PagingState: React.ComponentType<PagingStateProps>;

// @public (undocumented)
interface PagingStateProps {
  currentPage?: number;
  defaultCurrentPage?: number;
  defaultPageSize?: number;
  onCurrentPageChange?: (currentPage: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSize?: number;
}

// @public (undocumented)
declare type Row = any;

// @public
declare const RowDetailState: React.ComponentType<RowDetailStateProps>;

// @public (undocumented)
interface RowDetailStateProps {
  defaultExpandedRowIds?: Array<number | string>;
  expandedRowIds?: Array<number | string>;
  onExpandedRowIdsChange?: (expandedRowIds: Array<number | string>) => void;
}

// @public (undocumented)
declare type RowId = number | string;

// @public
declare const SearchPanel: React.ComponentType<SearchPanelProps>;

// @public (undocumented)
namespace SearchPanel {
  interface InputProps {
    getMessage: (messageKey: string) => string;
    onValueChange: (value: string) => void;
    value: string;
  }
  // (undocumented)
  interface LocalizationMessages {
    searchPlaceholder?: string;
  }
}

// @public (undocumented)
interface SearchPanelProps {
  inputComponent: React.ComponentType<SearchPanel.InputProps>;
  messages?: SearchPanel.LocalizationMessages;
}

// @public
declare const SearchState: React.ComponentType<SearchStateProps>;

// @public (undocumented)
interface SearchStateProps {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  value?: string;
}

// @public
declare const SelectionState: React.ComponentType<SelectionStateProps>;

// @public (undocumented)
interface SelectionStateProps {
  defaultSelection?: Array<number | string>;
  onSelectionChange?: (selection: Array<number | string>) => void;
  selection?: Array<number | string>;
}

// @public
interface Sorting {
  columnName: string;
  direction: 'asc' | 'desc';
}

// @public (undocumented)
declare type SortingDirection = 'asc' | 'desc';

// @public
declare const SortingState: React.ComponentType<SortingStateProps>;

// @public (undocumented)
namespace SortingState {
  interface ColumnExtension {
    columnName: string;
    sortingEnabled: boolean;
  }
}

// @public (undocumented)
interface SortingStateProps {
  columnExtensions?: Array<SortingState.ColumnExtension>;
  columnSortingEnabled?: boolean;
  defaultSorting?: Array<Sorting>;
  onSortingChange?: (sorting: Array<Sorting>) => void;
  sorting?: Array<Sorting>;
}

// @public
interface SummaryItem {
  columnName: string;
  type: SummaryType;
}

// @public
declare const SummaryState: React.ComponentType<SummaryStateProps>;

// @public (undocumented)
interface SummaryStateProps {
  groupItems?: Array<SummaryItem>;
  totalItems?: Array<SummaryItem>;
  treeItems?: Array<SummaryItem>;
}

// @public (undocumented)
declare type SummaryType = string;

// @public
declare const Table: React.ComponentType<TableProps> & {
  COLUMN_TYPE: symbol;
  ROW_TYPE: symbol;
  NODATA_ROW_TYPE: symbol;
};

// @public (undocumented)
namespace Table {
  interface CellProps {
    colSpan?: number;
    rowSpan?: number;
    tableColumn: TableColumn;
    tableRow: TableRow;
  }
  interface ColumnExtension {
    align?: 'left' | 'right' | 'center';
    columnName: string;
    width?: number;
    wordWrapEnabled?: boolean;
  }
  interface DataCellProps extends Table.CellProps {
    children?: React.ReactNode;
    column: Column;
    row: any;
    value: any;
  }
  interface DataRowProps extends Table.RowProps {
    row: any;
  }
  // (undocumented)
  interface InnerTableProps {
    // (undocumented)
    style: React.CSSProperties;
    // (undocumented)
    tableRef?: React.RefObject<HTMLTableElement>;
  }
  // (undocumented)
  interface LocalizationMessages {
    noData?: string;
  }
  interface NoDataCellProps extends Table.CellProps {
    getMessage: (messageKey: string) => string;
  }
  interface RowProps {
    children: React.ReactNode;
    tableRow: TableRow;
  }
}

// @public
declare const TableBandHeader: React.ComponentType<TableBandHeaderProps> & {
  ROW_TYPE: symbol;
};

// @public (undocumented)
namespace TableBandHeader {
  interface CellProps extends Table.CellProps {
    beforeBorder?: boolean;
    children?: React.ReactNode;
  }
  interface ColumnBands {
    children?: Array<TableBandHeader.ColumnBands>;
    columnName?: string;
    title?: string;
  }
}

// @public (undocumented)
interface TableBandHeaderProps {
  cellComponent: React.ComponentType<TableBandHeader.CellProps>;
  columnBands: Array<TableBandHeader.ColumnBands>;
  rowComponent: React.ComponentType<Table.RowProps>;
}

// @public
interface TableColumn {
    align?: 'left' | 'right' | 'center';
    column?: Column;
    fixed?: 'left' | 'right';
    key: string;
    type: symbol;
    width?: number;
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

// @public
declare const TableColumnVisibility: React.ComponentType<TableColumnVisibilityProps>;

// @public (undocumented)
namespace TableColumnVisibility {
  interface ColumnExtension {
    columnName: string;
    togglingEnabled: boolean;
  }
  interface EmptyMessageProps {
    getMessage: (messageKey: string) => string;
  }
  // (undocumented)
  interface LocalizationMessages {
    noColumns?: string;
  }
}

// @public (undocumented)
interface TableColumnVisibilityProps {
  columnExtensions?: Array<TableColumnVisibility.ColumnExtension>;
  columnTogglingEnabled?: boolean;
  defaultHiddenColumnNames?: Array<string>;
  emptyMessageComponent: React.ComponentType<TableColumnVisibility.EmptyMessageProps>;
  hiddenColumnNames?: Array<string>;
  messages?: TableColumnVisibility.LocalizationMessages;
  onHiddenColumnNamesChange?: (hiddenColumnNames: Array<string>) => void;
}

// @public
interface TableColumnWidthInfo {
  columnName: string;
  width: number;
}

// @public
declare const TableEditColumn: React.ComponentType<TableEditColumnProps> & {
  COLUMN_TYPE: symbol;
};

// @public (undocumented)
namespace TableEditColumn {
  interface CellProps extends Table.CellProps {
    children?: React.ReactNode;
    row: any;
  }
  interface CommandProps {
    id: 'add' | 'edit' | 'delete' | 'commit' | 'cancel';
    onExecute(): void;
    text: string;
  }
  interface HeaderCellProps extends Table.CellProps {
    children?: React.ReactNode;
  }
  // (undocumented)
  interface LocalizationMessages {
    addCommand?: string;
    cancelCommand?: string;
    commitCommand?: string;
    deleteCommand?: string;
    editCommand?: string;
  }
}

// @public (undocumented)
interface TableEditColumnProps {
  cellComponent: React.ComponentType<TableEditColumn.CellProps>;
  commandComponent: React.ComponentType<TableEditColumn.CommandProps>;
  headerCellComponent: React.ComponentType<TableEditColumn.HeaderCellProps>;
  messages?: TableEditColumn.LocalizationMessages;
  showAddCommand?: boolean;
  showDeleteCommand?: boolean;
  showEditCommand?: boolean;
  width?: number | string;
}

// @public
declare const TableEditRow: React.ComponentType<TableEditRowProps> & {
  ADDED_ROW_TYPE: symbol;
  EDIT_ROW_TYPE: symbol;
};

// @public (undocumented)
namespace TableEditRow {
  interface CellProps extends Table.CellProps {
    column: Column;
    editingEnabled: boolean;
    onValueChange: (newValue: any) => void;
    row: any;
    value: any;
  }
  interface RowProps extends Table.RowProps {
    row: any;
  }
}

// @public (undocumented)
interface TableEditRowProps {
  cellComponent: React.ComponentType<TableEditRow.CellProps>;
  rowComponent: React.ComponentType<TableEditRow.RowProps>;
  rowHeight?: number;
}

// @public
declare const TableFilterRow: React.ComponentType<TableFilterRowProps> & {
  ROW_TYPE: symbol;
};

// @public (undocumented)
namespace TableFilterRow {
  interface CellProps extends Table.CellProps {
    column: Column;
    filter: Filter | null;
    filteringEnabled: boolean;
    getMessage: (messageKey: string) => string;
    onFilter: (filter: Filter | null) => void;
  }
  interface EditorProps {
    disabled: boolean;
    getMessage: (messageKey: string) => string;
    onChange: (value: string) => void;
    value: any;
  }
  interface FilterSelectorProps {
    availableValues: Array<string>;
    disabled: boolean;
    getMessage: (messageKey: string) => string;
    iconComponent: React.ComponentType<TableFilterRow.IconProps>;
    onChange: (value: string) => void;
    value: string;
  }
  interface IconProps {
    type: string;
  }
  // (undocumented)
  interface LocalizationMessages {
    contains?: string;
    endsWith?: string;
    equal?: string;
    filterPlaceholder?: string;
    greaterThan?: string;
    greaterThanOrEqual?: string;
    lessThan?: string;
    lessThanOrEqual?: string;
    notContains?: string;
    notEqual?: string;
    startsWith?: string;
  }
  interface ToggleButtonProps {
    buttonRef: (ref: React.ReactInstance) => void;
    children?: React.ReactNode;
    disabled?: boolean;
    onToggle(): void;
  }
}

// @public (undocumented)
interface TableFilterRowProps {
  cellComponent: React.ComponentType<TableFilterRow.CellProps>;
  editorComponent: React.ComponentType<TableFilterRow.EditorProps>;
  filterSelectorComponent: React.ComponentType<TableFilterRow.FilterSelectorProps>;
  iconComponent: React.ComponentType<TableFilterRow.IconProps>;
  messages?: TableFilterRow.LocalizationMessages;
  rowComponent: React.ComponentType<Table.RowProps>;
  rowHeight?: number;
  showFilterSelector?: boolean;
  toggleButtonComponent: React.ComponentType<TableFilterRow.ToggleButtonProps>;
}

// @public
declare const TableFixedColumns: React.ComponentType<TableFixedColumnsProps>;

// @public (undocumented)
namespace TableFixedColumns {
  interface CellProps extends Table.CellProps {
    component: React.ComponentType<Table.CellProps>;
    position: number;
    showLeftDivider: boolean;
    showRightDivider: boolean;
    side: 'left' | 'right';
  }
}

// @public (undocumented)
interface TableFixedColumnsProps {
  cellComponent: React.ComponentType<TableFixedColumns.CellProps>;
  leftColumns?: Array<string | symbol>;
  rightColumns?: Array<string | symbol>;
}

// @public
declare const TableGroupRow: React.ComponentType<TableGroupRowProps> & {
  COLUMN_TYPE: symbol;
  ROW_TYPE: symbol;
};

// @public (undocumented)
namespace TableGroupRow {
    interface CellProps extends Table.CellProps {
        column: Column;
        expanded: boolean;
        onToggle(): void;
        row: GroupRow;
    }
    interface ColumnExtension {
        columnName: string;
        showWhenGrouped?: boolean;
    }
    interface ContentProps {
        children?: React.ReactNode;
        column: Column;
        row: GroupRow;
    }
    interface IconProps {
        expanded: boolean;
    }
    interface IndentCellProps extends Table.CellProps {
        column: Column;
        row: GroupRow;
    }
    interface RowProps extends Table.RowProps {
        row: GroupRow;
    }
}

// @public (undocumented)
interface TableGroupRowProps {
    cellComponent: React.ComponentType<TableGroupRow.CellProps>;
    columnExtensions?: Array<TableGroupRow.ColumnExtension>;
    contentComponent: React.ComponentType<TableGroupRow.ContentProps>;
    iconComponent: React.ComponentType<TableGroupRow.IconProps>;
    indentCellComponent?: React.ComponentType<TableGroupRow.IndentCellProps>;
    indentColumnWidth: number;
    rowComponent: React.ComponentType<TableGroupRow.RowProps>;
    showColumnsWhenGrouped?: boolean;
}

// @public
declare const TableHeaderRow: React.ComponentType<TableHeaderRowProps> & {
  ROW_TYPE: symbol;
};

// @public (undocumented)
namespace TableHeaderRow {
  interface CellProps extends Table.CellProps {
    children: React.ReactNode;
    column: Column;
    draggingEnabled: boolean;
    getMessage: (messageKey: string) => string;
    groupingEnabled: boolean;
    onGroup: () => void;
    onSort: (parameters: {
      // (undocumented)
      direction?: 'asc' | 'desc' | null;
      // (undocumented)
      keepOther?: boolean;
    }) => void;
    onWidthChange: (parameters: {
      // (undocumented)
      shift: number;
    }) => void;
    onWidthDraft: (parameters: {
      // (undocumented)
      shift: number;
    }) => void;
    onWidthDraftCancel(): void;
    resizingEnabled: boolean;
    showGroupingControls: boolean;
    showSortingControls: boolean;
    sortingDirection?: 'asc' | 'desc';
    sortingEnabled: boolean;
  }
  interface ContentProps {
    align: string;
    children: React.ReactNode;
    column: Column;
  }
  interface GroupButtonProps {
    disabled: boolean;
    onGroup: () => void;
  }
  // (undocumented)
  interface LocalizationMessages {
    sortingHint?: string;
  }
  interface SortLabelProps {
    align: string;
    children: React.ReactNode;
    column: Column;
    direction: 'asc' | 'desc' | null;
    disabled: boolean;
    getMessage: (messageKey: string) => string;
    onSort: (parameters: {
      // (undocumented)
      direction?: 'asc' | 'desc' | null;
      // (undocumented)
      keepOther?: boolean;
    }) => void;
  }
}

// @public (undocumented)
interface TableHeaderRowProps {
  cellComponent: React.ComponentType<TableHeaderRow.CellProps>;
  contentComponent: React.ComponentType<TableHeaderRow.ContentProps>;
  groupButtonComponent: React.ComponentType<TableHeaderRow.GroupButtonProps>;
  messages?: TableHeaderRow.LocalizationMessages;
  rowComponent: React.ComponentType<Table.RowProps>;
  showGroupingControls?: boolean;
  showSortingControls?: boolean;
  sortLabelComponent: React.ComponentType<TableHeaderRow.SortLabelProps>;
  titleComponent: React.ComponentType<object>;
}

// @public (undocumented)
interface TableProps {
  bodyComponent: React.ComponentType<object>;
  cellComponent: React.ComponentType<Table.DataCellProps>;
  columnExtensions?: Array<Table.ColumnExtension>;
  containerComponent: React.ComponentType<object>;
  footerComponent: React.ComponentType<object>;
  headComponent: React.ComponentType<object>;
  messages?: Table.LocalizationMessages;
  noDataCellComponent: React.ComponentType<Table.NoDataCellProps>;
  noDataRowComponent: React.ComponentType<Table.RowProps>;
  rowComponent: React.ComponentType<Table.DataRowProps>;
  stubCellComponent: React.ComponentType<Table.CellProps>;
  stubHeaderCellComponent: React.ComponentType<Table.CellProps>;
  stubRowComponent: React.ComponentType<Table.RowProps>;
  tableComponent: React.ComponentType<Table.InnerTableProps>;
}

// @public
interface TableRow {
    height?: number;
    key: string;
    row?: any;
    rowId?: number | string;
    type: symbol;
}

// @public
declare const TableRowDetail: React.ComponentType<TableRowDetailProps> & {
  COLUMN_TYPE: symbol;
  ROW_TYPE: symbol;
};

// @public (undocumented)
namespace TableRowDetail {
  interface CellProps extends Table.CellProps {
    children?: React.ReactNode;
    row: any;
  }
  interface ContentProps {
    row: any;
  }
  interface RowProps extends Table.RowProps {
    row: any;
  }
  interface ToggleCellProps extends Table.CellProps {
    expanded: boolean;
    onToggle(): void;
    row: any;
  }
}

// @public (undocumented)
interface TableRowDetailProps {
  cellComponent: React.ComponentType<TableRowDetail.CellProps>;
  contentComponent: React.ComponentType<TableRowDetail.ContentProps>;
  rowComponent: React.ComponentType<TableRowDetail.RowProps>;
  rowHeight?: number;
  toggleCellComponent: React.ComponentType<TableRowDetail.ToggleCellProps>;
  toggleColumnWidth: number;
}

// @public
declare const TableSelection: React.ComponentType<TableSelectionProps> & {
  COLUMN_TYPE: symbol;
};

// @public (undocumented)
namespace TableSelection {
  interface CellProps extends Table.CellProps {
    onToggle(): void;
    row: any;
    selected: boolean;
  }
  interface HeaderCellProps extends Table.CellProps {
    allSelected: boolean;
    disabled: boolean;
    onToggle: (select?: boolean) => void;
    someSelected: boolean;
  }
  // (undocumented)
  interface RowProps extends Table.RowProps {
    // (undocumented)
    onToggle: () => void;
    // (undocumented)
    selectByRowClick?: boolean;
    // (undocumented)
    selected?: boolean;
  }
}

// @public (undocumented)
interface TableSelectionProps {
  cellComponent: React.ComponentType<TableSelection.CellProps>;
  headerCellComponent: React.ComponentType<TableSelection.HeaderCellProps>;
  highlightRow?: boolean;
  // (undocumented)
  rowComponent: React.ComponentType<TableSelection.RowProps>;
  selectByRowClick?: boolean;
  selectionColumnWidth: number;
  showSelectAll?: boolean;
  showSelectionColumn?: boolean;
}

// @public
declare const TableSummaryRow: React.ComponentType<TableSummaryRowProps> & {
  TREE_ROW_TYPE: symbol;
  GROUP_ROW_TYPE: symbol;
  TOTAL_ROW_TYPE: symbol;
};

// @public (undocumented)
namespace TableSummaryRow {
  interface CellProps extends Table.CellProps {
    children?: React.ReactNode;
    column: Column;
  }
  interface ContentProps {
    children?: React.ReactNode;
  }
  // (undocumented)
  interface IndentProps {
    level: number;
  }
  interface ItemProps {
    children?: React.ReactNode;
    getMessage: (messageKey: string) => string;
    type: SummaryType;
    value?: number | null;
  }
  // (undocumented)
  interface LocalizationMessages {
    avg?: string;
    count?: string;
    max?: string;
    min?: string;
    sum?: string;
  }
}

// @public (undocumented)
interface TableSummaryRowProps {
  formatlessSummaryTypes: Array<string>;
  groupCellComponent: React.ComponentType<TableSummaryRow.CellProps>;
  groupRowComponent: React.ComponentType<Table.RowProps>;
  itemComponent: React.ComponentType<TableSummaryRow.ItemProps>;
  messages?: TableSummaryRow.LocalizationMessages;
  totalCellComponent: React.ComponentType<TableSummaryRow.CellProps>;
  totalRowComponent: React.ComponentType<Table.RowProps>;
  treeCellComponent: React.ComponentType<TableSummaryRow.CellProps>;
  treeColumnCellComponent: React.ComponentType<TableSummaryRow.CellProps>;
  treeColumnContentComponent: React.ComponentType<TableSummaryRow.ContentProps>;
  treeColumnIndentComponent: React.ComponentType<TableSummaryRow.IndentProps>;
  treeRowComponent: React.ComponentType<Table.RowProps>;
}

// @public
declare const TableTreeColumn: React.ComponentType<TableTreeColumnProps>;

// @public (undocumented)
namespace TableTreeColumn {
  interface CellProps extends Table.CellProps {
    children?: React.ReactNode;
    column: Column;
    row: any;
    value: any;
  }
  interface CheckboxProps {
    checked: boolean;
    disabled: boolean;
    indeterminate: boolean;
    onChange(): void;
  }
  interface ContentProps {
    children?: React.ReactNode;
  }
  interface ExpandButtonProps {
    expanded: boolean;
    onToggle(): void;
    visible: boolean;
  }
  interface IndentProps {
    level: number;
  }
}

// @public (undocumented)
interface TableTreeColumnProps {
  cellComponent: React.ComponentType<TableTreeColumn.CellProps>;
  checkboxComponent: React.ComponentType<TableTreeColumn.CheckboxProps>;
  contentComponent: React.ComponentType<TableTreeColumn.ContentProps>;
  expandButtonComponent: React.ComponentType<TableTreeColumn.ExpandButtonProps>;
  for: string;
  indentComponent: React.ComponentType<TableTreeColumn.IndentProps>;
  showSelectAll?: boolean;
  showSelectionControls?: boolean;
}

// @public
declare const Toolbar: React.ComponentType<ToolbarProps>;

// @public (undocumented)
namespace Toolbar {
  interface RootProps {
    children?: React.ReactNode;
  }
}

// @public (undocumented)
interface ToolbarProps {
  rootComponent: React.ComponentType<Toolbar.RootProps>;
}

// @public
declare const TreeDataState: React.ComponentType<TreeDataStateProps>;

// @public (undocumented)
interface TreeDataStateProps {
  defaultExpandedRowIds?: Array<number | string>;
  expandedRowIds?: Array<number | string>;
  onExpandedRowIdsChange?: (expandedRowIds: Array<number | string>) => void;
}

// @public (undocumented)
type TreeDataStateState = {
  // (undocumented)
  expandedRowIds: Array<number | string>;
};

// @public
declare const VirtualTable: React.ComponentType<VirtualTableProps> & {
    COLUMN_TYPE: symbol;
    ROW_TYPE: symbol;
    NODATA_ROW_TYPE: symbol;
};

// @public (undocumented)
interface VirtualTableProps {
    bodyComponent: React.ComponentType<object>;
    cellComponent: React.ComponentType<Table.DataCellProps>;
    columnExtensions?: Array<Table.ColumnExtension>;
    containerComponent: React.ComponentType<object>;
    estimatedRowHeight: number;
    footerComponent: React.ComponentType<object>;
    headComponent: React.ComponentType<object>;
    height: number | string;
    messages?: Table.LocalizationMessages;
    noDataCellComponent: React.ComponentType<Table.NoDataCellProps>;
    noDataRowComponent: React.ComponentType<Table.RowProps>;
    rowComponent: React.ComponentType<Table.DataRowProps>;
    stubCellComponent: React.ComponentType<Table.CellProps>;
    stubHeaderCellComponent: React.ComponentType<Table.CellProps>;
    stubRowComponent: React.ComponentType<Table.RowProps>;
    tableComponent: React.ComponentType<object>;
}


// (No @packageDocumentation comment for this package)
