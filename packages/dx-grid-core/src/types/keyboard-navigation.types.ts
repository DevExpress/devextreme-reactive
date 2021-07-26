import { TableColumn, TableRow, } from '../types';

export interface FocusedElement {
    rowKey: string,
    columnKey: string,
    index?: number,
    part: string
}

export type Elements = any[][];

export type GetNextFocusedElementFn = (tableColumns: TableColumn[], tableBodyRows: TableRow[], tableHeaderRows: TableRow[],
    elements: Elements, event: any, focusedElement?: FocusedElement) => FocusedElement | void;

export type GetFocusedElementFn = (key: string, shiftKey: boolean, focusedElement: FocusedElement, 
    tableColumns: TableColumn[], tableBodyRows: TableRow[], elements: Elements) => FocusedElement | void;

export type GetElementFn = (focusedElement: FocusedElement, tableBodyRows: TableRow[], 
    tableColumns: TableColumn[], tableHeaderRows: TableRow[], elements: Elements) => FocusedElement | void;

export type getElementPrevNextPartFn = (focusedElement: FocusedElement, elements: Elements, 
    tableBodyRows: TableRow[], tableColumns: TableColumn[]) => FocusedElement | void;