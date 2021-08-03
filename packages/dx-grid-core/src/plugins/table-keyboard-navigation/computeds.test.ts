import { TABLE_FILTER_TYPE, TABLE_HEADING_TYPE, TABLE_DATA_TYPE, TABLE_BAND_TYPE } from '@devexpress/dx-grid-core';
import {
    getNextFocusedCell, getInnerElements, isRowFocused, isCellExist,
    getPart, getIndexToFocus, filterHeaderRows,
    getClosestCell, isTabArrowUpDown, focus,
} from './computeds';

const generateElements = (
    columns, bodyRows, extraParts, innerElementsCount = 2,
    extraProps?,
) => {
  const innerElements = [];
  for (let i = 0; i < innerElementsCount; i += 1) {
    innerElements.push({
      hasAttribute: jest.fn().mockReturnValue(false),
      getAttribute: jest.fn().mockReturnValue('1'),
      tagName: extraProps?.tagName,
      type: extraProps?.type,
      click: extraProps?.action,
      focus: extraProps?.focusAction,
    });
  }
  const refElement = { current: { querySelectorAll: jest.fn().mockReturnValue(innerElements) } };
  const elements = extraParts.reduce((prev, p) => {
    prev[p] = [];
    columns.forEach((c) => {
      prev[p][c.key] = [refElement];
    });
    return prev;
  }, []);
  bodyRows.forEach((r) => {
    elements[r.key] = [];
    columns.forEach((c) => {
      elements[r.key][c.key] = [refElement];
    });
  });
  return elements;
};
const tableColumns = [
    { key: 'test_column_1' },
    { key: 'test_column_2' },
    { key: 'test_column_3' },
    { key: 'test_column_4' },
] as any;
const tableBodyRows = [
    { key: 'test_row_1' },
    { key: 'test_row_2' },
    { key: 'test_row_3' },
] as any;

const body = TABLE_DATA_TYPE.toString();

describe('No focused element, key = Tab', () => {
  const key = 'Tab';
  const header = TABLE_HEADING_TYPE.toString();
  const filter = TABLE_FILTER_TYPE.toString();
  const tableHeaderRows = [{ key: header }] as any;
  const expandedRowIds = [];
  it('should return cell from header', () => {
    const elements = generateElements(tableColumns, tableBodyRows, [filter, header]);

    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key });
    expect(element).toEqual({
      rowKey: header,
      columnKey: 'test_column_1',
      part: header,
    });
  });

  it('should return cell from body', () => {
    const elements = generateElements(tableColumns, tableBodyRows, []);

    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key });
    expect(element).toEqual({
      rowKey: 'test_row_1',
      columnKey: 'test_column_1',
      part: body,
    });
  });

  it('should not be errors if there is no elements', () => {
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, {}, { key });
    expect(element).toBe(undefined);
  });

  it('should not return element if key pressed is not tab', () => {
    const elements = generateElements(tableColumns, tableBodyRows, [filter, header]);
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key: 'Enter' });
    expect(element).toBe(undefined);
  });

  it('should return cell from header, focused element is last in the toolbar', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, [filter, header]);
    const innerElements = [{
      hasAttribute: jest.fn().mockReturnValue(false),
      getAttribute: jest.fn().mockReturnValue('1'),
    }, {
      hasAttribute: jest.fn().mockReturnValue(false),
      getAttribute: jest.fn().mockReturnValue('1'),
    }];
    const refElement = {
      current: { querySelectorAll: jest.fn().mockReturnValue(innerElements) },
    };
    generatedElements.toolbar = [];
    generatedElements.toolbar.none = [refElement];

    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'Tab', target: innerElements[1] });
    expect(element).toEqual({
      rowKey: header,
      columnKey: 'test_column_1',
      part: header,
      index: 0,
    });
  });

  it('should not return cell from header, focused element is first in the toolbar', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, [filter, header]);
    const innerElements = [{
      hasAttribute: jest.fn().mockReturnValue(false),
      getAttribute: jest.fn().mockReturnValue('1'),
    }, {
      hasAttribute: jest.fn().mockReturnValue(false),
      getAttribute: jest.fn().mockReturnValue('1'),
    }];
    const refElement = { current: { querySelectorAll: jest.fn().mockReturnValue(innerElements) } };
    generatedElements.toolbar = [];
    generatedElements.toolbar.none = [refElement];

    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'Tab', target: innerElements[0] });
    expect(element).toEqual(undefined);
  });

  it('should return cell from body, focused element - first in the paging, with shiftKey', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, [filter, header]);
    const innerElements = [{
      hasAttribute: jest.fn().mockReturnValue(false),
      getAttribute: jest.fn().mockReturnValue('1'),
    }, {
      hasAttribute: jest.fn().mockReturnValue(false),
      getAttribute: jest.fn().mockReturnValue('1'),
    }];
    const refElement = { current: { querySelectorAll: jest.fn().mockReturnValue(innerElements) } };
    generatedElements.paging = [];
    generatedElements.paging.none = [refElement];

    const element = getNextFocusedCell(
        tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'Tab', shiftKey: true, target: innerElements[0],
        });
    expect(element).toEqual({
      rowKey: 'test_row_3',
      columnKey: 'test_column_4',
      part: body,
      index: 0,
    });
  });

  it('should not return cell, focused element - last in the paging, with shiftKey', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, [filter, header]);
    const innerElements = [{
      hasAttribute: jest.fn().mockReturnValue(false),
      getAttribute: jest.fn().mockReturnValue('1'),
    }, {
      hasAttribute: jest.fn().mockReturnValue(false),
      getAttribute: jest.fn().mockReturnValue('1'),
    }];
    const refElement = { current: { querySelectorAll: jest.fn().mockReturnValue(innerElements) } };
    generatedElements.paging = [];
    generatedElements.paging.none = [refElement];

    const element = getNextFocusedCell(
        tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, {
          key: 'Tab', shiftKey: true, target: innerElements[1],
        });
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
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key }, focusedElement);
    expect(element).toEqual({
      rowKey: header,
      columnKey: 'test_column_2',
      index: 0,
      part: header,
    });
  });

  it('should return prev element in the cell, tab + shift key pressed', () => {
    const focusedElement = {
      rowKey: header,
      columnKey: 'test_column_2',
      index: 1,
      part: header,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key, shiftKey: true }, focusedElement);
    expect(element).toEqual({
      rowKey: header,
      columnKey: 'test_column_2',
      index: 0,
      part: header,
    });
  });

  it('should return next cell, tab key pressed', () => {
    const focusedElement = {
      rowKey: header,
      columnKey: 'test_column_2',
      index: 1,
      part: header,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key }, focusedElement);
    expect(element).toEqual({
      rowKey: header,
      columnKey: 'test_column_3',
      index: 0,
      part: header,
    });
  });

  it('should return prev cell, tab + shift pressed', () => {
    const focusedElement = {
      rowKey: header,
      columnKey: 'test_column_2',
      part: header,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key, shiftKey: true }, focusedElement);
    expect(element).toEqual({
      rowKey: header,
      columnKey: 'test_column_1',
      index: 1,
      part: header,
    });
  });

  it('should return first cell from filter, tab key pressed', () => {
    const focusedElement = {
      rowKey: header,
      columnKey: 'test_column_4',
      index: 1,
      part: header,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key }, focusedElement);
    expect(element).toEqual({
      rowKey: filter,
      columnKey: 'test_column_1',
      index: 0,
      part: filter,
    });
  });

  it('should not return focused element, tab + shift pressed', () => {
    const focusedElement = {
      rowKey: header,
      columnKey: 'test_column_1',
      index: 0,
      part: header,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key, shiftKey: true }, focusedElement);
    expect(element).toEqual(undefined);
  });

  it('should not return focused element, arrow left key pressed', () => {
    const focusedElement = {
      rowKey: header,
      columnKey: 'test_column_2',
      index: 0,
      part: header,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key: 'ArrowLeft' }, focusedElement);
    expect(element).toEqual(undefined);
  });

  it('should not return cell, arrow up key pressed', () => {
    const focusedElement = {
      rowKey: header,
      columnKey: 'test_column_2',
      index: 1,
      part: header,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key: 'ArrowUp' }, focusedElement);
    expect(element).toBe(undefined);
  });

  it('should not return cell, some another key pressed', () => {
    const focusedElement = {
      rowKey: header,
      columnKey: 'test_column_2',
      index: 1,
      part: header,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key: 'SomeKey' }, focusedElement);
    expect(element).toBe(undefined);
  });

  it('should return cell from filter, tab key pressed, cell with input - text', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, [filter, header],
        2, { tagName: 'INPUT', type: 'text' });
    const focusedElement = {
      rowKey: header,
      columnKey: 'test_column_4',
      index: 1,
      part: header,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key }, focusedElement);
    expect(element).toEqual({
      rowKey: filter,
      columnKey: 'test_column_1',
      part: filter,
    });
  });

  it('should return cell from filter, tab key pressed, cell with input - checkbox', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, [filter, header],
        2, { tagName: 'INPUT', type: 'checkbox' });
    const focusedElement = {
      rowKey: header,
      columnKey: 'test_column_4',
      index: 1,
      part: header,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key }, focusedElement);
    expect(element).toEqual({
      rowKey: filter,
      columnKey: 'test_column_1',
      index: 0,
      part: filter,
    });
  });

  it('should return cell from filter, tab key pressed, cell contain span component', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, [filter, header],
        2, { tagName: 'SPAN' });
    const focusedElement = {
      rowKey: header,
      columnKey: 'test_column_4',
      index: 1,
      part: header,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key }, focusedElement);
    expect(element).toEqual({
      rowKey: filter,
      columnKey: 'test_column_1',
      part: filter,
    });
  });

  it('should return next cell, tab key pressed, cell containes input component', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, [header],
        2, { tagName: 'INPUT', type: 'text' });
    const focusedElement = {
      rowKey: header,
      columnKey: 'test_column_2',
      index: 1,
      part: header,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key }, focusedElement);
    expect(element).toEqual({
      rowKey: header,
      columnKey: 'test_column_3',
      part: header,
    });
  });

  it('should return prev cell, tab + shift key pressed, cell containes input component', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, [header],
        2, { tagName: 'INPUT', type: 'text' });
    const focusedElement = {
      rowKey: header,
      columnKey: 'test_column_2',
      part: header,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key, shiftKey: true }, focusedElement);
    expect(element).toEqual({
      rowKey: header,
      columnKey: 'test_column_1',
      part: header,
    });
  });
});

describe('Focused element in the header with banded columns, key = Tab', () => {
  const refElement = { current: { querySelectorAll: jest.fn().mockReturnValue([]) } };
  const header = TABLE_HEADING_TYPE.toString();
  const filter = TABLE_FILTER_TYPE.toString();
  const band = TABLE_BAND_TYPE.toString();
  const key = 'Tab';
  const tableHeaderRows = [{ key: `${band}_0` }, { key: `${band}_1` }, { key: header }] as any;
  const expandedRowIds = [];
  const elements = generateElements(tableColumns, tableBodyRows, [filter]);
  elements[`${band}_0`] = {};
  elements[`${band}_0`].test_column_1 = [refElement];
  elements[`${band}_0`].test_column_2 = [refElement];
  elements[`${band}_0`].test_column_4 = [refElement];
  elements[`${band}_1`] = {};
  elements[`${band}_1`].test_column_2 = [refElement];
  elements[`${band}_1`].test_column_3 = [refElement];
  elements[`${band}_1`].test_column_4 = [refElement];
  elements[`${header}`] = {};
  elements[`${header}`].test_column_4 = [refElement];

  it('should return next cell for band_0', () => {
    const focusedElement = {
      rowKey: `${band}_0`,
      columnKey: 'test_column_1',
      part: header,
    };

    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key }, focusedElement);
    expect(element).toEqual({
      rowKey: `${band}_0`,
      columnKey: 'test_column_2',
      part: header,
    });
  });

  it('should return cell from band_1', () => {
    const focusedElement = {
      rowKey: `${band}_0`,
      columnKey: 'test_column_4',
      part: header,
    };

    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key }, focusedElement);
    expect(element).toEqual({
      rowKey: `${band}_1`,
      columnKey: 'test_column_2',
      part: header,
    });
  });

  it('should return cell from header', () => {
    const focusedElement = {
      rowKey: `${band}_1`,
      columnKey: 'test_column_4',
      part: header,
    };

    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key }, focusedElement);
    expect(element).toEqual({
      rowKey: header,
      columnKey: 'test_column_4',
      part: header,
    });
  });

  it('should return cell from band_1, shift key pressed', () => {
    const focusedElement = {
      rowKey: header,
      columnKey: 'test_column_4',
      part: header,
    };

    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key, shiftKey: true }, focusedElement);
    expect(element).toEqual({
      rowKey: `${band}_1`,
      columnKey: 'test_column_4',
      part: header,
    });
  });

  it('should return cell for band_0, shift key pressed', () => {
    const focusedElement = {
      rowKey: `${band}_0`,
      columnKey: 'test_column_4',
      part: header,
    };

    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key, shiftKey: true }, focusedElement);
    expect(element).toEqual({
      rowKey: `${band}_0`,
      columnKey: 'test_column_2',
      part: header,
    });
  });
});

describe('Focused element in the body of table', () => {
  const header = TABLE_HEADING_TYPE.toString();
  const filter = TABLE_FILTER_TYPE.toString();
  const elements = generateElements(tableColumns, tableBodyRows, [filter, header]);
  const tableHeaderRows = [{ key: header }] as any;
  const expandedRowIds = [];

  it('should return next element in the cell, tab key pressed', () => {
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      index: 0,
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key: 'Tab' }, focusedElement);
    expect(element).toEqual({
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      index: 1,
      part: body,
    });
  });

  it('should return prev cell, tab + shift key pressed', () => {
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key: 'Tab', shiftKey: true }, focusedElement);
    expect(element).toEqual({
      rowKey: 'test_row_2',
      columnKey: 'test_column_1',
      index: 1,
      part: body,
    });
  });

  it('should return next cell, tab key pressed', () => {
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      index: 1,
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key: 'Tab' }, focusedElement);
    expect(element).toEqual({
      rowKey: 'test_row_2',
      columnKey: 'test_column_3',
      index: 0,
      part: body,
    });
  });

  it('should return prev cell, tab + shift key pressed', () => {
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key: 'Tab', shiftKey: true }, focusedElement);
    expect(element).toEqual({
      rowKey: 'test_row_2',
      columnKey: 'test_column_1',
      index: 1,
      part: body,
    });
  });

  it('should return last cell from filter, tab + shift key pressed', () => {
    const focusedElement = {
      rowKey: 'test_row_1',
      columnKey: 'test_column_1',
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key: 'Tab', shiftKey: true }, focusedElement);
    expect(element).toEqual({
      rowKey: filter,
      columnKey: 'test_column_4',
      index: 1,
      part: filter,
    });
  });

  it('should return last cell prev row, tab + shift key pressed', () => {
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_1',
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key: 'Tab', shiftKey: true }, focusedElement);
    expect(element).toEqual({
      rowKey: 'test_row_1',
      columnKey: 'test_column_4',
      index: 1,
      part: body,
    });
  });

  it('should return next element of cell', () => {
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_4',
      index: 0,
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key: 'Tab' }, focusedElement);
    expect(element).toEqual({
      rowKey: 'test_row_2',
      columnKey: 'test_column_4',
      index: 1,
      part: body,
    });
  });

  it('should not return focused element after last one, tab pressed', () => {
    const focusedElement = {
      rowKey: 'test_row_3',
      columnKey: 'test_column_4',
      index: 1,
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key: 'Tab' }, focusedElement);
    expect(element).toEqual(undefined);
  });

  it('should return next cell, arrow right pressed', () => {
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      index: 0,
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key: 'ArrowRight' }, focusedElement);
    expect(element).toEqual({
      rowKey: 'test_row_2',
      columnKey: 'test_column_3',
      part: body,
    });
  });

  it('should return prev cell, arrow left pressed', () => {
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      index: 0,
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key: 'ArrowLeft' }, focusedElement);
    expect(element).toEqual({
      rowKey: 'test_row_2',
      columnKey: 'test_column_1',
      part: body,
    });
  });

  it('should return cell over current cell, arrow up pressed', () => {
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      index: 0,
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key: 'ArrowUp' }, focusedElement);
    expect(element).toEqual({
      rowKey: 'test_row_1',
      columnKey: 'test_column_2',
      part: body,
    });
  });

  it('should return cell under current cell, arrow down pressed', () => {
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key: 'ArrowDown' }, focusedElement);
    expect(element).toEqual({
      rowKey: 'test_row_3',
      columnKey: 'test_column_2',
      part: body,
    });
  });

  it('should not return cell from filter over current cell, arrow up pressed', () => {
    const focusedElement = {
      rowKey: 'test_row_1',
      columnKey: 'test_column_2',
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key: 'ArrowUp' }, focusedElement);
    expect(element).toEqual(undefined);
  });

  it('should not return element under current cell, arrow down pressed', () => {
    const focusedElement = {
      rowKey: 'test_row_3',
      columnKey: 'test_column_2',
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key: 'ArrowDown' }, focusedElement);
    expect(element).toBe(undefined);
  });

  it('should not return element, focused cell is extreme right, arrow right pressed', () => {
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_4',
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key: 'ArrowRight' }, focusedElement);
    expect(element).toBe(undefined);
  });

  it('should not return element, focused cell is extreme left, arrow left pressed', () => {
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_1',
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, elements, { key: 'ArrowLeft' }, focusedElement);
    expect(element).toBe(undefined);
  });

  it('should return last cell from header, tab shift key pressed, cell with input - text', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, [header],
        1, { tagName: 'INPUT', type: 'text' });
    const focusedElement = {
      rowKey: 'test_row_1',
      columnKey: 'test_column_1',
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'Tab', shiftKey: true }, focusedElement);
    expect(element).toEqual({
      rowKey: header,
      columnKey: 'test_column_4',
      part: header,
    });
  });

  it('should return next cell, tab key pressed, cell with input - text', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, [],
        1, { tagName: 'INPUT', type: 'text' });
    const focusedElement = {
      rowKey: 'test_row_1',
      columnKey: 'test_column_1',
      index: 0,
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'Tab' }, focusedElement);
    expect(element).toEqual({
      rowKey: 'test_row_1',
      columnKey: 'test_column_2',
      part: body,
    });
  });

  it('should return prev cell, tab + shift key pressed, cell with input - text', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, [],
        1, { tagName: 'INPUT', type: 'text' });
    const focusedElement = {
      rowKey: 'test_row_1',
      columnKey: 'test_column_3',
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'Tab', shiftKey: true }, focusedElement);
    expect(element).toEqual({
      rowKey: 'test_row_1',
      columnKey: 'test_column_2',
      part: body,
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
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'Tab', shiftKey: true }, focusedElement);
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
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'ArrowUp', ctrlKey: true }, focusedElement);
    expect(element).toEqual({
      rowKey: filter,
      columnKey: 'test_column_1',
      part: filter,
    });
  });

  it('should return body cell, arrow down', () => {
    const focusedElement = {
      rowKey: filter,
      columnKey: 'test_column_2',
      part: filter,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'ArrowDown', ctrlKey: true }, focusedElement);
    expect(element).toEqual({
      rowKey: 'test_row_1',
      columnKey: 'test_column_1',
      part: body,
    });
  });

  it('should focus element in the toolbar', () => {
    const innerElements = [];
    for (let i = 0; i < 2; i += 1) {
      innerElements.push({
        hasAttribute: jest.fn().mockReturnValue(false),
        getAttribute: jest.fn().mockReturnValue('1'),
        focus: jest.fn(),
      });
    }
    const refElement = { current: { querySelectorAll: jest.fn().mockReturnValue(innerElements) } };
    generatedElements.toolbar = [];
    generatedElements.toolbar.none = [refElement];
    const focusedElement = {
      rowKey: header,
      columnKey: 'test_column_2',
      part: header,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'ArrowUp', ctrlKey: true }, focusedElement);
    expect(element).toEqual(undefined);
    expect(innerElements[0].focus).toBeCalled();
  });

  it('should focus element in the paging', () => {
    const innerElements = [];
    for (let i = 0; i < 2; i += 1) {
      innerElements.push({
        hasAttribute: jest.fn().mockReturnValue(false),
        getAttribute: jest.fn().mockReturnValue('1'),
        focus: jest.fn(),
      });
    }
    const refElement = { current: { querySelectorAll: jest.fn().mockReturnValue(innerElements) } };
    generatedElements.paging = [];
    generatedElements.paging.none = [refElement];
    const focusedElement = {
      rowKey: 'test_row_3',
      columnKey: 'test_column_2',
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'ArrowDown', ctrlKey: true }, focusedElement);
    expect(element).toEqual(undefined);
    expect(innerElements[0].focus).toBeCalled();
  });

  it('should return cell from header, focused element in toolbar', () => {
    const innerElements = [];
    innerElements.push({
      hasAttribute: jest.fn().mockReturnValue(false),
      getAttribute: jest.fn().mockReturnValue('1'),
      focus: jest.fn(),
    });
    const refElement = { current: { querySelectorAll: jest.fn().mockReturnValue(innerElements) } };
    generatedElements.toolbar = [];
    generatedElements.toolbar.none = [refElement];

    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements,
        { key: 'ArrowDown', ctrlKey: true, target: innerElements[0] },
    );
    expect(element).toEqual({
      rowKey: header,
      columnKey: 'test_column_1',
      part: header,
      index: 0,
    });
  });

  it('should return cell from body, focused element in paging', () => {
    const innerElements = [];
    innerElements.push({
      hasAttribute: jest.fn().mockReturnValue(false),
      getAttribute: jest.fn().mockReturnValue('1'),
      focus: jest.fn(),
    });
    const refElement = { current: { querySelectorAll: jest.fn().mockReturnValue(innerElements) } };
    generatedElements.paging = [];
    generatedElements.paging.none = [refElement];

    const element = getNextFocusedCell(
        tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements,
        { key: 'ArrowUp', ctrlKey: true, target: innerElements[0] },
    );
    expect(element).toEqual({
      rowKey: 'test_row_1',
      columnKey: 'test_column_1',
      part: body,
      index: 0,
    });
  });

  it('should not return cell, no focused elements, arrow down', () => {
    const innerElements = [];
    innerElements.push({
      hasAttribute: jest.fn().mockReturnValue(false),
      getAttribute: jest.fn().mockReturnValue('1'),
      focus: jest.fn(),
    });
    const refElement = { current: { querySelectorAll: jest.fn().mockReturnValue(innerElements) } };
    generatedElements.toolbar = [];
    generatedElements.toolbar.none = [refElement];

    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'ArrowDown', ctrlKey: true });
    expect(element).toEqual(undefined);
  });

  it('should not return cell, no toolbar, arrow down', () => {
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'ArrowDown', ctrlKey: true });
    expect(element).toEqual(undefined);
  });

  it('should not return cell, no focused elements, arrow up', () => {
    const innerElements = [];
    innerElements.push({
      hasAttribute: jest.fn().mockReturnValue(false),
      getAttribute: jest.fn().mockReturnValue('1'),
      focus: jest.fn(),
    });
    const refElement = { current: { querySelectorAll: jest.fn().mockReturnValue(innerElements) } };
    generatedElements.paging = [];
    generatedElements.paging.none = [refElement];

    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'ArrowUp', ctrlKey: true });
    expect(element).toEqual(undefined);
  });

  it('should not return cell, no paging, arrow up', () => {
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'ArrowUp', ctrlKey: true });
    expect(element).toEqual(undefined);
  });
});

describe('Enter action', () => {
  const tableHeaderRows = [{ key: TABLE_HEADING_TYPE.toString() }] as any;
  const expandedRowIds = [];
  it('should return focused element from cell on action on cell, input type text', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1,
      { tagName: 'INPUT', type: 'text' });
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'Enter' }, focusedElement);
    expect(element).toEqual({
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      index: 0,
      part: body,
    });
  });

  it('should not return focused element from cell on action on cell, input type checkbox', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1,
      { tagName: 'INPUT', type: 'checkbox' });
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'Enter' }, focusedElement);
    expect(element).toEqual(undefined);
  });

  it('should return cell on enter action on its input', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1,
      { tagName: 'INPUT', type: 'text' });
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      index: 0,
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'Enter' }, focusedElement);
    expect(element).toEqual({
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: body,
    });
  });

  it('should return span from cell on action on cell', () => {
    const click = jest.fn();
    const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1,
      { tagName: 'SPAN', type: '', action: click });
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'Enter' }, focusedElement);
    expect(element).toEqual({
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      index: 0,
      part: body,
    });
    expect(click).toBeCalled();
  });

  it('should not return focused element on action on span', () => {
    const click = jest.fn();
    const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1,
      { tagName: 'SPAN', type: '', action: click });
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      index: 0,
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'Enter' }, focusedElement);
    expect(element).toBe(undefined);
    expect(click).not.toBeCalled();
  });

  it('should not return focused element on action on cell with other elements', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, []);
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      index: 1,
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'Enter' }, focusedElement);
    expect(element).toBe(undefined);
  });

  it('should not return focused element on action on cell, cell empty', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, [], 0);

    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'Enter' }, focusedElement);
    expect(element).toBe(undefined);
  });

  it('should not return focused element, current focused element is undefined', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, [],
        1, { tagName: 'INPUT', type: 'text' });
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'Enter' });
    expect(element).toEqual(undefined);
  });
});

describe('Excape action', () => {
  const tableHeaderRows = [{ key: TABLE_HEADING_TYPE.toString() }] as any;
  const expandedRowIds = [];
  it('should return cell on escape action on input', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, [],
        1, { tagName: 'INPUT', type: 'text' });
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      index: 0,
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'Escape' }, focusedElement);
    expect(element).toEqual({
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: body,
    });
  });

  it('should not return focused element on escape action on cell', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, [],
        1, { tagName: 'INPUT', type: 'text' });
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: 'body',
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'Escape' }, focusedElement);
    expect(element).toBe(undefined);
  });

  it('should not return focused element on escape action on span', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, [],
        1, { tagName: 'SPAN' });
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      index: 0,
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'Escape' }, focusedElement);
    expect(element).toBe(undefined);
  });

  it('should not return focused element on escape action on cell with other elements', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, []);
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      index: 0,
      part: 'body',
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'Escape' }, focusedElement);
    expect(element).toBe(undefined);
  });

  it('should not return focused element on action on cell, cell empty', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, [], 0);

    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: 'body',
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'Escape' }, focusedElement);
    expect(element).toBe(undefined);
  });

  it('should not return focused element, focusedElement is undefined', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, [],
        1, { tagName: 'INPUT', type: 'text' });
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: 'Escape' });
    expect(element).toEqual(undefined);
  });
});

describe('Space action on checkbox', () => {
  const tableHeaderRows = [];
  const expandedRowIds = [];
  it('should call ection', () => {
    const click = jest.fn();
    const generatedElements = generateElements(tableColumns, tableBodyRows, [],
        1, { tagName: 'INPUT', type: 'checkbox', action: click });
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: ' ' }, focusedElement);
    expect(element).toEqual(undefined);
    expect(click).toBeCalled();
    expect(generatedElements[focusedElement.rowKey][focusedElement.columnKey][0]
        .current.querySelectorAll).toBeCalledWith('input');
  });

  it('should not call ection, no focused element', () => {
    const click = jest.fn();
    const generatedElements = generateElements(tableColumns, tableBodyRows, [],
        1, { tagName: 'INPUT', type: 'checkbox', action: click });

    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: ' ' });
    expect(element).toEqual(undefined);
    expect(click).not.toBeCalled();
  });

  it('should not call action, focused inner element', () => {
    const click = jest.fn();
    const generatedElements = generateElements(tableColumns, tableBodyRows, [],
        1, { tagName: 'INPUT', type: 'checkbox', action: click });
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      index: 1,
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: ' ' }, focusedElement);
    expect(element).toEqual(undefined);
    expect(click).not.toBeCalled();
  });

  it('should not call action, input type is button', () => {
    const click = jest.fn();
    const generatedElements = generateElements(tableColumns, tableBodyRows, [],
        1, { tagName: 'INPUT', type: 'button', action: click });
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, tableHeaderRows,
        expandedRowIds, generatedElements, { key: ' ' }, focusedElement);
    expect(element).toEqual(undefined);
    expect(click).not.toBeCalled();
  });
});

describe('collapse/expand row in tree mode', () => {
  it('should expand row', () => {
    const click = jest.fn();
    const generatedElements = generateElements(tableColumns, tableBodyRows, [],
        1, { action: click });
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, [], [],
        generatedElements, { key: 'ArrowRight', ctrlKey: true }, focusedElement);
    expect(element).toEqual(undefined);
    expect(click).toBeCalled();
    expect(generatedElements[focusedElement.rowKey][focusedElement.columnKey][0]
        .current.querySelectorAll).toBeCalledWith('button, i');
  });

  it('should not expand row, row expanded already', () => {
    const click = jest.fn();
    const generatedElements = generateElements(tableColumns, tableBodyRows, [],
        1, { action: click });
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, [], [2],
        generatedElements, { key: 'ArrowRight', ctrlKey: true }, focusedElement);
    expect(element).toEqual(undefined);
    expect(click).not.toBeCalled();
  });

  it('should collapse row', () => {
    const click = jest.fn();
    const generatedElements = generateElements(tableColumns, tableBodyRows, [],
        1, { action: click });
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, [], [2],
        generatedElements, { key: 'ArrowLeft', ctrlKey: true }, focusedElement);
    expect(element).toEqual(undefined);
    expect(click).toBeCalled();
  });

  it('should not collapse row, raw collapsed already', () => {
    const click = jest.fn();
    const generatedElements = generateElements(tableColumns, tableBodyRows, [],
        1, { action: click });
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: body,
    };
    const element = getNextFocusedCell(tableColumns, tableBodyRows, [], [],
        generatedElements, { key: 'ArrowLeft', ctrlKey: true }, focusedElement);
    expect(element).toEqual(undefined);
    expect(click).not.toBeCalled();
  });

  it('should not expand row, no focused element', () => {
    const click = jest.fn();
    const generatedElements = generateElements(tableColumns, tableBodyRows,
        [], 1, { action: click });
    const element = getNextFocusedCell(tableColumns, tableBodyRows, [], [],
        generatedElements, { key: 'ArrowRight', ctrlKey: true });
    expect(element).toEqual(undefined);
    expect(click).not.toBeCalled();
  });

  it('should not expand row, focused inner element', () => {
    const click = jest.fn();
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: body,
      index: 0,
    };
    const generatedElements = generateElements(tableColumns, tableBodyRows, [],
        1, { action: click });
    const element = getNextFocusedCell(tableColumns, tableBodyRows, [], [],
        generatedElements, { key: 'ArrowRight', ctrlKey: true }, focusedElement);
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
    const generatedElements = generateElements(tableColumns, tableBodyRows, [],
        1, { action: click });
    const element = getNextFocusedCell(tableColumns, tableBodyRows, [], undefined,
        generatedElements, { key: 'ArrowRight', ctrlKey: true }, focusedElement);
    expect(element).toEqual(undefined);
    expect(click).not.toBeCalled();
  });
});

describe('getInnerElements', () => {
  it('should return inner elements', () => {
    const key1 = 'test_key_1';
    const key2 = 'test_key_2';
    const firstInnerElement = {
      hasAttribute: jest.fn().mockReturnValue(false),
      getAttribute: jest.fn().mockReturnValue('1'),
    };
    const secondInnerElement = {
      hasAttribute: jest.fn().mockReturnValue(true),
      getAttribute: jest.fn().mockReturnValue('-1'),
    };
    const elements = {};
    elements[key1] = [];
    elements[key1][key2] = [{
      current: {
        querySelectorAll: jest.fn().mockReturnValue([
          firstInnerElement,
          secondInnerElement,
        ]),
      },
    }];
    expect(getInnerElements(elements, key1, key2).length).toBe(1);
    expect(elements[key1][key2][0].current.querySelectorAll)
    .toBeCalledWith('[tabIndex], input, button, a');
    expect(firstInnerElement.hasAttribute).toBeCalledWith('disabled');
    expect(firstInnerElement.getAttribute).toBeCalledWith('tabindex');
  });
});

describe('getPart', () => {
  it('should return correct part', () => {
    const head = TABLE_HEADING_TYPE.toString();
    const band = `${TABLE_BAND_TYPE.toString()}_test`;
    expect(getPart(`${TABLE_DATA_TYPE.toString()}_test`)).toBe(TABLE_DATA_TYPE.toString());
    expect(getPart(head)).toBe(head);
    expect(getPart(band)).toBe(head);
  });
});

describe('getIndexToFocus', () => {
  it('should return index = 0', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, [], 1, { tagName: 'INPUT' });
    expect(getIndexToFocus('test_row_1', 'test_column_2', generatedElements)).toBe(0);
  });

  it('should not return index', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, []);
    expect(getIndexToFocus('test_row_1', 'test_column_2', generatedElements)).toBe(undefined);
  });
});

describe('filterHeaderRows', () => {
  it('should return headers with band and header type', () => {
    const headerRows = [{
      key: `${TABLE_BAND_TYPE.toString()}_test`,
    }, {
      key: TABLE_FILTER_TYPE.toString(),
    }, {
      key: TABLE_HEADING_TYPE.toString(),
    }];
    expect(filterHeaderRows(headerRows as any)).toEqual([
      {
        key: `${TABLE_BAND_TYPE.toString()}_test`,
      }, {
        key: TABLE_HEADING_TYPE.toString(),
      },
    ]);
  });
});

describe('isRowFocused', () => {
  it('should return correct boolean value', () => {
    expect(isRowFocused({ key: 'test_row_1' } as any, 'test_row_1')).toBeTruthy();
    expect(isRowFocused({ key: 'test_row_1' } as any)).toBeFalsy();
    expect(isRowFocused({ key: 'test_row_1' } as any, 'test_row_2')).toBeFalsy();
  });
});

describe('isCellExist', () => {
  const generatedElements = generateElements(tableColumns, tableBodyRows, []);
  it('should return existing of the cell', () => {
    expect(isCellExist(generatedElements, {
      columnKey: 'test_column_30', rowKey: 'test_row_15',
    } as any)).toEqual(false);
    expect(isCellExist(generatedElements, {
      columnKey: 'test_column_2', rowKey: 'test_row_2',
    } as any)).toEqual(true);
    expect(isCellExist(generatedElements, {
      columnKey: 'test_column_2', rowKey: 'test_row_15',
    } as any)).toEqual(false);
  });
});

describe('getClosestCell', () => {
  const generatedElements = generateElements(tableColumns, tableBodyRows, []);
  it('should return closest cell', () => {
    expect(getClosestCell(tableBodyRows, { columnKey: 'test_column_2', part: 'part', rowKey: 'test_row_2' }, generatedElements)).toEqual({
      columnKey: 'test_column_2',
      index: 0,
      part: 'part',
      rowKey: 'test_row_3',
    });
  });

  it('should return last cell', () => {
    expect(getClosestCell(tableBodyRows, { columnKey: 'test_column_2', part: 'part', rowKey: 'test_row_3' }, generatedElements)).toEqual({
      columnKey: 'test_column_2',
      index: 0,
      part: 'part',
      rowKey: 'test_row_3',
    });
  });
});

describe('isTabArrowUpDown', () => {
  it('should return correct value', () => {
    expect(isTabArrowUpDown({ key: 'Tab' })).toBeTruthy();
    expect(isTabArrowUpDown({ key: 'ArrowDown', ctrlKey: true })).toBeTruthy();
    expect(isTabArrowUpDown({ key: 'ArrowUp', ctrlKey: true })).toBeTruthy();
    expect(isTabArrowUpDown({ key: 'ArrowDown' })).toBeFalsy();
    expect(isTabArrowUpDown({ key: 'ArrowUp' })).toBeFalsy();
    expect(isTabArrowUpDown({ key: 'Enter' })).toBeFalsy();
  });
});

describe('focus', () => {
  it('should call focus', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, []);
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: body,
    };
    const element = generatedElements[focusedElement.rowKey][focusedElement.columnKey][0];
    element.focus = jest.fn();
    focus(generatedElements, focusedElement);
    expect(element.focus).toBeCalled();
  });

  it('should call focus, inner element', () => {
    const focusAction = jest.fn();
    const generatedElements = generateElements(tableColumns, tableBodyRows, [],
      undefined, { focusAction });
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: body,
      index: 0,
    };
    focus(generatedElements, focusedElement);
    expect(focusAction).toBeCalled();
  });

  it('should call focus for ref element', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, []);
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: body,
    };
    const element = generatedElements[focusedElement.rowKey][focusedElement.columnKey][0];
    element.current = { focus: jest.fn() };
    focus(generatedElements, focusedElement);
    expect(element.current.focus).toBeCalled();
  });

  it('should not focus, no focusedElement', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, []);
    focus(generatedElements);
    expect.anything();
  });

  it('should not focus, no such focusedElement in elements', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, []);
    const focusedElement = {
      rowKey: 'test_row_20',
      columnKey: 'test_column_2',
      part: body,
    };
    focus(generatedElements, focusedElement);
    expect.anything();
  });

  it('should call onFocusedCellChanged', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, []);
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: body,
    };
    const element = generatedElements[focusedElement.rowKey][focusedElement.columnKey][0];
    element.focus = jest.fn();
    const onFocusedCellChanged = jest.fn();
    focus(generatedElements, focusedElement, undefined, onFocusedCellChanged);
    expect(onFocusedCellChanged).toBeCalledWith({
      columnKey: 'test_column_2',
      rowKey: 'test_row_2',
    });
  });

  it('should not call onFocusedCellChanged, prev focusedElement the same', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, []);
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: body,
    };
    const element = generatedElements[focusedElement.rowKey][focusedElement.columnKey][0];
    element.focus = jest.fn();
    const onFocusedCellChanged = jest.fn();
    focus(generatedElements, focusedElement, focusedElement, onFocusedCellChanged);
    expect(onFocusedCellChanged).not.toBeCalled();
  });

  it('should not call onFocusedCellChanged, part is not data type', () => {
    const generatedElements = generateElements(tableColumns, tableBodyRows, []);
    const focusedElement = {
      rowKey: 'test_row_2',
      columnKey: 'test_column_2',
      part: 'part',
    };
    const element = generatedElements[focusedElement.rowKey][focusedElement.columnKey][0];
    element.focus = jest.fn();
    const onFocusedCellChanged = jest.fn();
    focus(generatedElements, focusedElement, focusedElement, onFocusedCellChanged);
    expect(onFocusedCellChanged).not.toBeCalled();
  });
});
