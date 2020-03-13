import * as React from 'react';
import {
  Getter,
  Plugin,
  Getters,
} from '@devexpress/dx-react-core';
import {
  visibleTableColumns,
} from '@devexpress/dx-grid-core';
import { VisibleTableColumnsProps } from '../../types';

const visibleTableColumnsComputed = (
  { tableColumns, hiddenColumnNames }: Getters,
) => visibleTableColumns(tableColumns, hiddenColumnNames);

/** @internal */
export const VisibleTableColumns: React.FunctionComponent<
  VisibleTableColumnsProps
> = React.memo(({
  hiddenColumnNames,
}) => (
  <Plugin>
    <Getter name="hiddenColumnNames" value={hiddenColumnNames} />
    <Getter name="tableColumns" computed={visibleTableColumnsComputed} />
  </Plugin>
));

VisibleTableColumns.defaultProps = {
  hiddenColumnNames: [],
};
