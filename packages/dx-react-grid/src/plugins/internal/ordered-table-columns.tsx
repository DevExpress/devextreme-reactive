import * as React from 'react';
import {
  Getter,
  Plugin,
  Getters,
} from '@devexpress/dx-react-core';
import {
  orderedColumns,
} from '@devexpress/dx-grid-core';
import { OrderedTableColumnsProps } from '../../types';

const columnsComputed = (
  { tableColumns, columnOrder }: Getters,
) => orderedColumns(tableColumns, columnOrder);

/** @internal */
export const OrderedTableColumns: React.FunctionComponent<
  OrderedTableColumnsProps
> = React.memo(({
  order,
}) => (
  <Plugin>
    <Getter name="columnOrder" value={order} />
    <Getter name="tableColumns" computed={columnsComputed} />
  </Plugin>
));

OrderedTableColumns.defaultProps = {
  order: [],
};
