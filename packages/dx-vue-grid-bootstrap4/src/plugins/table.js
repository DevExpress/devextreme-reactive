import { Table as TableBase } from '@devexpress/dx-vue-grid';

import { TableLayout } from '../templates/table-layout';
import { TableContainer } from '../templates/table-container';
import { Table as TableRoot } from '../templates/table';
import { TableHead } from '../templates/table-head';
import { TableBody } from '../templates/table-body';
import { TableRow } from '../templates/table-row';
import { TableCell } from '../templates/table-cell';
import { TableNoDataCell } from '../templates/table-no-data-cell';
import { TableHeaderStubCell } from '../templates/table-header-stub-cell';
import { TableStubCell } from '../templates/table-stub-cell';

const defaultMessages = {
  noData: 'No data',
};

export const Table = {
  name: 'Table',
  functional: true,
  render(h, context) {
    return (
      <TableBase
        layoutComponent={TableLayout}
        containerComponent={TableContainer}
        tableComponent={TableRoot}
        headComponent={TableHead}
        bodyComponent={TableBody}
        rowComponent={TableRow}
        cellComponent={TableCell}
        noDataCellComponent={TableNoDataCell}
        noDataRowComponent={TableRow}
        stubCellComponent={TableStubCell}
        stubHeaderCellComponent={TableHeaderStubCell}
        messages={{ ...defaultMessages, ...context.props.messages }}
        {...{ attrs: context.props, on: context.listeners }}
      />
    );
  },
};
