import { TABLE_FILTER_TYPE, TABLE_HEADING_TYPE } from '@devexpress/dx-grid-core';
import { 
    GetNextFocusedElementFn, GetFocusedElementFn, FocusedElement, TableColumn, TableRow,
    GetElementFn, getElementPrevNextPartFn,
} from '../../types';

const tableParts = ['toolbar', TABLE_HEADING_TYPE.toString(), TABLE_FILTER_TYPE.toString(), 'body', 'paging'];

const getIndex = (arr: TableColumn[] | TableRow [], focusedCell: FocusedElement, key: string) => {
  return arr.findIndex((el: TableColumn | TableRow) => {
    return el.key === focusedCell[key]
  });
}

const isEmpty = (cell: FocusedElement): boolean => {
  return !cell.rowKey && !cell.columnKey;
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

  return {
    rowKey: part === 'body' ? tableBodyRows[0].key : part,
    columnKey: isTablePart(part) ? tableColumns[0].key  : 'none',
    index: 0,
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
  return {
    rowKey,
    columnKey,
    index: elements[rowKey][columnKey].length - 1,
    part: part
  }
}

const isTablePart = (part: string): boolean => {
  return part !== 'toolbar' && part !== 'paging';
}

const getPrevElement: GetElementFn = (focusedElement, tableBodyRows, tableColumns, elements) => {
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
    let prevIndex = 0;
    
    if(focusedElement.index > 0) {
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

    return {
      rowKey: prevRowKey,
      columnKey: prevColumnKey,
      index: prevIndex,
      part: focusedElement.part,
    }
  }

  if(focusedElement.index > 0) {
    return { ...focusedElement, index: focusedElement.index - 1 };
  } else {
    if(columnIndex === 0) {
      return getElementPrevPart(focusedElement, elements, tableBodyRows, tableColumns);  
    }
    const rowKey = focusedElement.part;
    const columnKey = tableColumns[columnIndex - 1].key;
    return {
      rowKey,
      columnKey,
      index: elements[rowKey][columnKey].length - 1,
      part: focusedElement.part
    }
  }
}

const getNextElement: GetElementFn = (focusedElement, tableBodyRows, tableColumns, elements) => {
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

    if(columnIndex === tableColumns.length - 1 && rowIndex === tableBodyRows.length - 1) {
      return getElementNextPart(focusedElement, elements, tableBodyRows, tableColumns);
    } else if(columnIndex === tableColumns.length - 1) {
      nextRowKey = tableBodyRows[rowIndex + 1].key;
      nextColumnKey = tableColumns[0].key
    } else {
      if(focusedElement.index < elements[focusedElement.rowKey][focusedElement.columnKey].length - 1) {
        nextColumnKey = focusedElement.columnKey;
        nextRowKey = focusedElement.rowKey;
        nextIndex = focusedElement.index + 1;
      } else {
        nextColumnKey = tableColumns[columnIndex + 1].key;
        nextRowKey = focusedElement.rowKey;
      }
    }

    return {
      rowKey: nextRowKey,
      columnKey: nextColumnKey,
      index: nextIndex,
      part: focusedElement.part,
    }
  }

  if(focusedElement.index < elements[focusedElement.part][focusedElement.columnKey].length - 1) {
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

export const getNextFocusedElement: GetNextFocusedElementFn = (tableColumns, tableBodyRows, focusedElement, elements, key, shiftKey) => {
  if(isEmpty(focusedElement)) {
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