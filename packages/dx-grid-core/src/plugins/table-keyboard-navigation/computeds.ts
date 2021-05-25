import { TABLE_FILTER_TYPE, TABLE_HEADING_TYPE } from '@devexpress/dx-grid-core';
import { 
    GetNextFocusedElementFn, GetFocusedElementFn, FocusedElement, TableColumn, TableRow,
    GetElementFn, getElementPrevNextPartFn, Elements,
} from '../../types';

  const tableParts = ['toolbar', TABLE_HEADING_TYPE.toString(), TABLE_FILTER_TYPE.toString(), 'body', 'paging'];

const getIndex = (arr: TableColumn[] | TableRow [], focusedCell: FocusedElement, key: string) => {
  return arr.findIndex((el: TableColumn | TableRow) => {
    return el.key === focusedCell[key]
  });
}

const isTablePart = (part: string): boolean => {
  return part !== 'toolbar' && part !== 'paging';
}

const notSpanInput = (cell: any[]): boolean => {
  return cell[1].tagName !== "SPAN" && cell[1].tagName !== "INPUT";
}

const hasInsideElements = (focusedElement: FocusedElement, cell: any[]) => {
  if(focusedElement.index < cell.length - 1) {
    if(cell.length === 2 && focusedElement.index === 0) {
      return notSpanInput(cell);
    }
    return true;
  }
  return false;
}

const getElementNextPart: getElementPrevNextPartFn = (focusedElement, elements, tableBodyRows, tableColumns) => {
  const index = tableParts.findIndex((p) => {
    return p === focusedElement.part;
  });
  if(index === tableParts.length - 1) {
    return;
  }
  const part = tableParts.find((p, i) => {
    if(i > index) {
      if(p === 'body') {
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

  const rowKey = part === 'body' ? tableBodyRows[0].key : part;
  const columnKey = isTablePart(part) ? tableColumns[0].key  : 'none';
  const cell = elements[rowKey][columnKey];
  return {
    rowKey,
    columnKey,
    index: isTablePart(part) && cell.length > 1 && notSpanInput(cell) ? 1 : 0,
    part: part
  }
}

const getElementPrevPart: getElementPrevNextPartFn = (focusedElement, elements, tableBodyRows, tableColumns) => {
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
    if(p === 'body' && elements[tableBodyRows[lastBodyRowIndex].key]) {
      part = 'body';
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
  
  const rowKey = part === 'body' ? tableBodyRows[lastBodyRowIndex].key : part;
  const columnKey = isTablePart(part) ? tableColumns[tableColumns.length - 1].key  : 'none';
  const cell = elements[rowKey][columnKey];
  return {
    rowKey,
    columnKey,
    index: !isTablePart(part) || cell.length > 1 && notSpanInput(cell) ? cell.length - 1 : 0,
    part: part
  }
}

const selectElementInCell = (focusedElement: FocusedElement, cell: any[]): boolean => {
  if(focusedElement.index > 0) {
    if(focusedElement.index === 1) {
      return false;
    }
    return true;
  }
  return false;
};

const getPrevElement: GetElementFn = (focusedElement, tableBodyRows, tableColumns, elements) => {
  const currentCell = elements[focusedElement.rowKey][focusedElement.columnKey];
  if(!isTablePart(focusedElement.part)) {
    if(focusedElement.index > 0) {
      return { ...focusedElement, index: focusedElement.index - 1 };
    } else {
      return getElementPrevPart(focusedElement, elements, tableBodyRows, tableColumns);
    }
  }

  const columnIndex = getIndex(tableColumns, focusedElement, 'columnKey');
  const rowIndex = getIndex(tableBodyRows, focusedElement, 'rowKey');
  if(focusedElement.part === 'body') {
    let prevRowKey;
    let prevColumnKey;
    let prevIndex;
    
    if(selectElementInCell(focusedElement, currentCell)) {
      prevColumnKey = focusedElement.columnKey;
      prevRowKey = focusedElement.rowKey;
      prevIndex = focusedElement.index - 1;
    } else if(columnIndex === 0 && rowIndex === 0) {
      return getElementPrevPart(focusedElement, elements, tableBodyRows, tableColumns);
    } else if(columnIndex === 0) {
        prevRowKey = tableBodyRows[rowIndex - 1].key;
        prevColumnKey = tableColumns[tableColumns.length - 1].key;
        prevIndex = elements[prevRowKey][prevColumnKey].length - 1;
    } else {
        prevColumnKey = tableColumns[columnIndex - 1].key;
        prevRowKey = focusedElement.rowKey;
        prevIndex = elements[prevRowKey][prevColumnKey].length - 1;
    }

    if(prevIndex === 1) {
      const cell = elements[prevRowKey][prevColumnKey];
      if(cell.length === 2 && !notSpanInput(cell)) {
        prevIndex = 0;
      }
    }

    return {
      rowKey: prevRowKey,
      columnKey: prevColumnKey,
      index: prevIndex,
      part: focusedElement.part,
    }
  }

  if(selectElementInCell(focusedElement, currentCell)) {
    return { ...focusedElement, index: focusedElement.index - 1 };
  } else {
    if(columnIndex === 0) {
      return getElementPrevPart(focusedElement, elements, tableBodyRows, tableColumns);  
    }
    const rowKey = focusedElement.part;
    const columnKey = tableColumns[columnIndex - 1].key;
    const cell = elements[rowKey][columnKey];
    return {
      rowKey,
      columnKey,
      index: cell.length > 1 && notSpanInput(cell) ? cell.length - 1 : 0,
      part: focusedElement.part
    }
  }
}

const getNextElement: GetElementFn = (focusedElement, tableBodyRows, tableColumns, elements) => {
  const currentCell = elements[focusedElement.rowKey][focusedElement.columnKey];
  if(!isTablePart(focusedElement.part)) {
    if(focusedElement.index < elements[focusedElement.part]['none'].length - 1) {
      return { ...focusedElement, index: focusedElement.index + 1 };
    } else {
      return getElementNextPart(focusedElement, elements, tableBodyRows, tableColumns);
    }
  }

  const columnIndex = getIndex(tableColumns, focusedElement, 'columnKey');
  const rowIndex = getIndex(tableBodyRows, focusedElement, 'rowKey');
  if(focusedElement.part === 'body') {
    let nextRowKey;
    let nextColumnKey;
    let nextIndex = 0;

    if(hasInsideElements(focusedElement, currentCell)) {
      nextColumnKey = focusedElement.columnKey;
      nextRowKey = focusedElement.rowKey;
      nextIndex = focusedElement.index + 1;
    } else if(columnIndex === tableColumns.length - 1 && rowIndex === tableBodyRows.length - 1) {
      return getElementNextPart(focusedElement, elements, tableBodyRows, tableColumns);
    } else if(columnIndex === tableColumns.length - 1) {
      nextRowKey = tableBodyRows[rowIndex + 1].key;
      nextColumnKey = tableColumns[0].key
    } else {
      nextColumnKey = tableColumns[columnIndex + 1].key;
      nextRowKey = focusedElement.rowKey;
    }
    if(nextIndex === 0) {
      const cell = elements[nextRowKey][nextColumnKey];
      if(cell.length > 1 && notSpanInput(cell)) {
        nextIndex = 1;
      }
    }

    return {
      rowKey: nextRowKey,
      columnKey: nextColumnKey,
      index: nextIndex,
      part: focusedElement.part,
    }
  }

  if(hasInsideElements(focusedElement, currentCell)) {
    return { ...focusedElement, index: focusedElement.index + 1 };
  } else {
    if(columnIndex === tableColumns.length - 1) {
      return getElementNextPart(focusedElement, elements, tableBodyRows, tableColumns);  
    }
    return {
      rowKey: focusedElement.part,
      columnKey: tableColumns[columnIndex + 1].key,
      index: 0,
      part: focusedElement.part
    }
  }
}

const getCellTopBottom = (direction: number, focusedElement: FocusedElement, tableBodyRows: TableRow[]): FocusedElement | undefined => {
  if(focusedElement.part !== 'body') {
    return;
  }
  const rowIndex = getIndex(tableBodyRows, focusedElement, 'rowKey');
  return tableBodyRows[rowIndex + direction] ? {
    rowKey: tableBodyRows[rowIndex + direction].key,
    columnKey: focusedElement.columnKey,
    index: 0,
    part: focusedElement.part,
  } : undefined;
}

const getCellRightLeft = (direction: number, focusedElement: FocusedElement, tableColumns: TableColumn[]): FocusedElement | undefined => {
  if(focusedElement.part !== 'body') {
    return;
  }
  const columnIndex = getIndex(tableColumns, focusedElement, 'columnKey');
  return tableColumns[columnIndex + direction] ? {
    rowKey: focusedElement.rowKey,
    columnKey: tableColumns[columnIndex + direction].key,
    index: 0,
    part: focusedElement.part,
  } : undefined;
}

const getFocusedElement: GetFocusedElementFn = (key, shiftKey, focusedElement, tableColumns, tableBodyRows, elements) => {
  let element;
  switch(key) {
    case 'Tab':
      if(shiftKey) {
        element = getPrevElement(focusedElement, tableBodyRows, tableColumns, elements);
      } else {
        element = getNextElement(focusedElement, tableBodyRows, tableColumns, elements);
      }
      break;
    case 'ArrowUp':
      element = getCellTopBottom(-1, focusedElement, tableBodyRows);
      break;
    case 'ArrowDown':
      element = getCellTopBottom(1, focusedElement, tableBodyRows);
      break;
    case 'ArrowLeft':
      element = getCellRightLeft(-1, focusedElement, tableColumns);
      break;
    case 'ArrowRight':
      element = getCellRightLeft(1, focusedElement, tableColumns);
      break;
  }
  return element;
}

export const getNextFocusedElement: GetNextFocusedElementFn = (tableColumns, tableBodyRows, elements, key, shiftKey, focusedElement) => {
  if(!focusedElement) {
    const part = tableParts.find(p => {
      if(p === 'body') {
        return elements[tableBodyRows[0].key];
      }
      return elements[p];
    });
    if(!part || key !== 'Tab') {
        return;
    }
    return {
        rowKey: part === 'body' ? tableBodyRows[0].key : part,
        columnKey: isTablePart(part) ? tableColumns[0].key  : 'none',
        index: 0,
        part
    }
  } else {
    return getFocusedElement(key, shiftKey, focusedElement, tableColumns, tableBodyRows, elements);
  }
}

export const applyEnterAction = (elements: Elements, focusedElement?: FocusedElement): FocusedElement | undefined => {
  if(!focusedElement) {
    return;
  }
  const cell = elements[focusedElement.rowKey][focusedElement.columnKey];
  
  if(focusedElement.index === 0 && cell.length > 1 && !notSpanInput(cell)) {
    if(cell[1].tagName === 'SPAN') {
      cell[1].click();
    }
    return {
      ...focusedElement,
      index: 1
    }
  }
  if(focusedElement.index === 1 && cell.length > 1 && cell[1].tagName === "INPUT") {
    return {
      ...focusedElement,
      index: 0
    }
  }

  return;
}

export const applyEscapeAction = (elements: Elements, focusedElement?: FocusedElement): FocusedElement | undefined => {
  if(!focusedElement) {
    return;
  }
  const cell = elements[focusedElement.rowKey][focusedElement.columnKey];

  if(focusedElement.index === 1 && cell.length > 1 && cell[1].tagName === "INPUT") {
    return {
      ...focusedElement,
      index: 0
    }
  }
  return ;
}

export const getPart = (key: string): string => {
  if(tableParts.find(t => { return t === key })) {
    return key;
  } else {
    return 'body';
  }
}

export const getIndexToFocus = (key1: string, key2: string, elements: Elements): number => {
  const cell = elements[key1][key2];
  if(cell.length > 1 && cell[1].tagName === "INPUT") {
    return 1;
  }
  return 0;
}