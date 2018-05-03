import { createRenderComponent } from '@devexpress/dx-vue-core';
import { Table as TableBase } from '@devexpress/dx-vue-grid';
import { Table as TableComponent } from '../templates/table';
import { VirtualTableLayout } from '../templates/virtual-table-layout';
import { TableCell } from '../templates/table-cell';
import { TableRow } from '../templates/table-row';
import { TableNoDataCell } from '../templates/table-no-data-cell';
import { TableStubCell } from '../templates/table-stub-cell';
import { TableStubHeaderCell } from '../templates/table-stub-header-cell';
import { TableContainer } from '../templates/table-container';
import { TableStubRow } from '../templates/table-stub-row';

const FixedHeader = {
  functional: true,
  render(h, context) { return <TableComponent use="head" {...{ attrs: context.props, on: context.listeners }} />; },
};
const TableHead = {
  functional: true,
  render(h, context) { return <thead {...{ attrs: context.props, on: context.listeners }} />; },
};
const TableBody = {
  functional: true,
  render(h, context) { return <tbody {...{ attrs: context.props, on: context.listeners }} />; },
};

const defaultMessages = {
  noData: 'No data',
};

export const VirtualTable = {
  name: 'VirtualTable',
  props: {
    estimatedRowHeight: {
      type: Number,
      default: 49,
    },
    height: {
      type: Number,
      default: 530,
    },
    headTableComponent: {
      type: Object,
      default: () => FixedHeader,
    },
    messages: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    layoutRenderComponent() {
      const { height, estimatedRowHeight, headTableComponent } = this;
      const result = createRenderComponent(VirtualTableLayout, { height, estimatedRowHeight, headTableComponent });
      return result;
    },
  },
  beforeUpdate() {
    const { height, estimatedRowHeight, headTableComponent } = this;
    this.layoutRenderComponent.update({ height, estimatedRowHeight, headTableComponent });
  },
  render() {
    const { messages } = this;

    return (
      <TableBase
        layoutComponent={this.layoutRenderComponent().component}
        tableComponent={TableComponent}
        headComponent={TableHead}
        bodyComponent={TableBody}
        containerComponent={TableContainer}
        rowComponent={TableRow}
        cellComponent={TableCell}
        noDataRowComponent={TableRow}
        noDataCellComponent={TableNoDataCell}
        stubRowComponent={TableStubRow}
        stubCellComponent={TableStubCell}
        stubHeaderCellComponent={TableStubHeaderCell}
        messages={{ ...defaultMessages, messages }}
        // {...{ attrs: restProps, on: context.listeners }}
      />
    );
  },
};

VirtualTable.Cell = TableCell;
VirtualTable.Row = TableRow;
VirtualTable.NoDataCell = TableNoDataCell;
VirtualTable.NoDataRow = TableRow;
VirtualTable.StubRow = TableStubRow;
VirtualTable.StubCell = TableStubCell;
VirtualTable.StubHeaderCell = TableStubCell;
VirtualTable.Table = TableComponent;
VirtualTable.TableHead = TableHead;
VirtualTable.TableBody = TableBody;
VirtualTable.FixedHeader = FixedHeader;
VirtualTable.Container = TableContainer;
