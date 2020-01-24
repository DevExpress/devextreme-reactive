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

/** @internal */
export const OrderedTableColumns: React.FunctionComponent<
  OrderedTableColumnsProps
> = ({
  order,
}) => {
  const columnsComputed = (
    { tableColumns }: Getters,
  ) => orderedColumns(tableColumns, order!);

  return (
    <Plugin>
      <Getter name="tableColumns" computed={columnsComputed} />
    </Plugin>
  );
};

OrderedTableColumns.defaultProps = {
  order: [],
};
