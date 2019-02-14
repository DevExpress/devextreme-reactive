import { PureComputed } from '@devexpress/dx-core';
import { TableColumn } from './table.types';

/** @internal */
export type ColumnOrder = ReadonlyArray<string>;

/** @internal */
export type OrderedColumnsComputed = PureComputed<[TableColumn[], ColumnOrder]>;
/** @internal */
export type DraftOrderComputed = PureComputed<[ColumnOrder, number, number]>;

/** @internal */
export type ChangeColumnOrderPayload = { sourceColumnName: string, targetColumnName: string };
