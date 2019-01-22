import { PureComputed } from '@devexpress/dx-core';
import { Column } from '../../types/grid-core.types';

type ColumnChooserItem = { column: Column, hidden: boolean };

export const columnChooserItems: PureComputed<[Column[], string[]], ColumnChooserItem[]> = (
  columns, hiddenColumnNames,
) => columns.map(column => ({
  column,
  hidden: hiddenColumnNames.indexOf(column.name) !== -1,
}));
