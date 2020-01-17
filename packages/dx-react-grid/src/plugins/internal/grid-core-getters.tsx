import * as React from 'react';
import {
  Getter, Plugin,
} from '@devexpress/dx-react-core';
import { rowIdGetter, cellValueGetter } from '@devexpress/dx-grid-core';
import { GridCoreGettersProps } from '../../types';

export const GridCoreGetters: React.FunctionComponent<GridCoreGettersProps> = React.memo(({
  rows,
  columns,
  getRowId,
  getCellValue,
}) => (
  <Plugin>
    <Getter name="rows" value={rows} />
    <Getter name="getRowId" value={rowIdGetter(getRowId!, rows)} />
    <Getter name="columns" value={columns} />
    <Getter name="getCellValue" value={cellValueGetter(getCellValue!, columns)} />
  </Plugin>
));
