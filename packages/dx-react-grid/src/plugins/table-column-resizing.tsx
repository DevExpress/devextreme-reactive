import * as React from 'react';
import { memoize, Memoized } from '@devexpress/dx-core';
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
} from '@devexpress/dx-grid-core';
import { TableColumnResizingProps, TableColumnResizingState } from '../types';

const pluginDependencies = [
  { name: 'Table' },
];

// tslint:disable-next-line: max-line-length
export class TableColumnResizing extends React.PureComponent<TableColumnResizingProps, TableColumnResizingState> {
  changeTableColumnWidth: ActionFn<ColumnWidthPayload>;
  draftTableColumnWidth: ActionFn<ColumnWidthPayload>;
  cancelTableColumnWidthDraft: ActionFn<any>;
  tableColumnsComputed: Memoized<TableColumnWidthInfo[], typeof tableColumnsWithWidths>;
  tableColumnsDraftComputed: Memoized<TableColumnWidthInfo[], typeof tableColumnsWithDraftWidths>;

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
      ) => tableColumnsWithWidths(tableColumns, columnWidths),
    );
    this.tableColumnsDraftComputed = memoize(
      draftColumnWidths => (
        { tableColumns }: Getters,
      ) => tableColumnsWithDraftWidths(tableColumns, draftColumnWidths),
    );

    this.changeTableColumnWidth = stateHelper.applyReducer.bind(
      stateHelper, (prevState, payload) => {
        const { minColumnWidth } = this.props;
        return changeTableColumnWidth(
          prevState,
          { ...payload, minColumnWidth },
        );
      },
    );
    this.draftTableColumnWidth = stateHelper.applyReducer.bind(
      stateHelper, (prevState, payload) => {
        const { minColumnWidth } = this.props;
        return draftTableColumnWidth(
          prevState,
          { ...payload, minColumnWidth },
        );
      },
    );
    this.cancelTableColumnWidthDraft = stateHelper.applyReducer.bind(
      stateHelper, cancelTableColumnWidthDraft,
    );
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
      </Plugin>
    );
  }
}
