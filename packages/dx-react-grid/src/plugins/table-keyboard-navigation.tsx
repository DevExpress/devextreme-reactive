import * as React from 'react';
import {
 Plugin, TemplateConnector, Getter,
} from '@devexpress/dx-react-core';
import { TABLE_FILTER_TYPE, TABLE_HEADING_TYPE, TABLE_BAND_TYPE } from '@devexpress/dx-grid-core';

const tableParts = ['toolbar', TABLE_HEADING_TYPE.toString(), TABLE_FILTER_TYPE.toString(), 'body', 'footer_row', 'paging'];

const getIndex = (arr, focusedCell, key) => {
  return arr.findIndex(el => {
    return el.key === focusedCell[key]
  });
}

const isEmpty = (cell) => {
  return !cell.rowKey && !cell.columnKey;
}

const getNextPart = (index, elements, tableBodyRows) => {
  return tableParts.find((p, i) => {
    if(i > index) {
      if(p === 'body') {
        return elements[tableBodyRows[0].key];
      }
      return elements[p];
    } else {
      return false;
    }
  });
} 

const getNextFocusedElement = (direction, shiftKey, focusedElement, tableColumns, tableBodyRows, elements) => {
  if(focusedElement.part !== 'body' && (direction === 'ArrowUp' || direction === 'ArrowDown')) {
    return;
  }
  if(focusedElement.part === 'toolbar' || focusedElement.part === 'paging') {
    if(focusedElement.index < elements[focusedElement.part]['none'].length - 1) {
      return {
        rowKey: focusedElement.rowKey,
        columnKey: focusedElement.columnKey,
        index: focusedElement.index + 1,
        part: focusedElement.part
      }
    } else {
      let index = tableParts.findIndex((p) => {
        return p === focusedElement.part;
      });
      if(index === tableParts.length - 1) {
        return;
      }
      const part = getNextPart(index, elements, tableBodyRows);
      return {
        rowKey: part,
        columnKey: (part !== 'toolbar' && part !== 'paging') ? tableColumns[0].key  : 'none',
        index: 0,
        part: part
      }      
    }
  }

  if(focusedElement.part === 'body') {
    let nextRowKey;
    let nextColumnKey;
    let nextIndex = 0;
    const columnIndex = getIndex(tableColumns, focusedElement, 'columnKey');
    const rowIndex = getIndex(tableBodyRows, focusedElement, 'rowKey');
    switch(direction) {
      case 'Tab':
        if(columnIndex === tableColumns.length - 1 && rowIndex === tableBodyRows.length - 1) {
          let index = tableParts.findIndex((p) => {
            return p === focusedElement.part;
          });
          if(index === tableParts.length - 1) {
            return;
          }
          const part = getNextPart(index, elements, tableBodyRows);
          return {
            rowKey: part,
            columnKey: (part !== 'toolbar' && part !== 'paging') ? tableColumns[0].key  : 'none',
            index: 0,
            part: part
          }   
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
        break;
      case 'ArrowUp':
        nextRowKey = tableBodyRows[rowIndex - 1].key;
        nextColumnKey = tableColumns[columnIndex].key;
        break;
      case 'ArrowDown':
        nextRowKey = tableBodyRows[rowIndex + 1].key;
        nextColumnKey = tableColumns[columnIndex].key;
        break;
      case 'ArrowLeft':
        nextRowKey = focusedElement.rowKey;
        nextColumnKey = tableColumns[columnIndex - 1].key;
        break;
      case 'ArrowRight':
        nextRowKey = focusedElement.rowKey;
        nextColumnKey = tableColumns[columnIndex + 1].key;
        break;
    }

    return {
      rowKey: nextRowKey,
      columnKey: nextColumnKey,
      index: nextIndex,
      part: focusedElement.part,
    }
  }

  if(focusedElement.index < elements[focusedElement.part][focusedElement.columnKey].length - 1) {
    return {
      rowKey: focusedElement.rowKey,
      columnKey: focusedElement.columnKey,
      index: focusedElement.index + 1,
      part: focusedElement.part
    }
  } else {
    let columnIndex = tableColumns.findIndex(c => {
      return c.key === focusedElement.columnKey;
    });
    if(columnIndex === tableColumns.length - 1) {
      let index = tableParts.findIndex((p) => {
        return p === focusedElement.part;
      });
      if(index === tableParts.length - 1) {
        return;
      }
      const part = getNextPart(index, elements, tableBodyRows);
      return {
        rowKey: part === 'body' ? tableBodyRows[0].key : part,
        columnKey: (part !== 'toolbar' && part !== 'paging') ? tableColumns[0].key  : 'none',
        index: 0,
        part: part
      }    
    }
    return {
      rowKey: focusedElement.part,
      columnKey: tableColumns[columnIndex + 1].key,
      index: 0,
      part: focusedElement.part
    }
  }
}

const keyboardNavigationProvider = (tableColumns, tableBodyRows, focusedElement, elements, direction, shiftKey, updateFocusedElement) => {
  let nextFocusedElement: {
    rowKey?: any,
    columnKey?: any,
    index?: any,
    part?: any
  } | undefined = {};
  if(isEmpty(focusedElement)) {
    const part = tableParts.find(p => {
      if(p === 'body') {
        return elements[tableBodyRows[0].key];
      }
      return elements[p];
    });
    if(part !== 'toolbar' && part !== 'paging') {
      nextFocusedElement.rowKey = part === 'body' ? tableBodyRows[0].key : part;
      nextFocusedElement.columnKey = tableColumns[0].key;
      nextFocusedElement.index = 0;
      nextFocusedElement.part = part;
    } else {
      nextFocusedElement.rowKey = part;
      nextFocusedElement.columnKey = 'none';
      nextFocusedElement.index = 0;
      nextFocusedElement.part = part;
    }
  } else {
    nextFocusedElement = getNextFocusedElement(direction, shiftKey, focusedElement, tableColumns, tableBodyRows, elements);
    if(!nextFocusedElement) {
      return;
    }
  }
  const el = elements[nextFocusedElement.rowKey][nextFocusedElement.columnKey][nextFocusedElement.index];
  if(el.focus) {
    el.focus();
  } else {
    el.current.focus();
  }

  updateFocusedElement(nextFocusedElement);
}

class TableKeyboardNavigationBase extends React.PureComponent<any, any> {
  elements: any[][] = [];
  tableColumns = [];
  tableBodyRows = [];


  constructor(props) {
    super(props);

    this.state = {
      focusedElement: {
        rowKey: undefined,
        columnKey: undefined,
        index: undefined,
        part: undefined
      }
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
  }

  pushRef(ref, key1, key2) {
    if(!this.elements[key1]) {
      this.elements[key1] = [];
    }
    if(!this.elements[key1][key2]) {
      this.elements[key1][key2] = [];
    }
    if(key1 !== 'toolbar' && key1 !== 'paging') { 
      this.elements[key1][key2].push(ref);
    }
    const innerElements = ref.current.querySelectorAll('[tabIndex], input');
    innerElements.forEach(el => {
      this.elements[key1][key2].push(el);
    })
  }

  setRef(ref, key1, key2) {
    if(key1.toString().includes(TABLE_BAND_TYPE.toString())) {
      this.pushRef(ref, TABLE_HEADING_TYPE.toString(), key2);
    } else {
      this.pushRef(ref, key1, key2);
    }
  }

  componentDidMount() {
    this.setupNodeSubscription();
  }

  setupNodeSubscription() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('click', this.handleMouseClick);
  }

  handleMouseClick(event) {
    console.log(event)
  }

  handleKeyDown(event) {
    const { focusedElement } = this.state;
    if(event.key === 'Tab') {
      event.preventDefault();
    }
    keyboardNavigationProvider(this.tableColumns, this.tableBodyRows, focusedElement, 
      this.elements, event.key, event.shiftKey, this.updateFocusedElement.bind(this));
  }

  updateFocusedElement(element) {
    this.setState({
      focusedElement: element
    })
  }
  
  render() {
    return (
      <Plugin
        name="TableKeyboardNavigation"
      >
        <Getter name="keyboardNavigationParams" value={{
          tabIndex: -1,
          setRefForKeyboardNavigation: this.setRef.bind(this)
        }} />
        <TemplateConnector>
        {({ tableColumns, tableBodyRows }) => {
            this.tableColumns = tableColumns;
            this.tableBodyRows = tableBodyRows;
            return null;
          }}
          </TemplateConnector>
      </Plugin>
    );
  }
}

export const TableKeyboardNavigation: React.ComponentType<any> = TableKeyboardNavigationBase;