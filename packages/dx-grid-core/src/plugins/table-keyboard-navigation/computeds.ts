import { TABLE_FILTER_TYPE, TABLE_HEADING_TYPE, TABLE_DATA_TYPE, TABLE_BAND_TYPE } from '@devexpress/dx-grid-core';
import { 
    GetNextFocusedElementFn, FocusedElement, TableColumn, TableRow,
    GetElementFn, getElementPrevNextPartFn, Elements,
} from '../../types';

const HEADING_TYPE = TABLE_HEADING_TYPE.toString();
const FILTER_TYPE = TABLE_FILTER_TYPE.toString();
const DATA_TYPE = TABLE_DATA_TYPE.toString();
const BAND_TYPE = TABLE_BAND_TYPE.toString();

const tableParts = [HEADING_TYPE, FILTER_TYPE, DATA_TYPE];

const getIndex = (arr: TableColumn[] | TableRow [], focusedCell: FocusedElement, key: string) => {
  return arr.findIndex((el: TableColumn | TableRow) => {
    return el.key === focusedCell[key]
  });
}

const isSpanInput = (innerElements: any[]): boolean => {
  return innerElements[0].tagName === "SPAN" || innerElements[0].tagName === "INPUT" && innerElements[0].type === "text";
}

const hasInsideElements = (innerElements: any[], focusedElementIndex?: number): boolean => {
  if((innerElements.length && focusedElementIndex === undefined) || 
  (focusedElementIndex !== undefined && focusedElementIndex < innerElements.length - 1)) {
    if(innerElements.length === 1 && focusedElementIndex === undefined) {
      return !isSpanInput(innerElements);
    }
    return true;
  }
  return false;
}

const getCellNextPart: getElementPrevNextPartFn = (focusedElement, elements, tableBodyRows, tableColumns) => {
  const index = tableParts.findIndex((p) => {
    return p === focusedElement.part;
  });
  if(index === tableParts.length - 1) {
    return;
  }
  const part = tableParts.find((p, i) => {
    if(i > index) {
      if(p === DATA_TYPE) {
        return elements[tableBodyRows[0].key];
      }
      return elements[p];
    } else {
      return false;
    }
  });
  if(!part) {
    return;
  }

  const rowKey = part === DATA_TYPE ? tableBodyRows[0].key : part;
  const columnKey = tableColumns[0].key;
  return {
    rowKey,
    columnKey,
    index: cellEmptyOrHasSpanAndInput(elements, rowKey, columnKey) ? undefined : 0,
    part: part
  }
}

const getCellPrevPart: getElementPrevNextPartFn = (focusedElement, elements, tableBodyRows, tableColumns) => {
  const lastBodyRowIndex = tableBodyRows.length - 1;
  let index = tableParts.findIndex((p) => {
    return p === focusedElement.part;
  });
  let part;
  if(index === 0) {
    return;
  }
  while (index > 0) {
    index = index - 1;
    const p = tableParts[index];
    if(p === DATA_TYPE && elements[tableBodyRows[lastBodyRowIndex].key]) {
      part = DATA_TYPE;
      break;
    }
    if(elements[p]) {
      part = p;
      break;
    }
  }
  if(!part) {
    return;
  }
  
  const rowKey = part === DATA_TYPE ? tableBodyRows[lastBodyRowIndex].key : part;
  const columnKey = tableColumns[tableColumns.length - 1].key;
  const innerElements = getInnerElements(elements, rowKey, columnKey);
  return {
    rowKey,
    columnKey,
    index: cellEmptyOrHasSpanAndInput(elements, rowKey, columnKey) ? undefined : innerElements.length - 1,
    part: part
  }
}

const getPrevCellFromBody = (columnIndex: number, rowIndex: number, tableColumns: TableColumn[], 
  tableBodyRows: TableRow[], focusedElement: FocusedElement, elements: Elements) => {
  
  let prevRowKey;
  let prevColumnKey;
  let prevIndex;
  let innerElements;
  
  if(columnIndex === 0 && rowIndex === 0) {
    return getCellPrevPart(focusedElement, elements, tableBodyRows, tableColumns);
  } else if(columnIndex === 0) {
      prevRowKey = tableBodyRows[rowIndex - 1].key;
      prevColumnKey = tableColumns[tableColumns.length - 1].key;
      innerElements = getInnerElements(elements, prevRowKey, prevColumnKey);
      prevIndex = innerElements.length ? innerElements.length - 1 : undefined; 
  } else {
      prevColumnKey = tableColumns[columnIndex - 1].key;
      prevRowKey = focusedElement.rowKey;
      innerElements = getInnerElements(elements, prevRowKey, prevColumnKey);
      prevIndex = innerElements.length ? innerElements.length - 1 : undefined;
  }

  innerElements = getInnerElements(elements, prevRowKey, prevColumnKey);
  if(innerElements.length === 1 && isSpanInput(innerElements)) {
    prevIndex = undefined;
  }

  return {
    rowKey: prevRowKey,
    columnKey: prevColumnKey,
    index: prevIndex,
    part: focusedElement.part,
  }
}

const getPrevCellFromHeading = (tableHeaderRows: TableRow[], tableColumns: TableColumn[], columnIndex: number, 
  focusedElement: FocusedElement, elements: Elements) => {
  const headIndex = getIndex(tableHeaderRows, focusedElement, 'rowKey');
  let prevRowKey;
  
  if(headIndex !== 0) {
    for(let i = headIndex - 1; i >= 0; i--) {
      if(elements[tableHeaderRows[i].key][focusedElement.columnKey]) {
        prevRowKey = tableHeaderRows[i].key;
        break;
      }
    }
    if(prevRowKey) {
      return {
        columnKey: focusedElement.columnKey,
        rowKey: prevRowKey,
        part: focusedElement.part
      }
    } 
  } 
  
  if(!tableColumns[columnIndex - 1]) {
    return;
  }
  
  return {
    columnKey: tableColumns[columnIndex - 1].key,
    rowKey: tableHeaderRows[tableHeaderRows.length - 1].key,
    part: focusedElement.part
  }
}

const getPrevElement: GetElementFn = (focusedElement, tableBodyRows, tableColumns, tableHeaderRows, elements) => {
  const columnIndex = getIndex(tableColumns, focusedElement, 'columnKey');
  const rowIndex = getIndex(tableBodyRows, focusedElement, 'rowKey');
  
  if(focusedElement.index !== undefined && focusedElement.index > 0) {
    return { ...focusedElement, index: focusedElement.index - 1 };
  }

  if(focusedElement.part === DATA_TYPE) {
    return getPrevCellFromBody(columnIndex, rowIndex, tableColumns, 
      tableBodyRows, focusedElement, elements);
  }

  if(focusedElement.part === HEADING_TYPE) {
    const cell = getPrevCellFromHeading(tableHeaderRows, tableColumns, columnIndex, 
      focusedElement, elements);
      if(cell && !cellEmptyOrHasSpanAndInput(elements, cell.rowKey, cell.columnKey)) {
        const innerElements = getInnerElements(elements, cell.rowKey, cell.columnKey);
        return {
          ...cell,
          index: innerElements.length - 1
        }
      }
      return cell;
  }

  if(columnIndex === 0) {
    return getCellPrevPart(focusedElement, elements, tableBodyRows, tableColumns);  
  }
  const rowKey = focusedElement.part;
  const columnKey = tableColumns[columnIndex - 1].key;
  const innerElements = getInnerElements(elements, rowKey, columnKey);
  return {
    rowKey,
    columnKey,
    index: cellEmptyOrHasSpanAndInput(elements, rowKey, columnKey) ? undefined : innerElements.length - 1,
    part: focusedElement.part
  }
}

const getNextCellFromBody = (columnIndex: number, rowIndex: number, tableColumns: TableColumn[], 
  tableBodyRows: TableRow[], focusedElement: FocusedElement, elements: Elements) => {
  let nextRowKey = focusedElement.rowKey;
  let nextColumnKey;

  if(columnIndex === tableColumns.length - 1 && rowIndex === tableBodyRows.length - 1) {
    return getCellNextPart(focusedElement, elements, tableBodyRows, tableColumns);
  } else if(columnIndex === tableColumns.length - 1) {
    nextRowKey = tableBodyRows[rowIndex + 1].key;
    nextColumnKey = tableColumns[0].key
  } else {
    nextColumnKey = tableColumns[columnIndex + 1].key
  }

  return {
    rowKey: nextRowKey,
    columnKey: nextColumnKey,
    index: cellEmptyOrHasSpanAndInput(elements, nextRowKey, nextColumnKey) ? undefined : 0,
    part: focusedElement.part,
  }
}

const getNextCellFromHeading = (tableHeaderRows: TableRow[], tableBodyRows: TableRow[], tableColumns: TableColumn[], columnIndex: number, 
  focusedElement: FocusedElement, elements: Elements) => {
  const headIndex = getIndex(tableHeaderRows, focusedElement, 'rowKey');
  let nextRowKey;
  if(headIndex !== tableHeaderRows.length - 1) {
    for(let i = headIndex + 1; i <= tableHeaderRows.length - 1; i++) {
      if(elements[tableHeaderRows[i].key][focusedElement.columnKey]) {
        nextRowKey = tableHeaderRows[i].key;
        break;
      }
    }
    if(nextRowKey) {
      return {
        rowKey: nextRowKey,
        columnKey: focusedElement.columnKey,
        part: focusedElement.part,
      }
    }
  }
  if(!tableColumns[columnIndex + 1]) {
    return getCellNextPart(focusedElement, elements, tableBodyRows, tableColumns);
  }
  const nextColumnKey = tableColumns[columnIndex + 1].key;
  nextRowKey = tableHeaderRows[tableHeaderRows.length - 1].key;
  for(let i = 0; i <= tableHeaderRows.length - 1; i++) {
    if(elements[tableHeaderRows[i].key][nextColumnKey]) {
      nextRowKey = tableHeaderRows[i].key;
      break;
    }
  }
  return {
    rowKey: nextRowKey,
    columnKey: nextColumnKey,
    index: cellEmptyOrHasSpanAndInput(elements, nextRowKey, nextColumnKey) ? undefined : 0,
    part: focusedElement.part
  }
}

const getNextElement: GetElementFn = (focusedElement, tableBodyRows, tableColumns, tableHeaderRows, elements) => {
  const innerElements = getInnerElements(elements, focusedElement.rowKey, focusedElement.columnKey);
  const columnIndex = getIndex(tableColumns, focusedElement, 'columnKey');
  const rowIndex = getIndex(tableBodyRows, focusedElement, 'rowKey');

  if(hasInsideElements(innerElements, focusedElement.index)) {
    return { ...focusedElement, index: focusedElement.index === undefined ? 0 : focusedElement.index + 1 };
  }

  if(focusedElement.part === DATA_TYPE) {
    return getNextCellFromBody(columnIndex, rowIndex, tableColumns, 
      tableBodyRows, focusedElement, elements);
  }

  if(focusedElement.part === HEADING_TYPE) {
    return getNextCellFromHeading(tableHeaderRows, tableBodyRows, tableColumns, columnIndex, 
      focusedElement, elements);
  }

  if(columnIndex === tableColumns.length - 1) {
    return getCellNextPart(focusedElement, elements, tableBodyRows, tableColumns);  
  }
  
  return {
    rowKey: focusedElement.rowKey,
    columnKey: tableColumns[columnIndex + 1].key,
    part: focusedElement.part
  }
}

const hasCellInput = (elements: Elements, key1: string, key2: string): boolean => {
  const innerElements = getInnerElements(elements, key1, key2);
  return innerElements.length ? innerElements[0].tagName === "INPUT" : false;
}

const cellEmptyOrHasSpanAndInput = (elements: Elements, key1: string, key2: string) => {
  const innerElements = getInnerElements(elements, key1, key2)
  if(innerElements.length) {
    return isSpanInput(innerElements);
  }
  return true;
}

const getCellRightLeft = (direction: number, focusedElement: FocusedElement, tableColumns: TableColumn[]): FocusedElement | undefined => {
  if(focusedElement.part !== DATA_TYPE) {
    return;
  }
  const columnIndex = getIndex(tableColumns, focusedElement, 'columnKey');
  return tableColumns[columnIndex + direction] ? {
    rowKey: focusedElement.rowKey,
    columnKey: tableColumns[columnIndex + direction].key,
    part: focusedElement.part,
  } : undefined;
}

const getFirstCell = (elements: Elements, tableBodyRows: TableRow[], tableColumns: TableColumn[]): FocusedElement | undefined => {
  const part = tableParts.find(p => {
    if(p === DATA_TYPE) {
      return elements[tableBodyRows[0].key];
    }
    return elements[p];
  });
  if(!part) {
    return;
  }
  const rowKey = part === DATA_TYPE ? tableBodyRows[0].key : part;
  const columnKey = tableColumns[0].key;

  return {
    rowKey,
    columnKey,
    index: cellEmptyOrHasSpanAndInput(elements, rowKey, columnKey) ? undefined : 0,
    part
  }
}

const getLastCell = (elements: Elements, tableBodyRows: TableRow[], tableColumns: TableColumn[]): FocusedElement | undefined => {
  let index = tableParts.length;
  let part;
  while (index > 0) {
    index = index - 1;
    const p = tableParts[index];
    if(p === DATA_TYPE && elements[tableBodyRows[0].key]) {
      part = DATA_TYPE;
      break;
    }
    if(elements[p]) {
      part = p;
      break;
    }
  }
  if(!part) {
    return;
  }

  const rowKey = part === DATA_TYPE ? tableBodyRows[tableBodyRows.length - 1].key : part;
  const columnKey = tableColumns[tableColumns.length - 1].key;

  return {
    rowKey,
    columnKey,
    index: cellEmptyOrHasSpanAndInput(elements, rowKey, columnKey) ? undefined : 0,
    part,
  }
}

const getToolbarPagingElements = (elements: Elements) => {
  return {
    toolbarElements: elements['toolbar'] && getInnerElements(elements, 'toolbar', 'none'),
    pagingElements: elements['paging'] && getInnerElements(elements, 'paging', 'none').filter((el: any) => {
      return !el.hasAttribute('disabled') && el.getAttribute('tabindex') !== "-1";
    })
  }
}

const getFirstCellInLastPart = (elements: Elements, tableBodyRows: TableRow[], tableColumns: TableColumn[]): FocusedElement | undefined => {
  const lastElement = getLastCell(elements, tableBodyRows, tableColumns);
  if(lastElement) {
    return {
      columnKey: tableColumns[0].key,
      rowKey: lastElement.part === DATA_TYPE ? tableBodyRows[0].key : lastElement.part,
      index: lastElement.index,
      part: lastElement.part
    }
  }
  return undefined;
}

const applyEnterAction = (elements: Elements, focusedElement?: FocusedElement): FocusedElement | undefined => {
  if(!focusedElement) {
    return;
  }
  const innerElements = getInnerElements(elements, focusedElement.rowKey, focusedElement.columnKey)

  if(focusedElement.index === undefined && innerElements.length && isSpanInput(innerElements)) {
    if(innerElements[0].tagName === 'SPAN') {
      innerElements[0].click();
    }
    return {
      part: focusedElement.part,
      columnKey: focusedElement.columnKey,
      rowKey: focusedElement.rowKey,
      index: 0
    }
  }
  if(focusedElement.index === 0 && hasCellInput(elements, focusedElement.rowKey, focusedElement.columnKey)) {
    return {
      part: focusedElement.part,
      columnKey: focusedElement.columnKey,
      rowKey: focusedElement.rowKey,
    }
  }

  return;
}

const applyEscapeAction = (elements: Elements, focusedElement?: FocusedElement): FocusedElement | undefined => {
  if(!focusedElement) {
    return;
  }

  if(focusedElement.index === 0 && hasCellInput(elements, focusedElement.rowKey, focusedElement.columnKey)) {
    return {
      part: focusedElement.part,
      columnKey: focusedElement.columnKey,
      rowKey: focusedElement.rowKey,
    }
  }
  return;
}

export const getInnerElements = (elements: Elements, key1: string, key2: string): any[] => {
  return Array.from(elements[key1][key2][0].current.querySelectorAll('[tabIndex], input, button, a')).filter((el: any) => {
    return !el.hasAttribute('disabled') && el.getAttribute('tabindex') !== "-1";
  });
}

export const getCellTopBottom = (direction: number, focusedElement: FocusedElement, tableBodyRows: TableRow[]): FocusedElement | undefined => {
  if(focusedElement.part !== DATA_TYPE) {
    return;
  }
  const rowIndex = getIndex(tableBodyRows, focusedElement, 'rowKey');
  return tableBodyRows[rowIndex + direction] ? {
    rowKey: tableBodyRows[rowIndex + direction].key,
    columnKey: focusedElement.columnKey,
    part: focusedElement.part,
  } : undefined;
}

export const getNextFocusedCell: GetNextFocusedElementFn = (tableColumns, tableBodyRows, tableHeaderRows, elements, event, focusedElement) => {
  if(!focusedElement) {
    const { toolbarElements, pagingElements } = getToolbarPagingElements(elements);
    const hasFocus = (elements: any[]) => {
      return elements.some((el: any) => {
        return event.target === el;
      });
    }
    if(event.ctrlKey) {
      if(toolbarElements && event.key === 'ArrowDown' && hasFocus(toolbarElements)) {
        return getFirstCell(elements, tableBodyRows, tableColumns)
      } else if(pagingElements && event.key === 'ArrowUp' && hasFocus(pagingElements)) {
        return getFirstCellInLastPart(elements, tableBodyRows, tableColumns)
      }
    } else if(event.key === 'Tab') {
      if(toolbarElements && event.target === toolbarElements[toolbarElements.length - 1] && !event.shiftKey) {
        return getFirstCell(elements, tableBodyRows, tableColumns);
      } else if(pagingElements && event.target === pagingElements[0] && event.shiftKey) {
        return getLastCell(elements, tableBodyRows, tableColumns);
      } else if(!pagingElements && !toolbarElements) {
        const part = tableParts.find(p => {
          if(p === DATA_TYPE) {
            return elements[tableBodyRows[0].key];
          }
          return elements[p];
        });
        if(!part) {
            return;
        }
        return {
            rowKey: part === DATA_TYPE ? tableBodyRows[0].key : part,
            columnKey: tableColumns[0].key,
            part
        }
      }
    }
  } else {
    let cell;
    switch(event.key) {
      case 'Enter':
        cell = applyEnterAction(elements, focusedElement);
      break;
      case 'Escape':
        cell = applyEscapeAction(elements, focusedElement);
      break;
      case 'Tab':
        if(event.shiftKey) {
          cell = getPrevElement(focusedElement, tableBodyRows, tableColumns, tableHeaderRows, elements);
        } else {
          cell = getNextElement(focusedElement, tableBodyRows, tableColumns, tableHeaderRows, elements);
        }
        break;
      case 'ArrowUp':
        if(event.ctrlKey) {
          cell = getCellPrevPart(focusedElement, elements, tableBodyRows, tableColumns);
          if(cell) {
            cell = {
              part: cell.part,
              rowKey: cell.rowKey,
              columnKey: tableColumns[0].key
            }
          }
          if(!cell && elements['toolbar']) {
            getInnerElements(elements, 'toolbar', 'none')[0].focus();
          }
        } else {
          cell = getCellTopBottom(-1, focusedElement, tableBodyRows);
        }
        break;
      case 'ArrowDown':
        if(event.ctrlKey) {
          cell = getCellNextPart(focusedElement, elements, tableBodyRows, tableColumns);
          if(cell) {
            cell = {
              part: cell.part,
              rowKey: cell.rowKey,
              columnKey: tableColumns[0].key
            }
          }
          if(!cell && elements['paging']) {
            getInnerElements(elements, 'paging', 'none')[0].focus();
          }
        } else {
          cell = getCellTopBottom(1, focusedElement, tableBodyRows);
        }
        break;
      case 'ArrowLeft':
        cell = getCellRightLeft(-1, focusedElement, tableColumns);
        break;
      case 'ArrowRight':
        cell = getCellRightLeft(1, focusedElement, tableColumns);
        break;
    }
    return cell;
  }
}

export const getPart = (key: string): string => {
  if(tableParts.find(t => { return t === key })) {
    return key;
  }
  if(key.includes(BAND_TYPE)) {
    return HEADING_TYPE;
  }
  return DATA_TYPE;
}

export const getIndexToFocus = (key1: string, key2: string, elements: Elements): number | undefined => {
  if(hasCellInput(elements, key1, key2)) {
    return 0;
  }
  return;
}

export const processEvents = (node: any, process: string, handler: Function): void => {
  node.querySelectorAll('table').forEach((n: any) => {
    n[process]('keydown', handler);
  });
}

export const handleOnFocusedCallChanged = (onFocusedCellChanged: Function, focusedElement: FocusedElement, prevFocusedElement: FocusedElement): void => {
    if(focusedElement.part === DATA_TYPE && 
        (prevFocusedElement?.rowKey !== focusedElement.rowKey || prevFocusedElement?.columnKey !== focusedElement.columnKey)) {
      onFocusedCellChanged({ rowKey: focusedElement.rowKey, columnKey: focusedElement.columnKey });
    }
}

export const filterHeaderRows = (tableHeaderRows: TableRow[]) => {
  return tableHeaderRows.filter(row => row.key.includes(BAND_TYPE) || row.key.includes(HEADING_TYPE));
}