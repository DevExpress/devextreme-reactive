import { TableColumn, TableRow } from '../types';

export interface FocusedElement {
    rowKey: string,
    columnKey: string,
    index: number,
    part: string
}

export type Elements = any[][];

export type GetNextFocusedElementFn = (tableColumns: TableColumn[], tableBodyRows: TableRow[], 
    elements: Elements, key: string, shiftKey: boolean, focusedElement?: FocusedElement) => FocusedElement | undefined;

export type GetFocusedElementFn = (key: string, shiftKey: boolean, focusedElement: FocusedElement, 
    tableColumns: TableColumn[], tableBodyRows: TableRow[], elements: Elements) => FocusedElement | undefined;

export type GetElementFn = (focusedElement: FocusedElement, tableBodyRows: TableRow[], 
    tableColumns: TableColumn[], elements: Elements) => FocusedElement | undefined;

export type getElementPrevNextPartFn = (focusedElement: FocusedElement, elements: Elements, 
    tableBodyRows: TableRow[], tableColumns: TableColumn[]) => FocusedElement | undefined;