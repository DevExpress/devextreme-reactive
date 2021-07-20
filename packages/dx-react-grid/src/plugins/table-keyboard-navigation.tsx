import * as React from 'react';
import {
 Plugin, TemplateConnector, Getter,
} from '@devexpress/dx-react-core';
import { 
  TABLE_ADDED_TYPE, TABLE_DATA_TYPE,
  getNextFocusedCell,  getPart, getIndexToFocus,
  processEvents, handleOnFocusedCallChanged, getCellTopBottom, getInnerElements,
  filterHeaderRows,
} from '@devexpress/dx-grid-core';
import { KeyboardNavigationProps, KeyboardNavigationState, TableRow } from '../types';

const DATA_TYPE = TABLE_DATA_TYPE.toString();
class TableKeyboardNavigationBase extends React.PureComponent<KeyboardNavigationProps, KeyboardNavigationState> {
  elements: any[][] = [];
  tableColumns = [];
  tableBodyRows = [];
  handleKeyDownProcessed = false;
  rootRef = {} as any;
  tableHeaderRows: TableRow[] = [];

  constructor(props) {
    super(props);

    const focusedCell = props.focusedCell || props.defaultFocusedCell;

    this.state = {
      focusedElement: focusedCell ? { part: DATA_TYPE, ...focusedCell } : focusedCell
    }
    this.handleKeyDownOnWidget = this.handleKeyDownOnWidget.bind(this);
    this.handleKeyDownOnTable = this.handleKeyDownOnTable.bind(this);
  }

  static getDerivedStateFromProps(props: KeyboardNavigationProps, state: KeyboardNavigationState): KeyboardNavigationState {
    const focusedCell = props.focusedCell !== undefined ? props.focusedCell : state.focusedElement;
    return {
      focusedElement: focusedCell ? {
        part: DATA_TYPE,
        ...focusedCell
      } : focusedCell
    }
  }

  componentWillUnmount() {
    if(this.rootRef.current) {
      this.rootRef.current.removeEventListener('keydown', this.handleKeyDownOnWidget);
      processEvents(this.rootRef.current, 'removeEventListener', this.handleKeyDownOnTable);
    }
  }

  componentDidUpdate(_, prevState) {
    const { focusedElement } = this.state;
    this.focus(focusedElement, prevState.focusedElement);
  }

  pushRef(ref, key1, key2) {
    const { focusedElement } = this.state;
    if(!this.elements[key1]) {
      this.elements[key1] = [];
    }
    if(!this.elements[key1][key2]) {
      this.elements[key1][key2] = [];
    }

    this.elements[key1][key2].push(ref);

    if(focusedElement?.rowKey === key1 && focusedElement?.columnKey === key2) {
      this.focus(this.state.focusedElement);
    }

    if(key1.toString().includes(TABLE_ADDED_TYPE.toString()) && key2 === (this.tableColumns[0] as any).key) {
      this.setState({
        focusedElement: {
          part: DATA_TYPE,
          columnKey: key2,
          rowKey: key1
        }
      });
    }
  }

  removeRef(key1, key2) {
    const { focusedElement } = this.state;

    if(focusedElement && focusedElement.rowKey === key1 && focusedElement.columnKey === key2) {
      let newFocusedElement = getCellTopBottom(1, focusedElement, this.tableBodyRows);
      if(!newFocusedElement) {
        newFocusedElement = getCellTopBottom(-1, focusedElement, this.tableBodyRows);
      }
      if(newFocusedElement) {
        this.setState({
          focusedElement: newFocusedElement
        })
      }
    }
    delete this.elements[key1][key2];
    if(Object.keys(this.elements[key1]).length === 0) {
      delete this.elements[key1];
    }
  }

  updateRef(ref, key1, key2, action) {
    if(action === 'add') {
      this.pushRef(ref, key1, key2);
    } else {
      this.removeRef(key1, key2);
    }
  }

  updateStateAndEvents(focusedCell, event) {
    processEvents(this.rootRef.current, event, this.handleKeyDownOnTable);
    this.setState({
      focusedElement: focusedCell
    });
  }

  handleKeyDownOnWidget(event) {
    const { focusedElement } = this.state;
    let focusedCell;
    
    if(this.handleKeyDownProcessed) {
      this.handleKeyDownProcessed = false;
      return;
    }
    focusedCell = getNextFocusedCell(this.tableColumns, this.tableBodyRows, this.tableHeaderRows, this.elements, event, focusedElement);
    
    if(focusedCell && event.ctrlKey && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      event.preventDefault();
      this.updateStateAndEvents(focusedCell, 'addEventListener');
      return;
    }
    
    if(event.key === 'Tab') {
      if(focusedCell) {
        event.preventDefault();
        this.updateStateAndEvents(focusedCell, 'addEventListener');
      } else {
        this.updateStateAndEvents(undefined, 'removeEventListener');
      }
    }
  }

  handleKeyDownOnTable(event) {
    const { focusedElement } = this.state;
    
    const nextFocusedElement = getNextFocusedCell(this.tableColumns, this.tableBodyRows, this.tableHeaderRows,
      this.elements, event, focusedElement);
    
    if(nextFocusedElement) {     
      event.key === 'Tab' && event.preventDefault();
      this.setState({
        focusedElement: nextFocusedElement
      });

      this.handleKeyDownProcessed = true;
    } else if(event.key === 'Tab' || event.ctrlKey && event.key === 'ArrowDown' || event.ctrlKey && event.key === 'ArrowUp') {
      this.setState({
        focusedElement: undefined
      });
    }
  }

  setFocusedElement(key1, key2) {
    if(key1 === 'paging' || key1 === 'toolbar') {
      processEvents(this.rootRef.current, 'removeEventListener', this.handleKeyDownOnTable);
      this.setState({
        focusedElement: undefined
      })
    } else {
      processEvents(this.rootRef.current, 'addEventListener', this.handleKeyDownOnTable);
      this.setState({
        focusedElement: {
          rowKey: key1,
          columnKey: key2,
          index: getIndexToFocus(key1, key2, this.elements),
          part: getPart(key1)
        }
      })
    }
  }

  focus(element, prevFocusedElement?) {
    const { onFocusedCellChanged } = this.props;
    if(!element || !this.elements[element.rowKey] || !this.elements[element.rowKey][element.columnKey]) {
      return;
    }
    let el;
    if(element.index === undefined) {
      el = this.elements[element.rowKey][element.columnKey][0];
    } else {
      el = getInnerElements(this.elements, element.rowKey, element.columnKey)[element.index];
    }
    if(el) {
      if(el.focus) {
        el.focus();
      } else {
        el.current.focus();
      }
      onFocusedCellChanged && handleOnFocusedCallChanged(onFocusedCellChanged, element, prevFocusedElement);
    }
  }
  
  render() {
    return (
      <Plugin
        name="TableKeyboardNavigation"
      >
        <Getter name="keyboardNavigationParams" value={{
          tabIndex: -1,
          updateRefForKeyboardNavigation: this.updateRef.bind(this),
          setFocusedElement: this.setFocusedElement.bind(this),
        }} />
        <TemplateConnector>
        {({ tableColumns, tableBodyRows, rootRef, tableHeaderRows }) => {
            this.tableColumns = tableColumns;
            this.tableBodyRows = tableBodyRows;
            this.tableHeaderRows = filterHeaderRows(tableHeaderRows);
            this.rootRef = rootRef;
            if(rootRef.current) {
              rootRef.current.removeEventListener('keydown', this.handleKeyDownOnWidget);
              rootRef.current.addEventListener('keydown', this.handleKeyDownOnWidget);
            }
            return null;
          }}
          </TemplateConnector>
      </Plugin>
    );
  }
}

export const TableKeyboardNavigation: React.ComponentType<KeyboardNavigationProps> = TableKeyboardNavigationBase;