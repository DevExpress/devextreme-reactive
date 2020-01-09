import * as React from 'react';
import {
  Getter, Plugin,
} from '@devexpress/dx-react-core';
import { tableColumnsWithDataRows, checkTableColumnExtensions } from '@devexpress/dx-grid-core';
import { Table } from '../../types';

export const TableColumnsWithDataRowsGetter: React.FunctionComponent<
  { columnExtensions?: Table.ColumnExtension[]; }
> = React.memo(({ columnExtensions }) => {
  const tableColumnsMemoized = React.useMemo(() => (
    columnExtensions => ({
      columns,
    }) => tableColumnsWithDataRows(columns, columnExtensions)
  ), columnExtensions) 
  const tableColumnsComputed = tableColumnsMemoized(columnExtensions!);
  checkTableColumnExtensions(columnExtensions!);

  return (
    <Plugin>
      <Getter name="tableColumns" computed={tableColumnsComputed} />
    </Plugin>
  );
});
