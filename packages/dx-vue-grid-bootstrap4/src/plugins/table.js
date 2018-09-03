import { DxTable as DxTableBase } from '@devexpress/dx-vue-grid';

import { TableLayout } from '../templates/table-layout';
import { TableContainer } from '../templates/table-container';
import { Table as TableRoot } from '../templates/table';
import { TableHead } from '../templates/table-head';
import { TableBody } from '../templates/table-body';
import { TableRow } from '../templates/table-row';
import { TableCell } from '../templates/table-cell';
import { TableNoDataCell } from '../templates/table-no-data-cell';
import { TableStubRow } from '../templates/table-stub-row';
import { TableHeaderStubCell } from '../templates/table-header-stub-cell';
import { TableStubCell } from '../templates/table-stub-cell';

const defaultMessages = {
  noData: 'No data',
};

export const DxTable = {
  name: 'DxTable',
  functional: true,
  props: {
    messages: {
      type: Object,
    },
  },
  render(h, context) {
    return (
      <DxTableBase
        layoutComponent={TableLayout}
        containerComponent={TableContainer}
        tableComponent={TableRoot}
        headComponent={TableHead}
        bodyComponent={TableBody}
        rowComponent={TableRow}
        cellComponent={TableCell}
        noDataCellComponent={TableNoDataCell}
        noDataRowComponent={TableRow}
        stubRowComponent={TableStubRow}
        stubCellComponent={TableStubCell}
        stubHeaderCellComponent={TableHeaderStubCell}
        messages={{ ...defaultMessages, ...context.props.messages }}
        {...context.data}
      />
    );
  },
  components: {
    DxContainer: TableContainer,
    DxTable: TableRoot,
    DxTableHead: TableHead,
    DxTableBody: TableBody,
    DxRow: TableRow,
    DxCell: TableCell,
    DxNoDataCell: TableNoDataCell,
    DxNoDataRow: TableRow,
    DxStubCell: TableStubCell,
    DxStubHeaderCell: TableHeaderStubCell,
    DxStubRow: TableStubRow,
  },
};
