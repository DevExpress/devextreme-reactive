import * as React from 'react';
import {
 Plugin, TemplateConnector, Getter,
} from '@devexpress/dx-react-core';
import { TABLE_HEADING_TYPE, TABLE_BAND_TYPE } from '@devexpress/dx-grid-core';
import { getNextFocusedElement, applyEnterAction, applyEscapeAction } from '@devexpress/dx-grid-core';

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
    // this.handleMouseClick = this.handleMouseClick.bind(this);
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
    // document.addEventListener('click', this.handleMouseClick);
  }

  // handleMouseClick(event) {
  //   console.log(event)
  // }

  handleKeyDown(event) {
    const { focusedElement } = this.state;
    let nextFocusedElement;

    if(event.key === "Enter") {
      if(focusedElement) {
        nextFocusedElement = applyEnterAction(focusedElement, this.elements);
      }
    } else if(event.key === "Escape") {
      if(focusedElement) {
        nextFocusedElement = applyEscapeAction(focusedElement, this.elements);
      }
    } else {
      nextFocusedElement = getNextFocusedElement(this.tableColumns, this.tableBodyRows, focusedElement, 
        this.elements, event.key, event.shiftKey);
    }

    if(nextFocusedElement) {
      const el = this.elements[nextFocusedElement.rowKey][nextFocusedElement.columnKey][nextFocusedElement.index];
      if(el.focus) {
        el.focus();
      } else {
        el.current.focus();
      }
      if(event.key === 'Tab') {
        event.preventDefault();
      }
      this.updateFocusedElement(nextFocusedElement);
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