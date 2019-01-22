import { PureComputed } from '@devexpress/dx-core';
import { TableColumn } from './table.types';

export type ColumnOrder = ReadonlyArray<string>;

export type OrderedColumnsComputed = PureComputed<[TableColumn[], ColumnOrder]>;
export type DraftOrderComputed = PureComputed<[ColumnOrder, number, number]>;

export type ChangeColumnOrderPayload = { sourceColumnName: string, targetColumnName: string };
