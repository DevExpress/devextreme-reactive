import { ReadonlyObject, PureComputed } from '@devexpress/dx-core';
import {
  TABLE_FILTER_TYPE, TABLE_HEADING_TYPE, TABLE_DATA_TYPE, TABLE_BAND_TYPE,
  RIGHT_POSITION, LEFT_POSITION, TABLE_TOTAL_SUMMARY_TYPE, TABLE_STUB_TYPE,
  TABLE_GROUP_TYPE,
} from '@devexpress/dx-grid-core';
import {
    GetNextFocusedElementFn, FocusedElement, TableColumn, TableRow,
    GetElementFn, GetElementPrevNextPartFn, Elements, RowId, GetInnerElementsFn,
    OnFocusedCellChangedFn, ScrollToColumnFn, GetNextPrevPartFn,
    GetNextPrevCellFromBodyFn, GetPrevCellFromHeadingFn, GetNextCellFromHeadinFn,
    GetCellNextPrevPartFn,
} from '../../types';

const HEADING_TYPE = TABLE_HEADING_TYPE.toString();
const FILTER_TYPE = TABLE_FILTER_TYPE.toString();
const DATA_TYPE = TABLE_DATA_TYPE.toString();
const BAND_TYPE = TABLE_BAND_TYPE.toString();
const TOTAL_SUMMARY_TYPE = TABLE_TOTAL_SUMMARY_TYPE.toString();
const STUB_TYPE = TABLE_STUB_TYPE.toString();
const GROUP_TYPE = TABLE_GROUP_TYPE.toString();

const tableParts = [HEADING_TYPE, FILTER_TYPE, DATA_TYPE, TOTAL_SUMMARY_TYPE];

const getIndex: PureComputed<[TableColumn[] | TableRow [], string], number> = (arr, key) => {
  return arr.findIndex((el: TableColumn | TableRow) => {
    return el.key === key;
  });
};

const isSpanInput: PureComputed<[any[]], boolean> = (innerElements) => {
  return innerElements[0].tagName === 'SPAN' ||
  innerElements[0].tagName === 'INPUT' && innerElements[0].type === 'text';
};

const isDefined = (value: any): value is boolean => {
  return value !== undefined;
};

const hasInsideElements: PureComputed<[any[], number?], boolean> = (
  innerElements, focusedElementIndex,
) => {
  if ((innerElements.length && focusedElementIndex === undefined) ||
  (isDefined(focusedElementIndex) && focusedElementIndex < innerElements.length - 1)) {
    if (innerElements.length === 1 && focusedElementIndex === undefined) {
      return !isSpanInput(innerElements);
    }
    return true;
  }
  return false;
};

const getIndexInnerElement: PureComputed<[
  Elements, string, string, number,
], number | undefined> = (
  elements, rowKey, columnKey, direction,
) => {
  const innerElements = getInnerElements(elements, rowKey, columnKey);
  const index = direction > 0 ? 0 : innerElements.length - 1;

  return cellEmptyOrHasSpanAndInput(elements, rowKey, columnKey) ? undefined : index;
};

const getNextPrevClosestColumnKey: PureComputed<
  [TableColumn[], number, string, Elements, number], string | undefined
> = (tableColumns, columnIndex, rowKey, elements, direction) => {
  let columnKey;
  if (direction > 0) {
    for (let i = columnIndex; i <= tableColumns.length - 1; i += 1) {
      if (elements[rowKey][tableColumns[i].key]) {
        columnKey = tableColumns[i].key;
        break;
      }
    }
  } else {
    for (let i = columnIndex; i >= 0; i -= 1) {
      if (elements[rowKey][tableColumns[i].key]) {
        columnKey = tableColumns[i].key;
        break;
      }
    }
  }
  return columnKey;
};

const shouldBeScrolled = (
  elements: ReadonlyObject<Elements>, key1: string, key2: string,
  scrollToColumn?: ScrollToColumnFn,
): scrollToColumn is ScrollToColumnFn => {
  const isColumnHasStubType = Object.keys(elements[key1]).some((column) => {
    return column.includes(STUB_TYPE);
  });
  return !!(scrollToColumn && !elements[key1][key2] && isColumnHasStubType);
};

const convertPart: PureComputed<
  [string, Elements, TableRow[]], string | void
> = (part, elements, tableBodyRows) => {
  if (part === DATA_TYPE && elements[tableBodyRows[0].key]) {
    return DATA_TYPE;
  }
  if (elements[part]) {
    return part;
  }
  return;
};

const getLastPart: PureComputed<
  [Elements, TableRow[], number?], string | void
> = (elements, tableBodyRows, partIndex) => {
  let index = partIndex || tableParts.length;
  let part;

  while (index > 0) {
    index = index - 1;
    part = convertPart(tableParts[index], elements, tableBodyRows);
    if (part) {
      break;
    }
  }

  return part;
};

const getRowKey: PureComputed<[string, string, string?]> = (part, key, headerRowKey) => {
  if (headerRowKey && part === HEADING_TYPE) {
    return headerRowKey;
  }
  return part === DATA_TYPE ? key : part;
};

const getPrevPart: GetNextPrevPartFn = (
  focusedElement, elements, tableBodyRows,
) => {
  const index = tableParts.findIndex((p) => {
    return p === focusedElement.part;
  });
  if (index === 0) {
    return;
  }
  return getLastPart(elements, tableBodyRows, index);
};

const getNextPart: GetNextPrevPartFn = (
  focusedElement, elements, tableBodyRows,
) => {
  const index = tableParts.findIndex((p) => {
    return p === focusedElement.part;
  });
  if (index === tableParts.length - 1) {
    return;
  }
  const part = tableParts.find((p, i) => {
    if (i > index) {
      return convertPart(p, elements, tableBodyRows);
    }
    return false;
  });
  return part;
};

const getCellNextPart: GetElementPrevNextPartFn = (
  focusedElement, elements, tableBodyRows, tableColumns, scrollToColumn,
) => {
  const part = getNextPart(focusedElement, elements, tableBodyRows);
  if (!part) {
    return;
  }

  const rowKey = getRowKey(part, tableBodyRows[0].key);
  const columnKey = tableColumns[0].key;
  if (shouldBeScrolled(elements, rowKey, columnKey, scrollToColumn)) {
    scrollToColumn(LEFT_POSITION);
    return {
      rowKey,
      columnKey,
      part,
    };
  }
  return {
    rowKey,
    columnKey,
    index: getIndexInnerElement(elements, rowKey, columnKey, 1),
    part,
  };
};

const getCellPrevPart: GetElementPrevNextPartFn = (
  focusedElement, elements, tableBodyRows, tableColumns, scrollToColumn,
) => {
  const part = getPrevPart(focusedElement, elements, tableBodyRows);
  if (!part) {
    return;
  }

  const rowKey = getRowKey(part, tableBodyRows[tableBodyRows.length - 1].key);
  const columnKeyIndex = tableColumns.length - 1;
  const columnKey = tableColumns[columnKeyIndex].key;
  if (shouldBeScrolled(elements, rowKey, columnKey, scrollToColumn)) {
    scrollToColumn(RIGHT_POSITION);
    return {
      rowKey,
      columnKey,
      part,
    };
  }
  const nextColumnKey = getNextPrevClosestColumnKey(tableColumns, columnKeyIndex,
    rowKey, elements, -1);
  return nextColumnKey ? {
    rowKey,
    columnKey: nextColumnKey,
    index: getIndexInnerElement(elements, rowKey, nextColumnKey, -1),
    part,
  } : undefined;
};

const getPrevCellFromBody: GetNextPrevCellFromBodyFn = (
  columnIndex, rowIndex, tableColumns, tableBodyRows, focusedElement, elements,
  scrollToColumn,
) => {
  let prevRowKey = focusedElement.rowKey;
  let prevColumnKey;
  if (columnIndex === 0 && rowIndex === 0) {
    return getCellPrevPart(focusedElement, elements, tableBodyRows, tableColumns, scrollToColumn);
  }
  if (columnIndex === 0) {
    prevRowKey = tableBodyRows[rowIndex - 1].key;
    if (prevRowKey.includes(GROUP_TYPE)) {
      prevColumnKey = getNextPrevClosestColumnKey(
        tableColumns, tableColumns.length - 1, prevRowKey, elements, -1,
      );
    } else {
      prevColumnKey = tableColumns[tableColumns.length - 1].key;
    }
    if (prevColumnKey && shouldBeScrolled(elements, prevRowKey, prevColumnKey, scrollToColumn)) {
      scrollToColumn(RIGHT_POSITION);
      return {
        rowKey: prevRowKey,
        columnKey: prevColumnKey,
        part: focusedElement.part,
      };
    }
  } else {
    prevColumnKey = getNextPrevClosestColumnKey(
      tableColumns, columnIndex - 1, prevRowKey, elements, -1,
    );
  }

  return prevColumnKey ? {
    rowKey: prevRowKey,
    columnKey: prevColumnKey,
    index: getIndexInnerElement(elements, prevRowKey, prevColumnKey, -1),
    part: focusedElement.part,
  } : undefined;
};

const getPrevCellFromHeading: GetPrevCellFromHeadingFn = (
  tableHeaderRows, tableColumns, columnIndex,
  { rowKey, part }, elements,
) => {
  let prevColumnKey;
  let prevRowKey;
  const headIndex = getIndex(tableHeaderRows, rowKey);
  prevColumnKey = getNextPrevClosestColumnKey(tableColumns, columnIndex - 1, rowKey, elements, -1);
  if (prevColumnKey) {
    return {
      columnKey: prevColumnKey,
      rowKey,
      part,
      index: getIndexInnerElement(elements, rowKey, prevColumnKey, -1),
    };
  }
  if (headIndex > 0) {
    let abort = false;
    for (let i = headIndex - 1; i >= 0 && !abort; i -= 1) {
      for (let j = tableColumns.length - 1; j >= 0; j -= 1) {
        if (elements[tableHeaderRows[i].key][tableColumns[j].key]) {
          prevColumnKey = tableColumns[j].key;
          prevRowKey = tableHeaderRows[i].key;
          abort = true;
          break;
        }
      }
    }
    if (prevColumnKey && prevRowKey) {
      return {
        columnKey: prevColumnKey,
        rowKey: prevRowKey,
        part,
        index: getIndexInnerElement(elements, prevRowKey, prevColumnKey, -1),
      };
    }
  }

  return;
};

const getPrevElement: GetElementFn = (
  focusedElement, tableBodyRows, tableColumns, tableHeaderRows, elements, scrollToColumn,
) => {
  const columnIndex = getIndex(tableColumns, focusedElement.columnKey);
  const rowIndex = getIndex(tableBodyRows, focusedElement.rowKey);

  if (isDefined(focusedElement.index) && focusedElement.index > 0) {
    return { ...focusedElement, index: focusedElement.index - 1 };
  }

  if (focusedElement.part === DATA_TYPE) {
    return getPrevCellFromBody(columnIndex, rowIndex, tableColumns,
      tableBodyRows, focusedElement, elements, scrollToColumn);
  }

  if (focusedElement.part === HEADING_TYPE) {
    const cell = getPrevCellFromHeading(tableHeaderRows, tableColumns, columnIndex,
      focusedElement, elements);
    if (cell) {
      return {
        ...cell,
        index: getIndexInnerElement(elements, cell.rowKey, cell.columnKey, -1),
      };
    }
    return cell;
  }

  if (columnIndex === 0) {
    return getCellPrevPart(focusedElement, elements, tableBodyRows, tableColumns, scrollToColumn);
  }
  const rowKey = focusedElement.part;
  const columnKey = tableColumns[columnIndex - 1].key;
  return {
    rowKey,
    columnKey,
    index: getIndexInnerElement(elements, rowKey, columnKey, -1),
    part: focusedElement.part,
  };
};

const getNextCellFromBody: GetNextPrevCellFromBodyFn = (
  columnIndex, rowIndex, tableColumns,
  tableBodyRows, focusedElement, elements, scrollToColumn,
) => {
  let nextRowKey = focusedElement.rowKey;
  let nextColumnKey;

  if (columnIndex === tableColumns.length - 1 && rowIndex === tableBodyRows.length - 1) {
    return getCellNextPart(focusedElement, elements, tableBodyRows, tableColumns, scrollToColumn);
  }
  if (columnIndex === tableColumns.length - 1) {
    nextRowKey = tableBodyRows[rowIndex + 1].key;
    nextColumnKey = tableColumns[0].key;
    if (shouldBeScrolled(elements, nextRowKey, nextColumnKey, scrollToColumn)) {
      scrollToColumn(LEFT_POSITION);
      return {
        rowKey: nextRowKey,
        columnKey: nextColumnKey,
        part: focusedElement.part,
      };
    }
  } else {
    nextColumnKey = getNextPrevClosestColumnKey(
      tableColumns, columnIndex + 1, nextRowKey, elements, 1,
    );
    if (!nextColumnKey) {
      if (rowIndex === tableBodyRows.length - 1) {
        return getCellNextPart(
          focusedElement, elements, tableBodyRows, tableColumns, scrollToColumn,
        );
      }
      nextRowKey = tableBodyRows[rowIndex + 1].key;
      nextColumnKey = tableColumns[0].key;
    }
  }

  return {
    rowKey: nextRowKey,
    columnKey: nextColumnKey,
    index: getIndexInnerElement(elements, nextRowKey, nextColumnKey, 1),
    part: focusedElement.part,
  };
};

const getNextCellFromHeading: GetNextCellFromHeadinFn = (
  tableHeaderRows, tableBodyRows, tableColumns,
  columnIndex, focusedElement, elements,
  scrollToColumn,
) => {
  const headIndex = getIndex(tableHeaderRows, focusedElement.rowKey);
  let nextRowKey;
  let nextColumnKey = getNextPrevClosestColumnKey(
    tableColumns, columnIndex + 1, focusedElement.rowKey, elements, 1,
  );
  if (nextColumnKey) {
    return {
      columnKey: nextColumnKey,
      rowKey: focusedElement.rowKey,
      part: focusedElement.part,
      index: getIndexInnerElement(elements, focusedElement.rowKey, nextColumnKey, 1),
    };
  }
  if (headIndex !== tableHeaderRows.length - 1) {
    let abort = false;
    for (let i = headIndex + 1; i <= tableHeaderRows.length - 1 && !abort; i += 1) {
      for (let j = 0; j <= tableColumns.length - 1; j += 1) {
        if (elements[tableHeaderRows[i].key][tableColumns[j].key]) {
          nextColumnKey = tableColumns[j].key;
          nextRowKey = tableHeaderRows[i].key;
          abort = true;
          break;
        }
      }
    }
    if (nextColumnKey && nextRowKey) {
      return {
        columnKey: nextColumnKey,
        rowKey: nextRowKey,
        part: focusedElement.part,
        index: getIndexInnerElement(elements, nextRowKey, nextColumnKey, 1),
      };
    }
  }

  return getCellNextPart(focusedElement, elements, tableBodyRows, tableColumns, scrollToColumn);
};

const getNextElement: GetElementFn = (
  focusedElement, tableBodyRows, tableColumns, tableHeaderRows, elements, scrollToColumn,
) => {
  const innerElements = getInnerElements(elements, focusedElement.rowKey, focusedElement.columnKey);
  const columnIndex = getIndex(tableColumns, focusedElement.columnKey);
  const rowIndex = getIndex(tableBodyRows, focusedElement.rowKey);

  if (hasInsideElements(innerElements, focusedElement.index)) {
    return {
      ...focusedElement,
      index: !isDefined(focusedElement.index) ? 0 : focusedElement.index + 1,
    };
  }

  if (focusedElement.part === DATA_TYPE) {
    return getNextCellFromBody(columnIndex, rowIndex, tableColumns,
      tableBodyRows, focusedElement, elements, scrollToColumn);
  }

  if (focusedElement.part === HEADING_TYPE) {
    return getNextCellFromHeading(tableHeaderRows, tableBodyRows, tableColumns, columnIndex,
      focusedElement, elements, scrollToColumn);
  }

  if (columnIndex === tableColumns.length - 1) {
    return getCellNextPart(focusedElement, elements, tableBodyRows, tableColumns, scrollToColumn);
  }

  const rowKey = focusedElement.rowKey;
  const columnKey = tableColumns[columnIndex + 1].key;
  return {
    rowKey,
    columnKey,
    part: focusedElement.part,
    index: getIndexInnerElement(elements, rowKey, columnKey, 1),
  };
};

const hasCellInput: PureComputed<[Elements, string, string], boolean> = (elements, key1, key2) => {
  const innerElements = getInnerElements(elements, key1, key2);
  return innerElements.length ? innerElements[0].tagName === 'INPUT' : false;
};

const cellEmptyOrHasSpanAndInput: PureComputed<[
  Elements, string, string
], boolean> = (elements, key1, key2) => {
  const innerElements = getInnerElements(elements, key1, key2);
  if (innerElements.length) {
    return isSpanInput(innerElements);
  }
  return true;
};

const getCellRightLeft: PureComputed<[number, FocusedElement, TableColumn[], Elements],
FocusedElement | void> = (
  direction, focusedElement, tableColumns, elements,
) => {
  if (focusedElement.part !== DATA_TYPE) {
    return;
  }
  const columnIndex = getIndex(tableColumns, focusedElement.columnKey);
  if (tableColumns[columnIndex + direction]) {
    const columnKey = getNextPrevClosestColumnKey(
      tableColumns, columnIndex + direction, focusedElement.rowKey, elements, direction,
    );
    if (columnKey) {
      return {
        rowKey: focusedElement.rowKey,
        columnKey,
        part: focusedElement.part,
      };
    }
  }
  return;
};

const getFirstCell: PureComputed<
  [Elements, TableRow[], TableColumn[], TableRow[], ScrollToColumnFn?, boolean?],
  FocusedElement | void
> = (
  elements, tableBodyRows, tableColumns, tableHeaderRows, scrollToColumn, withInnerElements,
) => {
  const part = tableParts.find((p) => {
    return convertPart(p, elements, tableBodyRows);
  });
  if (!part) {
    return;
  }
  const rowKey = getRowKey(part, tableBodyRows[0].key, tableHeaderRows[0].key);
  const columnKey = tableColumns[0].key;
  if (shouldBeScrolled(elements, rowKey, columnKey, scrollToColumn)) {
    scrollToColumn(LEFT_POSITION);
    return {
      rowKey,
      columnKey,
      part,
    };
  }

  return {
    rowKey,
    columnKey,
    index: withInnerElements ? getIndexInnerElement(elements, rowKey, columnKey, 1) : undefined,
    part,
  };
};

const getLastCell: PureComputed<[Elements, TableRow[], TableColumn[]], FocusedElement | void> = (
  elements, tableBodyRows, tableColumns,
) => {
  const part = getLastPart(elements, tableBodyRows);
  if (!part) {
    return;
  }

  const rowKey = getRowKey(part, tableBodyRows[tableBodyRows.length - 1].key);
  const columnKey = getNextPrevClosestColumnKey(
    tableColumns, tableColumns.length - 1, rowKey, elements, -1,
  );

  return columnKey ? {
    rowKey,
    columnKey,
    index: getIndexInnerElement(elements, rowKey, columnKey, 1),
    part,
  } : undefined;
};

const getToolbarPagingElements: PureComputed<[Elements]> = (elements) => {
  return {
    toolbarElements: elements.toolbar && getInnerElements(elements, 'toolbar', 'none'),
    pagingElements: elements.paging && getInnerElements(elements, 'paging', 'none')
    .filter((el: any) => {
      return !el.hasAttribute('disabled') && el.getAttribute('tabindex') !== '-1';
    }),
  };
};

const getFirstCellInLastPart: PureComputed<[
  Elements, TableRow[], TableColumn[], ScrollToColumnFn?, boolean?
], FocusedElement | void> = (
  elements, tableBodyRows, tableColumns, scrollToColumn, withInnerElements,
) => {
  const lastPart = getLastPart(elements, tableBodyRows);
  if (lastPart) {
    const columnKey = tableColumns[0].key;
    const rowKey = getRowKey(lastPart, tableBodyRows[0].key);
    if (shouldBeScrolled(elements, rowKey, columnKey, scrollToColumn)) {
      scrollToColumn(LEFT_POSITION);
      return {
        rowKey,
        columnKey,
        part: lastPart,
      };
    }
    return {
      columnKey,
      rowKey,
      index: withInnerElements ? getIndexInnerElement(elements, rowKey, columnKey, 1) : undefined,
      part: lastPart,
    };
  }
  return undefined;
};

const applyEnterAction: PureComputed<[Elements, FocusedElement?], FocusedElement | void> = (
  elements, focusedElement,
) => {
  if (!focusedElement) {
    return;
  }
  const innerElements = getInnerElements(elements, focusedElement.rowKey, focusedElement.columnKey);

  if (!isDefined(focusedElement.index) && innerElements.length && isSpanInput(innerElements)) {
    if (innerElements[0].tagName === 'SPAN') {
      innerElements[0].click();
    }
    return {
      part: focusedElement.part,
      columnKey: focusedElement.columnKey,
      rowKey: focusedElement.rowKey,
      index: 0,
    };
  }
  if (focusedElement.index === 0 &&
    hasCellInput(elements, focusedElement.rowKey, focusedElement.columnKey)) {
    return {
      part: focusedElement.part,
      columnKey: focusedElement.columnKey,
      rowKey: focusedElement.rowKey,
    };
  }

  return;
};

const applyEscapeAction: PureComputed<[Elements, FocusedElement?], FocusedElement | void> = (
  elements, focusedElement,
) => {
  if (!focusedElement) {
    return;
  }

  if (focusedElement.index === 0 &&
    hasCellInput(elements, focusedElement.rowKey, focusedElement.columnKey)) {
    return {
      part: focusedElement.part,
      columnKey: focusedElement.columnKey,
      rowKey: focusedElement.rowKey,
    };
  }
  return;
};

const actionOnCheckbox: PureComputed<[Elements, FocusedElement?], void> = (
  elements, focusedElement,
) => {
  if (!focusedElement || isDefined(focusedElement.index)) {
    return;
  }

  const el = getInnerElements(elements, focusedElement.rowKey, focusedElement.columnKey, 'input')
  .filter((element: any) => {
    return element.type === 'checkbox';
  });
  if (el[0]) {
    el[0].click();
  }
};

const actionOnTreeMode: PureComputed<[Elements, RowId[], number, FocusedElement], void> = (
  elements, expandedRowIds, direction, focusedElement,
) => {
  if (!focusedElement || isDefined(focusedElement.index) || !expandedRowIds) {
    return;
  }
  const el = getInnerElements(
    elements, focusedElement.rowKey, focusedElement.columnKey, 'button, i',
  );
  const index = getIndexFromKey(focusedElement.rowKey);
  if (direction > 0 && expandedRowIds.indexOf(index) === -1 ||
  direction < 0 && expandedRowIds.indexOf(index) > -1) {
    if (el[0]) {
      el[0].click();
    }
  }
};

export const getInnerElements: GetInnerElementsFn = (
  elements, key1, key2, query = '[tabIndex], input, button, a',
) => {
  return Array.from(elements[key1][key2][0].current.querySelectorAll(query)).filter((el: any) => {
    return !el.hasAttribute('disabled') && el.getAttribute('tabindex') !== '-1';
  });
};

const getCellTopBottom: PureComputed<[number, FocusedElement, TableRow[], TableColumn[], Elements],
FocusedElement | void> = (
  direction, focusedElement, tableBodyRows, tableColumns, elements,
) => {
  if (focusedElement.part !== DATA_TYPE) {
    return;
  }
  const columnIndex = getIndex(tableColumns, focusedElement.columnKey);
  const rowIndex = getIndex(tableBodyRows, focusedElement.rowKey);
  if (tableBodyRows[rowIndex + direction]) {
    const columnKey = getNextPrevClosestColumnKey(
      tableColumns, columnIndex, tableBodyRows[rowIndex + direction].key, elements, -1,
    );
    if (columnKey) {
      return {
        rowKey: tableBodyRows[rowIndex + direction].key,
        columnKey,
        part: focusedElement.part,
      };
    }
  }
  return;
};

const getIndexFromKey = (key: string) => {
  const array = key.split('_');
  return Number(array[array.length - 1]);
};

const getCellNextPrevPart: GetCellNextPrevPartFn = (focusedElement, elements,
  tableBodyRows, tableColumns, direction,
  scrollToColumn) => {
  const part = direction > 0 ? getNextPart(focusedElement, elements, tableBodyRows) :
  getPrevPart(focusedElement, elements, tableBodyRows);
  let cell;
  if (part) {
    cell = {
      part,
      rowKey: getRowKey(part, tableBodyRows[0].key),
      columnKey: tableColumns[0].key,
    };
    if (shouldBeScrolled(elements, cell.rowKey, cell.columnKey, scrollToColumn)) {
      scrollToColumn(LEFT_POSITION);
    }
  }
  if (!cell && direction > 0 && elements.paging) {
    getInnerElements(elements, 'paging', 'none')[0].focus();
  }
  if (!cell && direction < 0 && elements.toolbar) {
    getInnerElements(elements, 'toolbar', 'none')[0].focus();
  }
  return cell;
};

export const getClosestCellByRow: PureComputed<
  [TableRow[], FocusedElement, Elements], FocusedElement
> = (
  tableBodyRows, focusedElement, elements,
) => {
  const currentIndex = getIndexFromKey(focusedElement.rowKey);
  const bodyRow = tableBodyRows.find((row) => {
    return getIndexFromKey(row.key) >= currentIndex;
  });
  const rowKey = bodyRow ? bodyRow.key : tableBodyRows[tableBodyRows.length - 1].key;
  const columnKey = focusedElement.columnKey;
  return {
    rowKey,
    columnKey,
    part: focusedElement.part,
    index: getIndexInnerElement(elements, rowKey, columnKey, 1),
  };
};

export const getNextFocusedCell: GetNextFocusedElementFn = (
  tableColumns, tableBodyRows, tableHeaderRows,
  expandedRowIds, elements, event, focusedElement,
  scrollToColumn,
) => {
  if (!focusedElement) {
    const { toolbarElements, pagingElements } = getToolbarPagingElements(elements);
    const hasFocus = (innerElements: readonly any[]) => {
      return innerElements.some((el: any) => {
        return event.target === el;
      });
    };
    if (event.ctrlKey) {
      if (event.key === 'ArrowDown' &&
      (toolbarElements && hasFocus(toolbarElements) || !toolbarElements)) {
        return getFirstCell(elements, tableBodyRows, tableColumns,
          tableHeaderRows, scrollToColumn);
      }
      if (event.key === 'ArrowUp' &&
      (pagingElements && hasFocus(pagingElements) || !pagingElements)) {
        return getFirstCellInLastPart(elements, tableBodyRows, tableColumns, scrollToColumn);
      }
    } else if (event.key === 'Tab') {
      if (toolbarElements && event.target === toolbarElements[toolbarElements.length - 1] &&
         !event.shiftKey) {
        return getFirstCell(elements, tableBodyRows, tableColumns,
          tableHeaderRows, scrollToColumn, true);
      }
      if (pagingElements && event.target === pagingElements[0] && event.shiftKey) {
        if (scrollToColumn) {
          return getFirstCellInLastPart(elements, tableBodyRows,
            tableColumns, scrollToColumn, true);
        }
        return getLastCell(elements, tableBodyRows, tableColumns);
      }
      if (!event.shiftKey) {
        const firstCell = getFirstCell(elements, tableBodyRows, tableColumns,
          tableHeaderRows, undefined, true);
        if (firstCell &&
          event.target === elements[firstCell.rowKey][firstCell.columnKey][0].current) {
          return firstCell;
        }
      } else {
        const lastCell = getLastCell(elements, tableBodyRows, tableColumns);
        if (lastCell &&
          event.target === elements[lastCell.rowKey][lastCell.columnKey][0].current) {
          return lastCell;
        }
      }
    }
  } else {
    let cell;
    switch (event.key) {
      case 'Enter':
        cell = applyEnterAction(elements, focusedElement);
        break;
      case 'Escape':
        cell = applyEscapeAction(elements, focusedElement);
        break;
      case ' ':
        actionOnCheckbox(elements, focusedElement);
        break;
      case 'Tab':
        if (event.shiftKey) {
          cell = getPrevElement(focusedElement, tableBodyRows, tableColumns,
            tableHeaderRows, elements, scrollToColumn);
        } else {
          cell = getNextElement(focusedElement, tableBodyRows, tableColumns,
            tableHeaderRows, elements, scrollToColumn);
        }
        break;
      case 'ArrowUp':
        if (event.ctrlKey) {
          cell = getCellNextPrevPart(focusedElement, elements, tableBodyRows,
            tableColumns, -1, scrollToColumn);
        } else {
          cell = getCellTopBottom(-1, focusedElement, tableBodyRows, tableColumns, elements);
        }
        break;
      case 'ArrowDown':
        if (event.ctrlKey) {
          cell = getCellNextPrevPart(focusedElement, elements, tableBodyRows,
            tableColumns, 1, scrollToColumn);
        } else {
          cell = getCellTopBottom(1, focusedElement, tableBodyRows, tableColumns, elements);
        }
        break;
      case 'ArrowLeft':
        if (event.ctrlKey) {
          actionOnTreeMode(elements, expandedRowIds, -1, focusedElement);
        } else {
          cell = getCellRightLeft(-1, focusedElement, tableColumns, elements);
        }
        break;
      case 'ArrowRight':
        if (event.ctrlKey) {
          actionOnTreeMode(elements, expandedRowIds, 1, focusedElement);
        } else {
          cell = getCellRightLeft(1, focusedElement, tableColumns, elements);
        }
        break;
    }
    return cell;
  }
};

export const getPart = (key: string): string => {
  if (tableParts.find(t => t === key)) {
    return key;
  }
  if (key.includes(BAND_TYPE)) {
    return HEADING_TYPE;
  }
  return DATA_TYPE;
};

export const getIndexToFocus: PureComputed<[string, string, Elements, any], number | undefined> = (
  key1, key2, elements, event,
) => {
  const innerElements = getInnerElements(elements, key1, key2);
  const index = innerElements.findIndex((el) => {
    return event.target === el;
  });
  return index !== -1 ? index : undefined;
};

export const filterHeaderRows = (tableHeaderRows: TableRow[]) => {
  return tableHeaderRows.filter(row =>
    row.key.includes(BAND_TYPE) || row.key.includes(HEADING_TYPE));
};

export const isRowFocused: PureComputed<[TableRow, string?], boolean> = (
  tableRow, focusedRowKey,
) => {
  if (focusedRowKey) {
    return tableRow.key === focusedRowKey;
  }
  return false;
};

export const isCellExist: PureComputed<[Elements, FocusedElement], boolean> = (
  elements, focusedElement,
) => {
  return !!(elements[focusedElement.rowKey] &&
    elements[focusedElement.rowKey][focusedElement.columnKey]);
};

export const isTabArrowUpDown = (event: any): boolean => {
  return event.key === 'Tab' || event.ctrlKey && (event.key === 'ArrowDown' || event.key === 'ArrowUp');
};

export const focus: PureComputed<
  [Elements, FocusedElement?,
  FocusedElement?, OnFocusedCellChangedFn?], void
> = (
  elements, focusedElement, prevFocusedElement, onFocusedCellChanged,
) => {
  if (!focusedElement || !elements[focusedElement.rowKey] ||
      !elements[focusedElement.rowKey][focusedElement.columnKey]) {
    return;
  }
  const el = focusedElement.index === undefined ?
  elements[focusedElement.rowKey][focusedElement.columnKey][0] :
  getInnerElements(elements, focusedElement.rowKey, focusedElement.columnKey)[focusedElement.index];

  if (el) {
    el.focus ? el.focus() : el.current.focus();
    if (onFocusedCellChanged && focusedElement.part === DATA_TYPE &&
        (prevFocusedElement?.rowKey !== focusedElement.rowKey ||
          prevFocusedElement?.columnKey !== focusedElement.columnKey)) {
      onFocusedCellChanged({
        rowKey: focusedElement.rowKey, columnKey: focusedElement.columnKey,
      });
    }
  }
};

export const isCellFocused: PureComputed<[
  TableRow, TableColumn, FocusedElement?
], boolean> = (row, column, focusedElement) => {
  if (!focusedElement || isDefined(focusedElement.index)) {
    return false;
  }
  return focusedElement.rowKey === row.key && focusedElement.columnKey === column.key;
};

export const getFocusing = (tableBodyRows: TableRow[], focusedElement?: FocusedElement) => {
  if (!focusedElement) {
    return [];
  }
  const focusedRow = tableBodyRows.find((row) => {
    return row.key === focusedElement.rowKey;
  });
  return focusedRow ? [focusedRow.rowId] : [];
};
