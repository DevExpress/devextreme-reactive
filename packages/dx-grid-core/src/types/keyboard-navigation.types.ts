import { PureComputed } from '@devexpress/dx-core';
import { TableColumn, TableRow, RowId } from '../types';

export interface FocusedElement {
  rowKey: string;
  columnKey: string;
  index?: number;
  part: string;
}

export type FocusedElementWScrolling = {
  element?: FocusedElement,
  scrolling?: 'left' | 'right',
};

export type Elements = {[key: string]: any[]};
export type ScrollToColumnFn = (value: symbol) => void;
export type InlineEditing = {
  stopEditCells?: (arg: any) => void,
  commitChangedRows?: (arg: any) => void,
  cancelChangedRows?: (arg: any) => void,
  startEditCells?: (arg: any) => void,
};

export type GetNextFocusedElementFn = PureComputed<[
    TableColumn[], TableRow[], TableRow[], RowId[], Elements, any, InlineEditing,
    FocusedElement?, ScrollToColumnFn?], FocusedElementWScrolling>;

export type GetFocusedElementFn = PureComputed<[
    string, boolean, FocusedElement, TableColumn[], TableRow[], Elements,
 ], FocusedElement | void>;

export type GetElementFn = PureComputed<[
    FocusedElement, TableRow[], TableColumn[], TableRow[], Elements,
    ScrollToColumnFn?], FocusedElementWScrolling>;

export type GetElementPrevNextPartFn = PureComputed<[FocusedElement, Elements,
    TableRow[], TableColumn[], ScrollToColumnFn?,
], FocusedElementWScrolling>;

export type GetInnerElementsFn = PureComputed<[
    Elements, string, string, string?,
 ], any[]>;

export type GetNextPrevPartFn = PureComputed<[FocusedElement, Elements, TableRow[]],
string | void>;

export type GetNextPrevCellFromBodyFn = PureComputed<[
  number, number, TableColumn[], TableRow[], FocusedElement, Elements,
  ScrollToColumnFn?], FocusedElementWScrolling>;

export type GetPrevCellFromHeadingFn = PureComputed<[
  TableRow[], TableColumn[], number, FocusedElement, Elements,
], FocusedElementWScrolling>;

export type GetNextCellFromHeadingFn = PureComputed<[
  TableRow[], TableRow[], TableColumn[], number, FocusedElement, Elements,
  ScrollToColumnFn?], FocusedElementWScrolling>;

export type GetCellNextPrevPartFn = PureComputed<[
  FocusedElement, Elements, TableRow[], TableColumn[], number,
  ScrollToColumnFn?], FocusedElementWScrolling>;

export interface FocusedCell {
  columnKey: string;
  rowKey: string;
}

export type OnFocusedCellChangeFn = (cell: FocusedCell) => void;
