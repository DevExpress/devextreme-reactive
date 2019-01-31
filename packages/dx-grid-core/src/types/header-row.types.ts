import { TableColumn, TableRow } from './table.types';
import { PureComputed } from '@devexpress/dx-core';

export type HeaderColumnChain = { start: number, columns: ReadonlyArray<TableColumn> };
export type HeaderColumnChainRow = HeaderColumnChain[];
export type HeaderColumnChainRows = HeaderColumnChainRow[];

export type ShouldSplitChainFn = PureComputed<
  [HeaderColumnChain, TableColumn, number],
  boolean
>;

export type ExtendColumnChainFn = PureComputed<[TableColumn], {}>;

export type GetHeaderColumnChainsFn<P0, P1 = any, P2 = any> = PureComputed<
  [P0, P1, P2],
  HeaderColumnChainRows
>;

export type SplitHeaderColumnChainsFn = PureComputed<
  [HeaderColumnChainRows, TableColumn[], ShouldSplitChainFn, ExtendColumnChainFn]
>;

export type FindChainByColumnIndexFn = PureComputed<
  [HeaderColumnChainRow, number],
  HeaderColumnChain
>;

export type GenerateChainsFn = PureComputed<[TableRow[], TableColumn[]], HeaderColumnChainRows>;
