import * as React from 'react';
import {
 Plugin, TemplateConnector, Getter,
} from '@devexpress/dx-react-core';
import { TABLE_FILTER_TYPE, TABLE_HEADING_TYPE } from '@devexpress/dx-grid-core';

const tableParts = ['toolbar', TABLE_HEADING_TYPE.toString(), TABLE_FILTER_TYPE.toString(), 'body', 'footer_row', 'paging'];

const getIndex = (arr, focusedCell, key) => {
  return arr.findIndex(el => {
    return el.key === focusedCell[key]
  });
}

// const getFocusedCell = (direction, columns, focusedCurrentElement) => {
//   let rowKey;
//   let columnKey;
//   const columnIndex = getIndex(columns, focusedCurrentElement, 'kolumnKey') 
//   switch(direction){
//     case 'Tab':
//       if(!focusedCurrentElement.rowKey && !focusedCurrentElement.columnKey) {
//         return {rowKey: 0, columnKey: columns[0].key}
//       }
//       if(columnIndex === columns.length - 1) {
//         rowKey = focusedCurrentElement.rowKey + 1;
//         columnKey = columns[0].key
//       } else {
//         columnKey = columns[columnIndex + 1].key;
//         rowKey = focusedCurrentElement.rowKey;
//       }
//       break;
//     case 'ArrowUp':
//       rowKey = focusedCurrentElement.rowKey - 1;
//       columnKey = columns[columnIndex].key;
//       break;
//     case 'ArrowDown':
//       rowKey = focusedCurrentElement.rowKey + 1;
//       columnKey = columns[columnIndex].key;
//       break;
//     case 'ArrowLeft':
//       rowKey = focusedCurrentElement.rowKey;
//       columnKey = columns[columnIndex - 1].key;
//       break;
//     case 'ArrowRight':
//       rowKey = focusedCurrentElement.rowKey;
//       columnKey = columns[columnIndex + 1].key;
//       break;
//   }

//   return {
//     rowKey,
//     columnKey
//   }
// }

// const focuseCell = (body, columns, focusedCell) => {
//   const columnIndex = getIndex(columns, focusedCell, 'columnKey');
//   body.rows[focusedCell.rowKey].childNodes[columnIndex].focus();
// }

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
  if(focusedElement.part === 'toolbar' && focusedElement.part === 'paging') {
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
        columnKey: part === 'body' ? tableColumns[0].key  : 'none',
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
        if(columnIndex === tableColumns.length - 1) {
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

const keyboadrNavigationProvider = (tableColumns, tableBodyRows, focusedElement, elements, direction, shiftKey, updateFocusedElement) => {
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
  properties: { body: any, columns: any[], headerElements: any[] } = {
    body: undefined,
    columns: [],
    headerElements: []
  }
  elements: any[][] = [];
  tableColumns = [];
  tableBodyRows = [];


  constructor(props) {
    super(props);

    this.state = {
      focusedCell: {
        rowKey: undefined,
        columnKey: undefined
      },
      focusedElementIndex: undefined,
      focusedElement: {
        rowKey: undefined,
        columnKey: undefined,
        index: undefined,
        part: undefined
      }
    }
    this.updateFocusState = this.updateFocusState.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
  }

  setRefInElements(ref, key1, key2) {
    if(!this.elements[key1]) {
      this.elements[key1] = [];
    }
    if(!this.elements[key1][key2]) {
      this.elements[key1][key2] = [];
    }
    this.elements[key1][key2].push(ref);
    const innerElements = ref.current.querySelectorAll('[tabIndex]');
    innerElements.forEach(el => {
      this.elements[key1][key2].push(el);
    })
    console.log(this.elements)
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
    console.log(this.elements)
  }

  handleKeyDown(event) {
    const { focusedElement } = this.state;
    if(event.key === 'Tab') {
      event.preventDefault();
    }
    keyboadrNavigationProvider(this.tableColumns, this.tableBodyRows, focusedElement, 
      this.elements, event.key, event.shiftKey, this.updateFocusedElement.bind(this));
    // if(focusedElementIndex === undefined && !focusedCell.rowKey && !focusedCell.columnKey) {
    //   if(this.properties.headerElements.length) {
    //     if(event.key === 'Tab') {
    //       this.updateFocusState(undefined, 0);
    //       this.properties.headerElements[0].focus();
    //     }
    //   } else {
    //     const nextFocusedCell = getFocusedCell(event.key, this.properties.columns, focusedCell);
    //     this.updateFocusState(nextFocusedCell);
    //     focuseCell(this.properties.body, this.properties.columns, nextFocusedCell);
    //   }
    // } else if(focusedElementIndex !== undefined && focusedElementIndex < this.properties.headerElements.length - 1) {
    //   if(event.key === 'Tab') {
    //     this.updateFocusState(undefined, focusedElementIndex + 1);
    //     this.properties.headerElements[focusedElementIndex + 1].focus();
    //   }
    // } else {
    //   const nextFocusedCell = getFocusedCell(event.key, this.properties.columns, focusedCell);
    //   this.updateFocusState(nextFocusedCell);
    //   focuseCell(this.properties.body, this.properties.columns, nextFocusedCell);
    // }
  }

  updateFocusState(cell?, index?) {
    if(cell) {
      this.setState({
        focusedCell: cell
      })
    } else {
      this.setState({
        focusedElementIndex: index
      })
    }
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
        <Getter name="KeyboardNavigationEnabled" value={true} />
        <Getter name="setRefKeyboardNavigation" value={this.setRefInElements.bind(this)} />
        <TemplateConnector>
        {({ refTable, tableColumns, tableBodyRows }) => {
            if(refTable) {
              console.log(tableBodyRows)
              const table = refTable.querySelectorAll('table')[0];
              this.properties.body = table.tBodies[0];
              this.properties.headerElements = table.tHead.querySelectorAll('[tabIndex]');
            }
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