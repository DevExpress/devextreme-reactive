import * as React from 'react';
import {
 Plugin, TemplateConnector, Getter,
} from '@devexpress/dx-react-core';
import { 
  TABLE_HEADING_TYPE, TABLE_BAND_TYPE, TABLE_ADDED_TYPE,
  getNextFocusedElement, applyEnterAction, applyEscapeAction,
  getPart, getIndexToFocus, getPrevNextTablePart } from '@devexpress/dx-grid-core';
import { KeyboardNavigationProps, KeyboardNavigationState } from '../types';

class TableKeyboardNavigationBase extends React.PureComponent<KeyboardNavigationProps, KeyboardNavigationState> {
  elements: any[][] = [];
  tableColumns = [];
  tableBodyRows = [];

  constructor(props) {
    super(props);

    const focusedCell = props.focusedCell || props.defaultFocusedCell;

    this.state = {
      focusedElement: focusedCell ? { part: 'body', index: 0, ...focusedCell } : focusedCell
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  pushRef(ref, key1, key2) {
    const { focusedElement } = this.state;
    if(!this.elements[key1]) {
      this.elements[key1] = [];
    }
    if(!this.elements[key1][key2]) {
      this.elements[key1][key2] = [];
    }
    if(key1 !== 'toolbar' && key1 !== 'paging') { 
      this.elements[key1][key2].push(ref);
    }
    const innerElements = ref.current.querySelectorAll('[tabIndex], input, button, a');
    innerElements.forEach(el => {
      this.elements[key1][key2].push(el);
    });

    if(focusedElement?.rowKey === key1 && focusedElement?.columnKey === key2) {
      this.focus(this.state.focusedElement);
    }

    if(key1.toString().includes(TABLE_ADDED_TYPE.toString()) && key2 === (this.tableColumns[0] as any).key) {
      this.setState({
        focusedElement: {
          part: 'body',
          index: 0,
          columnKey: key2,
          rowKey: key1
        }
      });
    }
  }

  removeRef(key1, key2) {
    const { focusedElement } = this.state;

    if(focusedElement?.rowKey === key1 && focusedElement?.columnKey === key2) {
      this.setState({
        focusedElement: undefined
      })
    }
    delete this.elements[key1][key2];
    if(Object.keys(this.elements[key1]).length === 0) {
      delete this.elements[key1];
    }
  }

  updateRef(ref, key1, key2, action) {
    if(action === 'add') {
      if(key1.toString().includes(TABLE_BAND_TYPE.toString())) {
        this.pushRef(ref, TABLE_HEADING_TYPE.toString(), key2);
      } else {
        this.pushRef(ref, key1, key2);
      }
    } else {
      if(key1.toString().includes(TABLE_BAND_TYPE.toString())) {
        this.removeRef(TABLE_HEADING_TYPE.toString(), key2);
      } else {
        this.removeRef(key1, key2);
      }
    }
    console.log(this.elements)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps, prevState) {
    const { focusedElement } = this.state;
    
    if(!focusedElement || JSON.stringify(prevState.focusedElement) !== JSON.stringify(focusedElement)) {
      this.focus(focusedElement, prevState.focusedElement);
    }
  }

  static getDerivedStateFromProps(props: KeyboardNavigationProps, state: KeyboardNavigationState): KeyboardNavigationState {
    const focusedCell = props.focusedCell !== undefined ? props.focusedCell : state.focusedElement;
    return {
      focusedElement: focusedCell ? {
        part: 'body',
        index: 0,
        ...focusedCell
      } : focusedCell
    }
  }

  handleKeyDown(event) {
    const { focusedElement } = this.state;
    let nextFocusedElement;

    if(event.key === "Enter") {
      nextFocusedElement = applyEnterAction(this.elements, focusedElement);
    } else if(event.key === "Escape") {
      nextFocusedElement = applyEscapeAction(this.elements, focusedElement);
    } else if(focusedElement && event.ctrlKey && event.key === 'ArrowUp') {
      nextFocusedElement = getPrevNextTablePart(focusedElement, this.elements, -1, this.tableBodyRows, this.tableColumns);
    } else if(focusedElement && event.ctrlKey && event.key === 'ArrowDown') {
      nextFocusedElement = getPrevNextTablePart(focusedElement, this.elements, 1, this.tableBodyRows, this.tableColumns);
    } else {
      nextFocusedElement = getNextFocusedElement(this.tableColumns, this.tableBodyRows,
        this.elements, event.key, event.shiftKey, focusedElement);
    }
    if(nextFocusedElement) {     
      if(event.key === 'Tab') {
        event.preventDefault();
      }
      this.setState({
        focusedElement: nextFocusedElement
      });
    }
  }

  setFocusedElement(key1, key2) {
    this.setState({
      focusedElement: {
        rowKey: key1,
        columnKey: key2,
        index: getIndexToFocus(key1, key2, this.elements),
        part: getPart(key1)
      }
    })
  }

  focus(element, prevFocusedElement?) {
    const { onFocusedCellChanged } = this.props;
    if(!element || !this.elements[element.rowKey] || !this.elements[element.rowKey][element.columnKey]) {
      return;
    }

    const el = this.elements[element.rowKey][element.columnKey][element.index];
    if(el) {
      if(el.focus) {
        el.focus();
      } else {
        el.current.focus();
      }
      if(onFocusedCellChanged && element.part === 'body' && 
          (prevFocusedElement?.rowKey !== element.rowKey || prevFocusedElement?.columnKey !== element.columnKey)) {
        onFocusedCellChanged({ rowKey: element.rowKey, columnKey: element.columnKey });
      }
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