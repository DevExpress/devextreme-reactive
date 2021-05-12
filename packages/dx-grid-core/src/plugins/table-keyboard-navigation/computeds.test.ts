import { TABLE_FILTER_TYPE, TABLE_HEADING_TYPE } from '@devexpress/dx-grid-core';
import { getNextFocusedElement } from './computeds';

const generateElements = (tableColumns, tableBodyRows, extraParts) => {
    const elements = extraParts.reduce((prev, p) => {
        prev[p] = [];
        if(p === 'toolbar' || p === 'paging') {
            prev[p]['none'] = [`test_${p}_1`, `test_${p}_2`, `test_${p}_3`];
        } else {
            tableColumns.forEach((c) => {
                prev[p][c.key] = ['test_cell_1', 'test_cell_2'];
            });
        }
        return prev;
    }, []);
    tableBodyRows.forEach((r) => {
        elements[r.key] = [];
        tableColumns.forEach((c) => {
            elements[r.key][c.key] = ['test_cell_1', 'test_cell_2'];
        });
    });
    return elements;
};
const tableColumns = [
    { key: 'test_column_1' },
    { key: 'test_column_2' }, 
    { key: 'test_column_3' },
    { key: 'test_column_4' }
] as any;
const tableBodyRows = [
    { key: 'test_row_1' },
    { key: 'test_row_2' },
    { key: 'test_row_3' }
] as any;

describe("No focused element", () => {
    const focusedElement = {
        rowKey: undefined,
        columnKey: undefined,
        index: undefined,
        part: undefined,
    };
    const key = 'Tab';
    const shiftKey = false;
    it('should return element from toolbar', () => {
        const elements = generateElements(tableColumns, tableBodyRows, 
            ['paging', 'toolbar', TABLE_FILTER_TYPE.toString(), TABLE_HEADING_TYPE.toString()]);
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, key, shiftKey);
        expect(element).toEqual({
            rowKey: 'toolbar',
            columnKey: 'none',
            index: 0,
            part: 'toolbar'
        });
    });

    it('should return cell from header', () => {
        const header = TABLE_HEADING_TYPE.toString();
        const elements = generateElements(tableColumns, tableBodyRows, 
            [TABLE_FILTER_TYPE.toString(), header]);
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, key, shiftKey);
        expect(element).toEqual({
            rowKey: header,
            columnKey: 'test_column_1',
            index: 0,
            part: header
        });
    });

    it('should not be errors if there is no elements', () => {
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, [], key, shiftKey);
        expect(element).toBe(undefined);
    });

    it('should not return element if key pressed is not tab', () => {
        const elements = generateElements(tableColumns, tableBodyRows, 
            ['paging', 'toolbar', TABLE_FILTER_TYPE.toString(), TABLE_HEADING_TYPE.toString()]);
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, 'Enter', shiftKey);
        expect(element).toBe(undefined);
    });
});

describe("Focused element in the toolbar", () => {
    const focusedElement = {
        rowKey: 'toolbar',
        columnKey: 'none',
        index: 1,
        part: 'toolbar',
    };
    const key = 'Tab';
    const shiftKey = false;

    it('should return next element, tab key pressed', () => {
        const elements = generateElements(tableColumns, tableBodyRows, 
            ['paging', 'toolbar', TABLE_FILTER_TYPE.toString(), TABLE_HEADING_TYPE.toString()]);
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, key, shiftKey);
        expect(element).toEqual({
            rowKey: 'toolbar',
            columnKey: 'none',
            index: 2,
            part: 'toolbar'
        });
    });

    it('should return prev element, tab + shift key pressed', () => {
        const elements = generateElements(tableColumns, tableBodyRows, 
            ['paging', 'toolbar', TABLE_FILTER_TYPE.toString(), TABLE_HEADING_TYPE.toString()]);
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, key, true);
        expect(element).toEqual({
            rowKey: 'toolbar',
            columnKey: 'none',
            index: 0,
            part: 'toolbar'
        });
    });

    it('should not return element, arrow left key', () => {
        const elements = generateElements(tableColumns, tableBodyRows, 
            ['paging', 'toolbar', TABLE_FILTER_TYPE.toString(), TABLE_HEADING_TYPE.toString()]);
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, 'ArrowLeft', shiftKey);
        expect(element).toBe(undefined);
    });

    it('should return cell from header, focused element is last element in the toolbar', () => {
        const focusedElement = {
            rowKey: 'toolbar',
            columnKey: 'none',
            index: 2,
            part: 'toolbar',
        };
        const header = TABLE_HEADING_TYPE.toString();
        const elements = generateElements(tableColumns, tableBodyRows, 
            ['paging', 'toolbar', TABLE_FILTER_TYPE.toString(), header]);
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, key, shiftKey);
        expect(element).toEqual({
            rowKey: header,
            columnKey: 'test_column_1',
            index: 0,
            part: header
        });
    });
});

describe('Focused element in the header', () => {
    const header = TABLE_HEADING_TYPE.toString();
    const key = 'Tab';
    const shiftKey = false;
    const elements = generateElements(tableColumns, tableBodyRows, 
        ['paging', 'toolbar', TABLE_FILTER_TYPE.toString(), header]);

    it('should return next element in the cell, tab key pressed', () => {
        const focusedElement = {
            rowKey: header,
            columnKey: 'test_column_2',
            index: 0,
            part: header,
        };
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, key, shiftKey);
        expect(element).toEqual({
            rowKey: header,
            columnKey: 'test_column_2',
            index: 1,
            part: header
        });
    });

    it('should return prev element in the cell, tab + shift key pressed', () => {
        const focusedElement = {
            rowKey: header,
            columnKey: 'test_column_2',
            index: 1,
            part: header,
        };
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, key, true);
        expect(element).toEqual({
            rowKey: header,
            columnKey: 'test_column_2',
            index: 0,
            part: header
        });
    });

    it('should return next cell, tab key pressed', () => {
        const focusedElement = {
            rowKey: header,
            columnKey: 'test_column_2',
            index: 1,
            part: header,
        };
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, key, shiftKey);
        expect(element).toEqual({
            rowKey: header,
            columnKey: 'test_column_3',
            index: 0,
            part: header
        });
    });

    it('should return prev cell, tab + shift pressed', () => {
        const focusedElement = {
            rowKey: header,
            columnKey: 'test_column_2',
            index: 0,
            part: header,
        };
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, key, true);
        expect(element).toEqual({
            rowKey: header,
            columnKey: 'test_column_1',
            index: 1,
            part: header
        });
    });

    it('should return first cell from filter, tab key pressed', () => {
        const focusedElement = {
            rowKey: header,
            columnKey: 'test_column_4',
            index: 1,
            part: header,
        };
        const filter = TABLE_FILTER_TYPE.toString();
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, key, shiftKey);
        expect(element).toEqual({
            rowKey: filter,
            columnKey: 'test_column_1',
            index: 0,
            part: filter
        });
    });

    it('should return last cell from toolbar, tab + shift pressed', () => {
        const focusedElement = {
            rowKey: header,
            columnKey: 'test_column_1',
            index: 0,
            part: header,
        };
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, key, true);
        expect(element).toEqual({
            rowKey: 'toolbar',
            columnKey: 'none',
            index: 2,
            part: 'toolbar'
        });
    });

    it('should return prev cell, arrow left key pressed', () => {
        const focusedElement = {
            rowKey: header,
            columnKey: 'test_column_2',
            index: 0,
            part: header,
        };
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, 'ArrowLeft', shiftKey);
        expect(element).toEqual(undefined);
    });

    it('should not return cell, arrow up key pressed', () => {
        const focusedElement = {
            rowKey: header,
            columnKey: 'test_column_2',
            index: 1,
            part: header,
        };
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, 'ArrowUp', shiftKey);
        expect(element).toBe(undefined);
    });

    it('should not return cell, some another key pressed', () => {
        const focusedElement = {
            rowKey: header,
            columnKey: 'test_column_2',
            index: 1,
            part: header,
        };
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, 'SomeKey', shiftKey);
        expect(element).toBe(undefined);
    });
});

describe('Focused element in the body of table', () => {
    const key = 'Tab';
    const shiftKey = false;
    const elements = generateElements(tableColumns, tableBodyRows, 
        ['paging', 'toolbar', TABLE_FILTER_TYPE.toString(), TABLE_HEADING_TYPE.toString()]);
    it('should return next element in the cell, tab key pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 0,
            part: 'body',
        };
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, 'Tab', shiftKey);
        expect(element).toEqual({
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 1,
            part: 'body'
        });
    });

    it('should return prev element in the cell, tab + shift key pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 1,
            part: 'body',
        };
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, 'Tab', true);
        expect(element).toEqual({
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 0,
            part: 'body'
        });
    });

    it('should return next cell, tab key pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 1,
            part: 'body',
        };
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, 'Tab', shiftKey);
        expect(element).toEqual({
            rowKey: 'test_row_2',
            columnKey: 'test_column_3',
            index: 0,
            part: 'body'
        });
    });

    it('should return prev cell, tab + shift key pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 0,
            part: 'body',
        };
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, 'Tab', true);
        expect(element).toEqual({
            rowKey: 'test_row_2',
            columnKey: 'test_column_1',
            index: 1,
            part: 'body'
        });
    });

    it('should return last cell from filter, tab + shift key pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_1',
            columnKey: 'test_column_1',
            index: 0,
            part: 'body',
        };
        const filter = TABLE_FILTER_TYPE.toString();
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, 'Tab', true);
        expect(element).toEqual({
            rowKey: filter,
            columnKey: 'test_column_4',
            index: 1,
            part: filter
        });
    });

    it('should return first element from paging, tab pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_3',
            columnKey: 'test_column_4',
            index: 1,
            part: 'body',
        };
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, 'Tab', shiftKey);
        expect(element).toEqual({
            rowKey: 'paging',
            columnKey: 'none',
            index: 0,
            part: 'paging'
        });
    });

    it('should return next cell, arrow right pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 0,
            part: 'body',
        };
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, 'ArrowRight', shiftKey);
        expect(element).toEqual({
            rowKey: 'test_row_2',
            columnKey: 'test_column_3',
            index: 0,
            part: 'body'
        });
    });

    it('should return prev cell, arrow left pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 0,
            part: 'body',
        };
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, 'ArrowLeft', shiftKey);
        expect(element).toEqual({
            rowKey: 'test_row_2',
            columnKey: 'test_column_1',
            index: 0,
            part: 'body'
        });
    });

    it('should return cell over current cell, arrow up pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 0,
            part: 'body',
        };
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, 'ArrowUp', shiftKey);
        expect(element).toEqual({
            rowKey: 'test_row_1',
            columnKey: 'test_column_2',
            index: 0,
            part: 'body'
        });
    });

    it('should return cell under current cell, arrow down pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 0,
            part: 'body',
        };
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, 'ArrowDown', shiftKey);
        expect(element).toEqual({
            rowKey: 'test_row_3',
            columnKey: 'test_column_2',
            index: 0,
            part: 'body'
        });
    });

    it('should not return cell from filter over current cell, arrow up pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_1',
            columnKey: 'test_column_2',
            index: 0,
            part: 'body',
        };
        const filter = TABLE_FILTER_TYPE.toString();
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, 'ArrowUp', shiftKey);
        expect(element).toEqual(undefined);
    });

    it('should not return element under current cell, under is paging, arrow down pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_3',
            columnKey: 'test_column_2',
            index: 0,
            part: 'body',
        };
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, 'ArrowDown', shiftKey);
        expect(element).toBe(undefined);
    });

    it('should not return element, focused cell is extreme right, arrow right pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_4',
            index: 0,
            part: 'body',
        };
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, 'ArrowRight', shiftKey);
        expect(element).toBe(undefined);
    });

    it('should not return element, focused cell is extreme left, arrow left pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_1',
            index: 0,
            part: 'body',
        };
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, 'ArrowLeft', shiftKey);
        expect(element).toBe(undefined);
    });
});

describe('Focused element in the paging', () => {
    const key = 'Tab';
    const shiftKey = false;
    const elements = generateElements(tableColumns, tableBodyRows, 
        ['paging', 'toolbar', TABLE_FILTER_TYPE.toString(), TABLE_HEADING_TYPE.toString()]);
    const focusedElement = {
        rowKey: 'paging',
        columnKey: 'none',
        index: 1,
        part: 'paging',
    };
    it('should return next element, tab pressed', () => {
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, key, shiftKey);
        expect(element).toEqual({
            rowKey: 'paging',
            columnKey: 'none',
            index: 2,
            part: 'paging',
        });
    });

    it('should return prev element, tab + shift pressed', () => {
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, key, true);
        expect(element).toEqual({
            rowKey: 'paging',
            columnKey: 'none',
            index: 0,
            part: 'paging',
        });
    });

    it('should return body last cell element, tab + shift pressed', () => {
        const focusedElement = {
            rowKey: 'paging',
            columnKey: 'none',
            index: 0,
            part: 'paging',
        };
        const element = getNextFocusedElement(tableColumns, tableBodyRows, focusedElement, elements, key, true);
        expect(element).toEqual({
            rowKey: 'test_row_3',
            columnKey: 'test_column_4',
            index: 1,
            part: 'body',
        });
    });
});