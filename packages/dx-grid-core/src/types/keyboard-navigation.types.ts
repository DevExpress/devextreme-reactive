import { PureComputed } from '@devexpress/dx-core';
import { TableColumn, TableRow, RowId } from '../types';

export interface FocusedElement {
  rowKey: string;
  columnKey: string;
  index?: number;
  part: string;
}

export type Elements = {[key: string]: any[]};
export type ScrollToColumnFn = (value: symbol) => void;

export type GetNextFocusedElementFn = PureComputed<[
    TableColumn[], TableRow[], TableRow[], RowId[], Elements, any,
    FocusedElement?, ScrollToColumnFn?], FocusedElement | void>;

export type GetFocusedElementFn = PureComputed<[
    string, boolean, FocusedElement, TableColumn[], TableRow[], Elements,
 ], FocusedElement | void>;

export type GetElementFn = PureComputed<[
    FocusedElement, TableRow[], TableColumn[], TableRow[], Elements,
    ScrollToColumnFn?], FocusedElement | void>;

export type GetElementPrevNextPartFn = PureComputed<[FocusedElement, Elements,
    TableRow[], TableColumn[], ScrollToColumnFn?,
], FocusedElement | void>;

export type GetInnerElementsFn = PureComputed<[
    Elements, string, string, string?,
 ], any[]>;

export type GetNextPrevPartFn = PureComputed<[FocusedElement, Elements, TableRow[]],
string | void>;

export type GetNextPrevCellFromBodyFn = PureComputed<[
  number, number, TableColumn[], TableRow[], FocusedElement, Elements,
  ScrollToColumnFn?], FocusedElement | void>;

export type GetPrevCellFromHeadingFn = PureComputed<[
  TableRow[], TableColumn[], number, FocusedElement, Elements,
], FocusedElement | void>;

export type GetNextCellFromHeadingFn = PureComputed<[
  TableRow[], TableRow[], TableColumn[], number, FocusedElement, Elements,
  ScrollToColumnFn?], FocusedElement | void>;

export type GetCellNextPrevPartFn = PureComputed<[
  FocusedElement, Elements, TableRow[], TableColumn[], number,
  ScrollToColumnFn?], FocusedElement | void>;

export interface FocusedCell {
  columnKey: string;
  rowKey: string;
}

export type OnFocusedCellChangeFn = (cell: FocusedCell) => void;
