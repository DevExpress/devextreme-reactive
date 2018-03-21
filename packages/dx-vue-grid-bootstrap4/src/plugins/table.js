import { Table as TableBase } from '@devexpress/dx-vue-grid';

import { TableLayout } from '../templates/table-layout';
import { TableContainer } from '../templates/table-container';
import { Table as TableRoot } from '../templates/table';
import { TableHead } from '../templates/table-head';
import { TableBody } from '../templates/table-body';
import { TableRow } from '../templates/table-row';
import { TableCell } from '../templates/table-cell';

export const Table = {
  name: 'Table',
  render() {
    return (
      <TableBase
        layoutComponent={TableLayout}
        containerComponent={TableContainer}
        tableComponent={TableRoot}
        headComponent={TableHead}
        bodyComponent={TableBody}
        rowComponent={TableRow}
        cellComponent={TableCell}
        {...{ attrs: this.$attrs, listeners: this.$listeners }}
      />
    );
  },
};
