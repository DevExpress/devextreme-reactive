import { TABLE_FILTER_TYPE, TABLE_HEADING_TYPE, TABLE_DATA_TYPE, TABLE_BAND_TYPE } from '@devexpress/dx-grid-core';
import { 
    getNextFocusedCell, getInnerElements, getCellTopBottom,
    getPart, getIndexToFocus, processEvents, handleOnFocusedCallChanged, filterHeaderRows
} from './computeds';

const generateElements = (tableColumns, tableBodyRows, extraParts, innerElementsCount = 2, tagName?, type?, action?) => {
    let innerElements = [];
    for(let i = 0; i < innerElementsCount; i++) {
        innerElements.push({
            hasAttribute: jest.fn().mockReturnValue(false),
            getAttribute: jest.fn().mockReturnValue("1"),
            tagName: tagName,
            type: type,
            click: action
        })
    }
    const refElement = { current: { querySelectorAll: jest.fn().mockReturnValue(innerElements) } };
    const elements = extraParts.reduce((prev, p) => {
        prev[p] = [];
        tableColumns.forEach((c) => {
            prev[p][c.key] = [refElement];
        });
        return prev;
    }, []);
    tableBodyRows.forEach((r) => {
        elements[r.key] = [];
        tableColumns.forEach((c) => {
            elements[r.key][c.key] = [refElement];
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

const body = TABLE_DATA_TYPE.toString();

describe("No focused element, key = Tab", () => {
    const key = 'Tab';
    const header = TABLE_HEADING_TYPE.toString();
    const filter = TABLE_FILTER_TYPE.toString();
    const tableHeaderRows = [{ key: header }] as any;
    const expandedRowIds = [];
    it('should return cell from header', () => {
        const elements = generateElements(tableColumns, tableBodyRows, [filter, header]);
        
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key });
        expect(element).toEqual({
            rowKey: header,
            columnKey: 'test_column_1',
            part: header
        });
    });

    it('should return cell from body', () => {
        const elements = generateElements(tableColumns, tableBodyRows, []);
        
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key });
        expect(element).toEqual({
            rowKey: 'test_row_1',
            columnKey: 'test_column_1',
            part: body
        });
    });

    it('should not be errors if there is no elements', () => {
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, [], { key });
        expect(element).toBe(undefined);
    });

    it('should not return element if key pressed is not tab', () => {
        const elements = generateElements(tableColumns, tableBodyRows, [filter, header]);
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key: 'Enter' });
        expect(element).toBe(undefined);
    });

    it('should return cell from header, focused element is last in the toolbar', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, [filter, header]);
        let innerElements = [{
            hasAttribute: jest.fn().mockReturnValue(false),
            getAttribute: jest.fn().mockReturnValue("1"),
        }, {
            hasAttribute: jest.fn().mockReturnValue(false),
            getAttribute: jest.fn().mockReturnValue("1"),
        }];
        const refElement = { current: { querySelectorAll: jest.fn().mockReturnValue(innerElements) } };
        generatedElements['toolbar'] = [];
        generatedElements['toolbar']['none'] = [refElement];
        
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'Tab', target: innerElements[1] });
        expect(element).toEqual({
            rowKey: header,
            columnKey: 'test_column_1',
            part: header,
            index: 0,
        });
    });

    it('should not return cell from header, focused element is first in the toolbar', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, [filter, header]);
        let innerElements = [{
            hasAttribute: jest.fn().mockReturnValue(false),
            getAttribute: jest.fn().mockReturnValue("1"),
        }, {
            hasAttribute: jest.fn().mockReturnValue(false),
            getAttribute: jest.fn().mockReturnValue("1"),
        }];
        const refElement = { current: { querySelectorAll: jest.fn().mockReturnValue(innerElements) } };
        generatedElements['toolbar'] = [];
        generatedElements['toolbar']['none'] = [refElement];
        
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'Tab', target: innerElements[0] });
        expect(element).toEqual(undefined);
    });

    it('should return cell from body, focused element is first in the paging, shiftKey pressed', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, [filter, header]);
        let innerElements = [{
            hasAttribute: jest.fn().mockReturnValue(false),
            getAttribute: jest.fn().mockReturnValue("1"),
        }, {
            hasAttribute: jest.fn().mockReturnValue(false),
            getAttribute: jest.fn().mockReturnValue("1"),
        }];
        const refElement = { current: { querySelectorAll: jest.fn().mockReturnValue(innerElements) } };
        generatedElements['paging'] = [];
        generatedElements['paging']['none'] = [refElement];
        
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'Tab', shiftKey: true, target: innerElements[0] });
        expect(element).toEqual({
            rowKey: 'test_row_3',
            columnKey: 'test_column_4',
            part: body,
            index: 0,
        });
    });

    it('should not return cell from body, focused element is last in the paging, shiftKey pressed', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, [filter, header]);
        let innerElements = [{
            hasAttribute: jest.fn().mockReturnValue(false),
            getAttribute: jest.fn().mockReturnValue("1"),
        }, {
            hasAttribute: jest.fn().mockReturnValue(false),
            getAttribute: jest.fn().mockReturnValue("1"),
        }];
        const refElement = { current: { querySelectorAll: jest.fn().mockReturnValue(innerElements) } };
        generatedElements['paging'] = [];
        generatedElements['paging']['none'] = [refElement];
        
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'Tab', shiftKey: true, target: innerElements[1] });
        expect(element).toEqual(undefined);
    });
});

describe('Focused element in the header, key = Tab', () => {
    const header = TABLE_HEADING_TYPE.toString();
    const filter = TABLE_FILTER_TYPE.toString();
    const key = 'Tab';
    const tableHeaderRows = [{ key: header }] as any;
    const elements = generateElements(tableColumns, tableBodyRows, [filter, header]);
    const expandedRowIds = [];

    it('should return next element in the cell, tab key pressed', () => {
        const focusedElement = {
            rowKey: header,
            columnKey: 'test_column_2',
            part: header,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key }, focusedElement);
        expect(element).toEqual({
            rowKey: header,
            columnKey: 'test_column_2',
            index: 0,
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
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key, shiftKey: true }, focusedElement);
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
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key }, focusedElement);
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
            part: header,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key, shiftKey: true }, focusedElement);
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
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key }, focusedElement);
        expect(element).toEqual({
            rowKey: filter,
            columnKey: 'test_column_1',
            index: 0,
            part: filter
        });
    });

    it('should not return focused element, tab + shift pressed', () => {
        const focusedElement = {
            rowKey: header,
            columnKey: 'test_column_1',
            index: 0,
            part: header,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key, shiftKey: true }, focusedElement);
        expect(element).toEqual(undefined);
    });

    it('should not return focused element, arrow left key pressed', () => {
        const focusedElement = {
            rowKey: header,
            columnKey: 'test_column_2',
            index: 0,
            part: header,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key: 'ArrowLeft' }, focusedElement);
        expect(element).toEqual(undefined);
    });

    it('should not return cell, arrow up key pressed', () => {
        const focusedElement = {
            rowKey: header,
            columnKey: 'test_column_2',
            index: 1,
            part: header,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key: 'ArrowUp' }, focusedElement);
        expect(element).toBe(undefined);
    });

    it('should not return cell, some another key pressed', () => {
        const focusedElement = {
            rowKey: header,
            columnKey: 'test_column_2',
            index: 1,
            part: header,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key: 'SomeKey' }, focusedElement);
        expect(element).toBe(undefined);
    });

    it('should return cell from filter, tab key pressed, cell contains input component with type - text', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, [filter, header], 2, "INPUT", "text");
        const focusedElement = {
            rowKey: header,
            columnKey: 'test_column_4',
            index: 1,
            part: header,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key }, focusedElement);
        expect(element).toEqual({
            rowKey: filter,
            columnKey: 'test_column_1',
            part: filter
        });
    });

    it('should return cell from filter, tab key pressed, cell contains input component with type - checkbox', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, [filter, header], 2, "INPUT", "checkbox");
        const focusedElement = {
            rowKey: header,
            columnKey: 'test_column_4',
            index: 1,
            part: header,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key }, focusedElement);
        expect(element).toEqual({
            rowKey: filter,
            columnKey: 'test_column_1',
            index: 0,
            part: filter
        });
    });

    it('should return cell from filter, tab key pressed, cell contain span component', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, [filter, header], 2, "SPAN");
        const focusedElement = {
            rowKey: header,
            columnKey: 'test_column_4',
            index: 1,
            part: header,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key }, focusedElement);
        expect(element).toEqual({
            rowKey: filter,
            columnKey: 'test_column_1',
            part: filter
        });
    });

    it('should return next cell, tab key pressed, cell containes input component', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, [header], 2, "INPUT", "text");
        const focusedElement = {
            rowKey: header,
            columnKey: 'test_column_2',
            index: 1,
            part: header,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key }, focusedElement);
        expect(element).toEqual({
            rowKey: header,
            columnKey: 'test_column_3',
            part: header
        });
    });

    it('should return prev cell, tab + shift key pressed, cell containes input component', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, [header], 2, "INPUT", "text");
        const focusedElement = {
            rowKey: header,
            columnKey: 'test_column_2',
            part: header,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key, shiftKey: true }, focusedElement);
        expect(element).toEqual({
            rowKey: header,
            columnKey: 'test_column_1',
            part: header
        });
    });
});

describe('Focused element in the header with banded columns, key = Tab', () => {
    const refElement = { current: { querySelectorAll: jest.fn().mockReturnValue([]) } };
    const header = TABLE_HEADING_TYPE.toString();
    const filter = TABLE_FILTER_TYPE.toString();
    const band = TABLE_BAND_TYPE.toString();
    const key = 'Tab';
    const tableHeaderRows = [ { key: `${band}_0` }, { key: `${band}_1` }, { key: header }] as any;
    const expandedRowIds = [];
    const elements = generateElements(tableColumns, tableBodyRows, [filter, header]);
    elements[`${band}_0`] = {};
    elements[`${band}_0`]['test_column_2'] = [refElement];
    elements[`${band}_1`] = {};
    elements[`${band}_1`]['test_column_4'] = [refElement];

    it('should return band cell', () => {
        const focusedElement = {
            rowKey: header,
            columnKey: 'test_column_1',
            part: header,
            index: 1
        };
        
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key }, focusedElement);
        expect(element).toEqual({
            rowKey: `${band}_0`,
            columnKey: 'test_column_2',
            part: header
        });
    });

    it('should return header cell after band', () => {
        const focusedElement = {
            rowKey: `${band}_0`,
            columnKey: 'test_column_2',
            part: header,
        };
        
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key }, focusedElement);
        expect(element).toEqual({
            rowKey: header,
            columnKey: 'test_column_2',
            part: header
        });
    });

    it('should return header after filter, shift key pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_1',
            columnKey: 'test_column_1',
            part: filter,
        };
        
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key, shiftKey: true }, focusedElement);
        expect(element).toEqual({
            rowKey: header,
            columnKey: 'test_column_4',
            part: header,
            index: 1,
        });
    });

    it('should return band, shift key pressed', () => {
        const focusedElement = {
            rowKey: header,
            columnKey: 'test_column_4',
            part: header,
        };
        
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key, shiftKey: true }, focusedElement);
        expect(element).toEqual({
            rowKey: `${band}_1`,
            columnKey: 'test_column_4',
            part: header,
        });
    });
});

describe('Focused element in the body of table', () => {
    const header = TABLE_HEADING_TYPE.toString();
    const elements = generateElements(tableColumns, tableBodyRows, [TABLE_FILTER_TYPE.toString(), header]);
    const tableHeaderRows = [{ key: header }] as any;
    const expandedRowIds = [];

    it('should return next element in the cell, tab key pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 0,
            part: body,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key: 'Tab' }, focusedElement);
        expect(element).toEqual({
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 1,
            part: body
        });
    });

    it('should return prev cell, tab + shift key pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            part: body,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key: 'Tab', shiftKey: true }, focusedElement);
        expect(element).toEqual({
            rowKey: 'test_row_2',
            columnKey: 'test_column_1',
            index: 1,
            part: body
        });
    });

    it('should return next cell, tab key pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 1,
            part: body,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key: 'Tab' }, focusedElement);
        expect(element).toEqual({
            rowKey: 'test_row_2',
            columnKey: 'test_column_3',
            index: 0,
            part: body
        });
    });

    it('should return prev cell, tab + shift key pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            part: body,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key: 'Tab', shiftKey: true }, focusedElement);
        expect(element).toEqual({
            rowKey: 'test_row_2',
            columnKey: 'test_column_1',
            index: 1,
            part: body
        });
    });

    it('should return last cell from filter, tab + shift key pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_1',
            columnKey: 'test_column_1',
            part: body,
        };
        const filter = TABLE_FILTER_TYPE.toString();
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key: 'Tab', shiftKey: true }, focusedElement);
        expect(element).toEqual({
            rowKey: filter,
            columnKey: 'test_column_4',
            index: 1,
            part: filter
        });
    });

    it('should return last cell prev row, tab + shift key pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_1',
            part: body,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key: 'Tab', shiftKey: true }, focusedElement);
        expect(element).toEqual({
            rowKey: 'test_row_1',
            columnKey: 'test_column_4',
            index: 1,
            part: body
        });
    });

    it('should return next element of cell', () => {
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_4',
            index: 0,
            part: body,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key: 'Tab' }, focusedElement);
        expect(element).toEqual({
            rowKey: 'test_row_2',
            columnKey: 'test_column_4',
            index: 1,
            part: body
        });
    });

    it('should not return focused element after last one, tab pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_3',
            columnKey: 'test_column_4',
            index: 1,
            part: body,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key: 'Tab' }, focusedElement);
        expect(element).toEqual(undefined);
    });

    it('should return next cell, arrow right pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 0,
            part: body,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key: 'ArrowRight' }, focusedElement);
        expect(element).toEqual({
            rowKey: 'test_row_2',
            columnKey: 'test_column_3',
            part: body
        });
    });

    it('should return prev cell, arrow left pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 0,
            part: body,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key: 'ArrowLeft' }, focusedElement);
        expect(element).toEqual({
            rowKey: 'test_row_2',
            columnKey: 'test_column_1',
            part: body
        });
    });

    it('should return cell over current cell, arrow up pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 0,
            part: body,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key: 'ArrowUp' }, focusedElement);
        expect(element).toEqual({
            rowKey: 'test_row_1',
            columnKey: 'test_column_2',
            part: body
        });
    });

    it('should return cell under current cell, arrow down pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            part: body,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key: 'ArrowDown' }, focusedElement);
        expect(element).toEqual({
            rowKey: 'test_row_3',
            columnKey: 'test_column_2',
            part: body
        });
    });

    it('should not return cell from filter over current cell, arrow up pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_1',
            columnKey: 'test_column_2',
            part: body,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key: 'ArrowUp' }, focusedElement);
        expect(element).toEqual(undefined);
    });

    it('should not return element under current cell, arrow down pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_3',
            columnKey: 'test_column_2',
            part: body,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key: 'ArrowDown' }, focusedElement);
        expect(element).toBe(undefined);
    });

    it('should not return element, focused cell is extreme right, arrow right pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_4',
            part: body,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key: 'ArrowRight' }, focusedElement);
        expect(element).toBe(undefined);
    });

    it('should not return element, focused cell is extreme left, arrow left pressed', () => {
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_1',
            part: body,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, elements, { key: 'ArrowLeft' }, focusedElement);
        expect(element).toBe(undefined);
    });

    it('should return last cell from header, tab + shift key pressed, cell containes input component type text', () => {
        const header = TABLE_HEADING_TYPE.toString();
        const generatedElements = generateElements(tableColumns, tableBodyRows, [header], 1, "INPUT", "text");
        const focusedElement = {
            rowKey: 'test_row_1',
            columnKey: 'test_column_1',
            part: body,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'Tab', shiftKey: true }, focusedElement);
        expect(element).toEqual({
            rowKey: header,
            columnKey: 'test_column_4',
            part: header
        });
    });

    it('should return next cell, tab key pressed, cell containes input component type text', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, "INPUT", "text");
        const focusedElement = {
            rowKey: 'test_row_1',
            columnKey: 'test_column_1',
            index: 0,
            part: body,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'Tab' }, focusedElement);
        expect(element).toEqual({
            rowKey: 'test_row_1',
            columnKey: 'test_column_2',
            part: body
        });
    });

    it('should return prev cell, tab + shift key pressed, cell containes input component type text', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, "INPUT", "text");
        const focusedElement = {
            rowKey: 'test_row_1',
            columnKey: 'test_column_3',
            part: body,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'Tab', shiftKey: true }, focusedElement);
        expect(element).toEqual({
            rowKey: 'test_row_1',
            columnKey: 'test_column_2',
            part: body
        });
    });

    it('should not return focused element, shift + key pressed', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, []);
        const focusedElement = {
            rowKey: 'test_row_1',
            columnKey: 'test_column_1',
            index: 0,
            part: body,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'Tab', shiftKey: true }, focusedElement);
        expect(element).toEqual(undefined);
    });
});

describe('Navigation on parts by arrows Up and Down + Ctrl', () => {
    const header = TABLE_HEADING_TYPE.toString();
    const filter = TABLE_FILTER_TYPE.toString();
    const tableHeaderRows = [{ key: header }] as any;
    const expandedRowIds = [];
    const generatedElements = generateElements(tableColumns, tableBodyRows, [filter, header]);
    it('should return filter cell, arrow up', () => {
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 0,
            part: body,
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'ArrowUp', ctrlKey: true }, focusedElement);
        expect(element).toEqual({
            rowKey: filter,
            columnKey: 'test_column_1',
            part: filter
        });
    });

    it('should return body cell, arrow down', () => {
        const focusedElement = {
            rowKey: filter,
            columnKey: 'test_column_2',
            part: filter
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'ArrowDown', ctrlKey: true }, focusedElement);
        expect(element).toEqual({
            rowKey: 'test_row_1',
            columnKey: 'test_column_1',
            part: body
        });
    });

    it('should focus element in the toolbar', () => {
        let innerElements = [];
        for(let i = 0; i < 2; i++) {
            innerElements.push({
                hasAttribute: jest.fn().mockReturnValue(false),
                getAttribute: jest.fn().mockReturnValue("1"),
                focus: jest.fn()
            })
        }
        const refElement = { current: { querySelectorAll: jest.fn().mockReturnValue(innerElements) } };
        generatedElements['toolbar'] = [];
        generatedElements['toolbar']['none'] = [refElement];
        const focusedElement = {
            rowKey: header,
            columnKey: 'test_column_2',
            part: header
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'ArrowUp', ctrlKey: true }, focusedElement);
        expect(element).toEqual(undefined);
        expect(innerElements[0].focus).toBeCalled();
    });

    it('should focus element in the paging', () => {
        let innerElements = [];
        for(let i = 0; i < 2; i++) {
            innerElements.push({
                hasAttribute: jest.fn().mockReturnValue(false),
                getAttribute: jest.fn().mockReturnValue("1"),
                focus: jest.fn()
            })
        }
        const refElement = { current: { querySelectorAll: jest.fn().mockReturnValue(innerElements) } };
        generatedElements['paging'] = [];
        generatedElements['paging']['none'] = [refElement];
        const focusedElement = {
            rowKey: 'test_row_3',
            columnKey: 'test_column_2',
            part: body
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'ArrowDown', ctrlKey: true }, focusedElement);
        expect(element).toEqual(undefined);
        expect(innerElements[0].focus).toBeCalled();
    });

    it('should return cell from header, focused element in toolbar', () => {
        let innerElements = [];
        innerElements.push({
            hasAttribute: jest.fn().mockReturnValue(false),
            getAttribute: jest.fn().mockReturnValue("1"),
            focus: jest.fn()
        });
        const refElement = { current: { querySelectorAll: jest.fn().mockReturnValue(innerElements) } };
        generatedElements['toolbar'] = [];
        generatedElements['toolbar']['none'] = [refElement];
        
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'ArrowDown', ctrlKey: true, target: innerElements[0] });
        expect(element).toEqual({
            rowKey: header,
            columnKey: 'test_column_1',
            part: header,
            index: 0,
        });
    });

    it('should return cell from body, focused element in paging', () => {
        let innerElements = [];
        innerElements.push({
            hasAttribute: jest.fn().mockReturnValue(false),
            getAttribute: jest.fn().mockReturnValue("1"),
            focus: jest.fn()
        });
        const refElement = { current: { querySelectorAll: jest.fn().mockReturnValue(innerElements) } };
        generatedElements['paging'] = [];
        generatedElements['paging']['none'] = [refElement];
        
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'ArrowUp', ctrlKey: true, target: innerElements[0] });
        expect(element).toEqual({
            rowKey: 'test_row_1',
            columnKey: 'test_column_1',
            part: body,
            index: 0,
        });
    });

    it('should not return cell, no focused elements, arrow down', () => {
        let innerElements = [];
        innerElements.push({
            hasAttribute: jest.fn().mockReturnValue(false),
            getAttribute: jest.fn().mockReturnValue("1"),
            focus: jest.fn()
        });
        const refElement = { current: { querySelectorAll: jest.fn().mockReturnValue(innerElements) } };
        generatedElements['toolbar'] = [];
        generatedElements['toolbar']['none'] = [refElement];
        
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'ArrowDown', ctrlKey: true });
        expect(element).toEqual(undefined);
    });

    it('should not return cell, no toolbar, arrow down', () => {
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'ArrowDown', ctrlKey: true });
        expect(element).toEqual(undefined);
    });

    it('should not return cell, no focused elements, arrow up', () => {
        let innerElements = [];
        innerElements.push({
            hasAttribute: jest.fn().mockReturnValue(false),
            getAttribute: jest.fn().mockReturnValue("1"),
            focus: jest.fn()
        });
        const refElement = { current: { querySelectorAll: jest.fn().mockReturnValue(innerElements) } };
        generatedElements['paging'] = [];
        generatedElements['paging']['none'] = [refElement];
        
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'ArrowUp', ctrlKey: true });
        expect(element).toEqual(undefined);
    });

    it('should not return cell, no paging, arrow up', () => {
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'ArrowUp', ctrlKey: true });
        expect(element).toEqual(undefined);
    });
});

describe('Enter action', () => {
    const tableHeaderRows = [{ key: TABLE_HEADING_TYPE.toString() }] as any;
    const expandedRowIds = [];
    it('should return focused element from cell on action on cell, input type text', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, "INPUT", 'text');
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            part: body
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'Enter' }, focusedElement);
        expect(element).toEqual({
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 0,
            part: body
        });
    });

    it('should not return focused element from cell on action on cell, input type checkbox', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, "INPUT", 'checkbox');
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            part: body
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'Enter' }, focusedElement);
        expect(element).toEqual(undefined);
    });

    it('should return cell on enter action on its input', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, "INPUT", 'text');
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 0,
            part: body
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'Enter' }, focusedElement)
        expect(element).toEqual({
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            part: body
        });
    });

    it('should return span from cell on action on cell', () => {
        const click = jest.fn();
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, "SPAN", '', click);
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            part: body
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'Enter' }, focusedElement);
        expect(element).toEqual({
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 0,
            part: body
        });
        expect(click).toBeCalled();
    });

    it('should not return focused element on action on span', () => {
        const click = jest.fn();
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, "SPAN", '', click);
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 0,
            part: body
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'Enter' }, focusedElement);
        expect(element).toBe(undefined);
        expect(click).not.toBeCalled();
    });

    it('should not return focused element on action on cell with other elements', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, []);
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 1,
            part: body
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'Enter' }, focusedElement);
        expect(element).toBe(undefined);
    });

    it('should not return focused element on action on cell, cell empty', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 0)

        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            part: body
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'Enter' }, focusedElement);
        expect(element).toBe(undefined);
    });

    it('should not return focused element, current focused element is undefined', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, "INPUT", "text");
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'Enter' });
        expect(element).toEqual(undefined);
    });
});

describe('Excape action', () => {
    const tableHeaderRows = [{ key: TABLE_HEADING_TYPE.toString() }] as any;
    const expandedRowIds = [];
    it('should return cell on escape action on input', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, "INPUT", "text");
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 0,
            part: body
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'Escape' }, focusedElement);
        expect(element).toEqual({
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            part: body
        });
    });

    it('should not return focused element on escape action on cell', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, "INPUT", "text");
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            part: 'body'
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'Escape' }, focusedElement);
        expect(element).toBe(undefined);
    });

    it('should not return focused element on escape action on span', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, "SPAN");
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 0,
            part: body
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'Escape' }, focusedElement);
        expect(element).toBe(undefined);
    });

    it('should not return focused element on escape action on cell with other elements', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, []);
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 0,
            part: 'body'
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'Escape' }, focusedElement);
        expect(element).toBe(undefined);
    });

    it('should not return focused element on action on cell, cell empty', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 0);

        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            part: 'body'
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'Escape' }, focusedElement);
        expect(element).toBe(undefined);
    });

    it('should not return focused element, focusedElement is undefined', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, "INPUT", "text");;
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: 'Escape' });
        expect(element).toEqual(undefined);
    });
});

describe('Space action on checkbox', () => {
    const tableHeaderRows = [];
    const expandedRowIds = [];
    it('should call ection', () => {
        const click = jest.fn();
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, "INPUT", "checkbox", click);
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            part: body
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: ' ' }, focusedElement);
        expect(element).toEqual(undefined);
        expect(click).toBeCalled();
        expect(generatedElements[focusedElement.rowKey][focusedElement.columnKey][0].current.querySelectorAll).toBeCalledWith('input');
    });

    it('should not call ection, no focused element', () => {
        const click = jest.fn();
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, "INPUT", "checkbox", click);
        
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: ' ' });
        expect(element).toEqual(undefined);
        expect(click).not.toBeCalled();
    });

    it('should not call action, focused inner element', () => {
        const click = jest.fn();
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, "INPUT", "checkbox", click);
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            index: 1,
            part: body
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: ' ' }, focusedElement);
        expect(element).toEqual(undefined);
        expect(click).not.toBeCalled();
    });

    it('should not call action, input type is button', () => {
        const click = jest.fn();
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, "INPUT", "button", click);
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            part: body
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, generatedElements, { key: ' ' }, focusedElement);
        expect(element).toEqual(undefined);
        expect(click).not.toBeCalled();
    });
});

describe('collapse/expand row in tree mode', () => {
    it('should expand row', () => {
        const click = jest.fn();
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, undefined, undefined, click);
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            part: body
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, [], [], generatedElements, { key: 'ArrowRight', ctrlKey: true }, focusedElement);
        expect(element).toEqual(undefined);
        expect(click).toBeCalled();
        expect(generatedElements[focusedElement.rowKey][focusedElement.columnKey][0].current.querySelectorAll).toBeCalledWith('button, i');
    });

    it('should not expand row, row expanded already', () => {
        const click = jest.fn();
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, undefined, undefined, click);
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            part: body
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, [], [2], generatedElements, { key: 'ArrowRight', ctrlKey: true }, focusedElement);
        expect(element).toEqual(undefined);
        expect(click).not.toBeCalled();
    });

    it('should collapse row', () => {
        const click = jest.fn();
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, undefined, undefined, click);
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            part: body
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, [], [2], generatedElements, { key: 'ArrowLeft', ctrlKey: true }, focusedElement);
        expect(element).toEqual(undefined);
        expect(click).toBeCalled();
    });

    it('should not collapse row, raw collapsed already', () => {
        const click = jest.fn();
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, undefined, undefined, click);
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            part: body
        };
        const element = getNextFocusedCell(tableColumns, tableBodyRows, [], [], generatedElements, { key: 'ArrowLeft', ctrlKey: true }, focusedElement);
        expect(element).toEqual(undefined);
        expect(click).not.toBeCalled();
    });

    it('should not expand row, no focused element', () => {
        const click = jest.fn();
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, undefined, undefined, click);
        const element = getNextFocusedCell(tableColumns, tableBodyRows, [], [], generatedElements, { key: 'ArrowRight', ctrlKey: true });
        expect(element).toEqual(undefined);
        expect(click).not.toBeCalled();
    });

    it('should not expand row, focused inner element', () => {
        const click = jest.fn();
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            part: body,
            index: 0
        };
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, undefined, undefined, click);
        const element = getNextFocusedCell(tableColumns, tableBodyRows, [], [], generatedElements, { key: 'ArrowRight', ctrlKey: true }, focusedElement);
        expect(element).toEqual(undefined);
        expect(click).not.toBeCalled();
    });

    it('should not expand row, there no expanded rows', () => {
        const click = jest.fn();
        const focusedElement = {
            rowKey: 'test_row_2',
            columnKey: 'test_column_2',
            part: body,
        };
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, undefined, undefined, click);
        const element = getNextFocusedCell(tableColumns, tableBodyRows, [], undefined, generatedElements, { key: 'ArrowRight', ctrlKey: true }, focusedElement);
        expect(element).toEqual(undefined);
        expect(click).not.toBeCalled();
    });
})

describe('getInnerElements', () => {
    it('should return inner elements', () => {
        const key1 = 'test_key_1';
        const key2 = 'test_key_2';
        const firstInnerElement = {
            hasAttribute: jest.fn().mockReturnValue(false),
            getAttribute: jest.fn().mockReturnValue("1"),
        };
        const secondInnerElement = {
            hasAttribute: jest.fn().mockReturnValue(true),
            getAttribute: jest.fn().mockReturnValue("-1"),
        };
        const elements = [];
        elements[key1] = [];
        elements[key1][key2] = [{
            current: {
                querySelectorAll: jest.fn().mockReturnValue([
                    firstInnerElement,
                    secondInnerElement
                ])
            }
        }]
        expect(getInnerElements(elements, key1, key2).length).toBe(1);
        expect(elements[key1][key2][0].current.querySelectorAll).toBeCalledWith('[tabIndex], input, button, a');
        expect(firstInnerElement.hasAttribute).toBeCalledWith('disabled');
        expect(firstInnerElement.getAttribute).toBeCalledWith('tabindex');
    });
});

describe('getCellTopBottom', () => {
    it('should return top cell', () => {
        const focusedElement = {
            part: body,
            columnKey: 'test_column_2',
            rowKey: 'test_row_2'
        };
        expect(getCellTopBottom(-1, focusedElement, tableBodyRows)).toEqual({
            part: body,
            columnKey: 'test_column_2',
            rowKey: 'test_row_1'
        });
    });

    it('should return bottom cell', () => {
        const focusedElement = {
            part: body,
            columnKey: 'test_column_2',
            rowKey: 'test_row_2'
        };
        expect(getCellTopBottom(1, focusedElement, tableBodyRows)).toEqual({
            part: body,
            columnKey: 'test_column_2',
            rowKey: 'test_row_3'
        });
    });

    it('should not return cell, not table body', () => {
        const focusedElement = {
            part: 'other_par',
            columnKey: 'test_column_2',
            rowKey: 'test_row_2'
        };
        expect(getCellTopBottom(1, focusedElement, tableBodyRows)).toEqual(undefined);
    });

    it('should not return cell, no bottom cells', () => {
        const focusedElement = {
            part: body,
            columnKey: 'test_column_2',
            rowKey: 'test_row_3'
        };
        expect(getCellTopBottom(1, focusedElement, tableBodyRows)).toEqual(undefined);
    });

    it('should not return cell, no top cells', () => {
        const focusedElement = {
            part: body,
            columnKey: 'test_column_2',
            rowKey: 'test_row_1'
        };
        expect(getCellTopBottom(-1, focusedElement, tableBodyRows)).toEqual(undefined);
    });
});

describe('getPart', () => {
    it('should return correct part', () => {
        const body = TABLE_DATA_TYPE.toString() + '_test';
        const head = TABLE_HEADING_TYPE.toString();
        const band = TABLE_BAND_TYPE.toString() + '_test';
        expect(getPart(body)).toBe(TABLE_DATA_TYPE.toString());
        expect(getPart(head)).toBe(head);
        expect(getPart(band)).toBe(head);
    });
});

describe('getIndexToFocus', () => {
    it('should return index = 0', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, "INPUT");
        expect(getIndexToFocus('test_row_1', 'test_column_2', generatedElements)).toBe(0);
    });

    it('should not return index', () => {
        const generatedElements = generateElements(tableColumns, tableBodyRows, []);
        expect(getIndexToFocus('test_row_1', 'test_column_2', generatedElements)).toBe(undefined);
    });
});

describe('processEvents', () => {
    it('should process events', () => {
        const addEventListener = jest.fn();
        const node = {
            querySelectorAll: jest.fn().mockReturnValue([{addEventListener: addEventListener}])
        }
        const action = () => {};
        processEvents(node, 'addEventListener', action);

        expect(addEventListener).toBeCalledWith('keydown', action);
    });
});

describe('handleOnFocusedCallChanged', () => {
    it('should call onFocusedCellChanged method', () => {
        const onFocusedCellChanged = jest.fn();
        const focusedElement = {
            columnKey: 'column_key',
            rowKey: 'row_key',
            part: body
        };
        const prevFocusedElement = {
            columnKey: 'prev_column_key',
            rowKey: 'row_key',
            part: body
        };
        handleOnFocusedCallChanged(onFocusedCellChanged, focusedElement, prevFocusedElement);

        expect(onFocusedCellChanged).toBeCalledWith({rowKey: 'row_key', columnKey: 'column_key'});
    });

    it('should not call onFocusedCellChanged method, focused cell is not changed', () => {
        const onFocusedCellChanged = jest.fn();
        const focusedElement = {
            columnKey: 'column_key',
            rowKey: 'row_key',
            part: body
        };
        const prevFocusedElement = {
            columnKey: 'column_key',
            rowKey: 'row_key',
            part: body
        };
        handleOnFocusedCallChanged(onFocusedCellChanged, focusedElement, prevFocusedElement);

        expect(onFocusedCellChanged).not.toBeCalled();
    });

    it('should not call onFocusedCellChanged method, focused cell is not in body', () => {
        const onFocusedCellChanged = jest.fn();
        const focusedElement = {
            columnKey: 'column_key',
            rowKey: 'next_row_key',
            part: 'head'
        };
        const prevFocusedElement = {
            columnKey: 'column_key',
            rowKey: 'row_key',
            part: 'head'
        };
        handleOnFocusedCallChanged(onFocusedCellChanged, focusedElement, prevFocusedElement);
        expect(onFocusedCellChanged).not.toBeCalled();
    });
});

describe('filterHeaderRows', () => {
    it('should return headers with band and header type', () => {
        const headerRows = [{
            key: TABLE_BAND_TYPE.toString() + '_test'
        }, {
            key: TABLE_FILTER_TYPE.toString()
        }, {
            key: TABLE_HEADING_TYPE.toString()
        }];
        expect(filterHeaderRows(headerRows as any)).toEqual([
            {
                key: TABLE_BAND_TYPE.toString() + '_test'
            }, {
                key: TABLE_HEADING_TYPE.toString()
            }
        ]);
    });
});