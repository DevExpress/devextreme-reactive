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
    resizingMode: 'widget',
  };
  changeTableColumnWidth: ActionFn<ColumnWidthPayload>;
  draftTableColumnWidth: ActionFn<ColumnWidthPayload>;
  cancelTableColumnWidthDraft: ActionFn<any>;
  storeWidthGetters: ActionFn<object>;
  storeCache: (payload) => void;
  clearCache: () => void;
  tableColumnsComputed: MemoizedComputed<TableColumnWidthInfo[], typeof tableColumnsWithWidths>;
  // tslint:disable-next-line: max-line-length
  tableColumnsDraftComputed: MemoizedComputed<TableColumnWidthInfo[], typeof tableColumnsWithDraftWidths>;

  widthGetters: { [colName: string]: CellWidthGetter } = {};
  cachedWidths: { [colName: string]: number } = {};

  constructor(props) {
    super(props);

    this.state = {
      columnWidths: props.columnWidths || props.defaultColumnWidths,
      draftColumnWidths: [],
    };

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
      ) => tableColumnsWithWidths(tableColumns, columnWidths, this.props.resizingMode!),
    );
    this.tableColumnsDraftComputed = memoize(
      draftColumnWidths => (
        { tableColumns }: Getters,
      ) => tableColumnsWithDraftWidths(
        tableColumns, draftColumnWidths, this.props.resizingMode!,
      ),
    );

    this.changeTableColumnWidth = stateHelper.applyReducer.bind(
      stateHelper, (prevState, payload) => {
        const cachedWidths = { ...this.cachedWidths };
        const { minColumnWidth, maxColumnWidth, columnExtensions, resizingMode } = this.props;
        return changeTableColumnWidth(
          prevState,
          { ...payload, cachedWidths, resizingMode,
            minColumnWidth, maxColumnWidth, columnExtensions },
        );
      },
    );
    this.draftTableColumnWidth = stateHelper.applyReducer.bind(
      stateHelper, (prevState, payload) => {
        this.storeCache(payload);
        const cachedWidths = this.cachedWidths;
        const { minColumnWidth, maxColumnWidth, columnExtensions, resizingMode } = this.props;
        return draftTableColumnWidth(
          prevState,
          { ...payload, cachedWidths, resizingMode,
            minColumnWidth, maxColumnWidth, columnExtensions },
        );
      },
    );
    this.cancelTableColumnWidthDraft = stateHelper.applyReducer.bind(
      stateHelper, cancelTableColumnWidthDraft,
    );

    this.storeCache = ({ columnName, nextColumnName }) => {
      if (Object.keys(this.cachedWidths).length === 0) {
        this.cachedWidths[columnName] = this.widthGetters[columnName]();
        if (nextColumnName) {
          this.cachedWidths[nextColumnName] = this.widthGetters[nextColumnName]();
        }
      }
    };
    this.clearCache = () => {
      Object.keys(this.cachedWidths)
      .forEach(columnName => delete this.cachedWidths[columnName]);
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

  componentDidUpdate (_, prevState) {
    const { columnWidths: currentWidths } = this.state;
    const { columnWidths: prevWidths } = prevState;
    if (currentWidths !== prevWidths) {
      this.clearCache();
    }
  }

  render() {
    const { columnWidths, draftColumnWidths } = this.state;
    const { resizingMode } = this.props;
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
        <Getter name="columnResizingMode" value={resizingMode} />
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
