import * as React from 'react';
import { memoize, MemoizedComputed } from '@devexpress/dx-core';
import {
  Plugin, Getter, Action, createStateHelper, StateHelper, ActionFn, Getters,
} from '@devexpress/dx-react-core';
import {
  tableColumnsWithWidths,
  tableColumnsWithDraftWidths,
  changeTableColumnWidth,
  draftTableColumnWidth,
  cancelTableColumnWidthDraft,
  ColumnWidthPayload,
  TableColumnWidthInfo,
  TABLE_DATA_TYPE,
} from '@devexpress/dx-grid-core';
import { TableColumnResizingProps, TableColumnResizingState, CellWidthGetter } from '../types';

const pluginDependencies = [
  { name: 'Table' },
];

// tslint:disable-next-line: max-line-length
class TableColumnResizingBase extends React.PureComponent<TableColumnResizingProps, TableColumnResizingState> {
  static defaultProps = {
    defaultColumnWidths: [],
  };
  changeTableColumnWidth: ActionFn<ColumnWidthPayload>;
  draftTableColumnWidth: ActionFn<ColumnWidthPayload>;
  cancelTableColumnWidthDraft: ActionFn<any>;
  storeWidthGetters: ActionFn<object>;
  cacheWidth: (payload) => void;
  clearCache: (payload) => void;
  tableColumnsComputed: MemoizedComputed<TableColumnWidthInfo[], typeof tableColumnsWithWidths>;
  // tslint:disable-next-line: max-line-length
  tableColumnsDraftComputed: MemoizedComputed<TableColumnWidthInfo[], typeof tableColumnsWithDraftWidths>;

  widthGetters: { [colName: string]: CellWidthGetter } = {};
  cachedWidth: number = undefined as any;

  constructor(props) {
    super(props);

    this.state = {
      columnWidths: props.columnWidths || props.defaultColumnWidths,
      draftColumnWidths: [],
    };

    // this.cachedColumn = undefined as any;

    const stateHelper: StateHelper = createStateHelper(
      this,
      {
        columnWidths: () => {
          const { onColumnWidthsChange } = this.props;
          return onColumnWidthsChange;
        },
      },
    );

    this.tableColumnsComputed = memoize(
      columnWidths => (
        { tableColumns }: Getters,
      ) => tableColumnsWithWidths(tableColumns, columnWidths),
    );
    this.tableColumnsDraftComputed = memoize(
      draftColumnWidths => (
        { tableColumns }: Getters,
      ) => tableColumnsWithDraftWidths(tableColumns, draftColumnWidths),
    );

    this.changeTableColumnWidth = stateHelper.applyReducer.bind(
      stateHelper, (prevState, payload) => {
        const width = this.cachedWidth;
        this.clearCache(payload);
        const { minColumnWidth } = this.props;
        return changeTableColumnWidth(
          prevState,
          { ...payload, width, minColumnWidth },
        );
      },
    );
    this.draftTableColumnWidth = stateHelper.applyReducer.bind(
      stateHelper, (prevState, payload) => {
        this.cacheWidth(payload);
        const { minColumnWidth } = this.props;
        return draftTableColumnWidth(
          prevState,
          { ...payload, width: this.cachedWidth, minColumnWidth },
        );
      },
    );
    this.cancelTableColumnWidthDraft = stateHelper.applyReducer.bind(
      stateHelper, cancelTableColumnWidthDraft,
    );

    this.cacheWidth = ({ columnName }) => {
      const width = this.cachedWidth
        ? this.cachedWidth
        : this.widthGetters[columnName]();
      if (!this.cachedWidth) {
        this.cachedWidth = width;
      }
    };
    this.clearCache = () => {
      this.cachedWidth = undefined as any;
    };

    this.storeWidthGetters = memoize(({ tableColumn, getter, tableColumns }) => {
      if (tableColumn.type === TABLE_DATA_TYPE) {
        this.widthGetters[tableColumn.column!.name] = getter;
      }
      Object.keys(this.widthGetters)
      .forEach((columnName) => {
        const columnIndex = tableColumns
          .findIndex(({ type, column }) => type === TABLE_DATA_TYPE && column!.name === columnName);
        if (columnIndex === -1) {
          delete this.widthGetters[columnName];
        }
      });
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      columnWidths = prevState.columnWidths,
    } = nextProps;

    return {
      columnWidths,
    };
  }

  render() {
    const { columnWidths, draftColumnWidths } = this.state;

    const tableColumnsComputed = this.tableColumnsComputed(columnWidths);
    const tableColumnsDraftComputed = this.tableColumnsDraftComputed(draftColumnWidths);

    return (
      <Plugin
        name="TableColumnResizing"
        dependencies={pluginDependencies}
      >
        <Getter name="tableColumnResizingEnabled" value />
        <Getter name="tableColumns" computed={tableColumnsComputed} />
        <Getter name="tableColumns" computed={tableColumnsDraftComputed} />
        <Action name="changeTableColumnWidth" action={this.changeTableColumnWidth} />
        <Action name="draftTableColumnWidth" action={this.draftTableColumnWidth} />
        <Action name="cancelTableColumnWidthDraft" action={this.cancelTableColumnWidthDraft} />
        <Action name="storeWidthGetters" action={this.storeWidthGetters} />
      </Plugin>
    );
  }
}

/* tslint:disable: max-line-length */
/** A plugin that manages table column widths. */
export const TableColumnResizing: React.ComponentType<TableColumnResizingProps> = TableColumnResizingBase;
/* tslint:enable: max-line-length */
