import * as React from 'react';
import {
 Plugin, TemplateConnector, Action, Template, TemplatePlaceholder, Getter,
} from '@devexpress/dx-react-core';
import {
  TABLE_ADDED_TYPE, TABLE_DATA_TYPE, TABLE_FLEX_TYPE,
  getNextFocusedCell,  getPart, getIndexToFocus,
  isCellExist, focus, isTabArrowUpDown,
  filterHeaderRows, Elements, isDataTableRow, isRowFocused, getClosestCellByRow,
  isCellFocused, getFocusing, RIGHT_POSITION, LEFT_POSITION,
} from '@devexpress/dx-grid-core';
import {
  TableKeyboardNavigationProps, TableKeyboardNavigationCoreProps, TableKeyboardNavigationCoreState,
  TableCellProps, TableRowProps,
} from '../types';

const CellPlaceholder = (props: TableCellProps) => <TemplatePlaceholder params={props} />;
const RowPlaceholder = (props: TableRowProps) => <TemplatePlaceholder params={props} />;

class TableKeyboardNavigationCore extends React.PureComponent<TableKeyboardNavigationCoreProps,
TableKeyboardNavigationCoreState> {
  elements: Elements = {};
  searchPanelRef: React.RefObject<HTMLElement> | undefined;

  constructor(props) {
    super(props);

    const focusedCell = props.focusedCell || props.defaultFocusedCell;

    this.state = {
      focusedElement: focusedCell ?
      { part: TABLE_DATA_TYPE.toString(), ...focusedCell } : focusedCell,
    };
    this.handleKeyDownOnWidget = this.handleKeyDownOnWidget.bind(this);
    this.updateRef = this.updateRef.bind(this);
    this.setFocusedElement = this.setFocusedElement.bind(this);
    this.setSearchPanelRef = this.setSearchPanelRef.bind(this);
  }

  static getDerivedStateFromProps(
    props: TableKeyboardNavigationCoreProps, state: TableKeyboardNavigationCoreState,
  ): TableKeyboardNavigationCoreState {
    const focusedCell = props.focusedCell !== undefined ? props.focusedCell : state.focusedElement;
    return {
      focusedElement: focusedCell ? {
        part: TABLE_DATA_TYPE.toString(),
        ...focusedCell,
      } : undefined,
    };
  }

  componentDidMount() {
    this.props.rootRef.current!.addEventListener('keydown', this.handleKeyDownOnWidget);
  }

  componentWillUnmount() {
    this.props.rootRef.current!.removeEventListener('keydown', this.handleKeyDownOnWidget);
  }

  pushRef(ref, key1, key2) {
    const { focusedElement } = this.state;
    const { tableColumns } = this.props;
    if (!this.elements[key1]) {
      this.elements[key1] = [];
    }
    if (!this.elements[key1][key2]) {
      this.elements[key1][key2] = [];
    }

    this.elements[key1][key2].push(ref);

    if (focusedElement?.rowKey === key1 && focusedElement?.columnKey === key2) {
      focus(this.elements, focusedElement, undefined, this.props.onFocusedCellChange);
    }

    if (key1.toString().includes(TABLE_ADDED_TYPE.toString()) &&
    key2 === tableColumns[0].key) {
      this.changeFocusedElement({
        part: TABLE_DATA_TYPE.toString(),
        columnKey: key2,
        rowKey: key1,
      }, focusedElement);
    }
  }

  setSearchPanelRef(ref) {
    this.searchPanelRef = ref;
  }

  removeRef(key1, key2) {
    delete this.elements[key1][key2];
    if (Object.keys(this.elements[key1]).length === 0) {
      delete this.elements[key1];
    }
  }

  updateRef({ ref, key1, key2, action }) {
    if (action === 'add') {
      this.pushRef(ref, key1, key2);
    } else {
      this.removeRef(key1, key2);
    }
  }

  changeFocusedElement(focusedCell, prevFocusedCell) {
    const { onFocusedCellChange } = this.props;
    this.setState({
      focusedElement: focusedCell,
    });
    focus(this.elements, focusedCell, prevFocusedCell, onFocusedCellChange);
  }

  handleKeyDownOnWidget(event) {
    const { focusedElement } = this.state;
    const {
      tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, scrollToColumn,
    } = this.props;

    if (event.key === 'f' && (event.ctrlKey || event.metaKey)) {
      if (this.searchPanelRef) {
        event.preventDefault();
        this.searchPanelRef.current?.click();
      }
      if (focusedElement) {
        this.changeFocusedElement(undefined, focusedElement);
      }
      return;
    }

    if (focusedElement && !isCellExist(this.elements, focusedElement) && event.key === 'Tab') {
      const focusedCell = getClosestCellByRow(tableBodyRows, focusedElement, this.elements);
      event.preventDefault();
      this.changeFocusedElement(focusedCell, focusedElement);
      return;
    }

    if (focusedElement || isTabArrowUpDown(event)) {
      const { element, scrolling } = getNextFocusedCell(tableColumns, tableBodyRows,
        tableHeaderRows, expandedRowIds, this.elements, event, focusedElement, scrollToColumn);

      if (element) {
        if (scrolling) {
          scrollToColumn(scrolling === 'left' ? LEFT_POSITION : RIGHT_POSITION);
        }
        event.preventDefault();
        this.changeFocusedElement(element, focusedElement);
      } else if (isTabArrowUpDown(event) && focusedElement) {
        this.changeFocusedElement(undefined, focusedElement);
      }
    }
  }

  setFocusedElement({ key1, key2, event }) {
    const { focusedElement } = this.state;
    if (key1 === 'paging' || key1 === 'toolbar') {
      this.changeFocusedElement(undefined, focusedElement);
    } else if (key2.includes(TABLE_FLEX_TYPE.toString())) {
      const columnKey = this.props.tableColumns[0].key;
      this.changeFocusedElement({
        rowKey: key1,
        columnKey,
        index: -1,
        part: getPart(key1),
      }, focusedElement);
    } else {
      this.changeFocusedElement({
        rowKey: key1,
        columnKey: key2,
        index: getIndexToFocus(key1, key2, this.elements, event),
        part: getPart(key1),
      }, focusedElement);
    }
  }

  render() {
    const {
      cellComponent: Cell,
      rowComponent: Row,
      focusedRowEnabled,
      tableBodyRows,
    } = this.props;
    const { focusedElement } = this.state;
    const getFocusedGetter = () => getFocusing(tableBodyRows, focusedElement);
    return (
      <Plugin
        name="TableKeyboardNavigationCore"
      >
        <Action name="setSearchPanelRef" action={this.setSearchPanelRef} />
        {focusedRowEnabled &&
          <Getter name="highlightSelectedRow" value />
        }
        {focusedRowEnabled &&
          <Getter name="focused" computed={getFocusedGetter} />
        }
        <Template name="tableCell">
          {(params: TableCellProps) => (
            <Cell
              {...params}
              component={CellPlaceholder}
              tabIndex={0}
              updateRefForKeyboardNavigation={this.updateRef}
              setFocusedElement={this.setFocusedElement}
              focused={isCellFocused(params.tableRow, params.tableColumn, focusedElement)}
            />
          )}
        </Template>
        <Template name="header">
          <TemplatePlaceholder
            params={{
              updateRefForKeyboardNavigation: this.updateRef,
              setFocusedElement: this.setFocusedElement,
            }}
          />
        </Template>
        <Template name="footer">
          <TemplatePlaceholder
            params={{
              updateRefForKeyboardNavigation: this.updateRef,
              setFocusedElement: this.setFocusedElement,
            }}
          />
        </Template>
        {(focusedRowEnabled) && (
          <Template
            name="tableRow"
            predicate={({ tableRow }: any) => !!isDataTableRow(tableRow)}
          >
            {(params: TableRowProps) => (
              <Row
                {...params}
                component={RowPlaceholder}
                focused={isRowFocused(params.tableRow, focusedElement?.rowKey)}
              />
            )}
          </Template>
        )}
      </Plugin>
    );
  }
}

// tslint:disable-next-line:max-classes-per-file
class TableKeyboardNavigationBase extends React.PureComponent<TableKeyboardNavigationProps> {
  static components = {
    cellComponent: 'Cell',
    rowComponent: 'Row',
  };
  render() {
    return (
      <Plugin
        name="TableKeyboardNavigation"
        dependencies={[
          { name: 'Table' },
        ]}
      >
        <TemplateConnector>
        {(
          { tableColumns, tableBodyRows, rootRef, tableHeaderRows, expandedRowIds },
          { scrollToColumn },
        ) => {
          return rootRef.current ? (
            <TableKeyboardNavigationCore
              tableColumns={tableColumns}
              tableBodyRows={tableBodyRows}
              rootRef={rootRef}
              tableHeaderRows={filterHeaderRows(tableHeaderRows)}
              expandedRowIds={expandedRowIds}
              scrollToColumn={scrollToColumn}
              {...this.props}
            />
          ) : null;
        }}
        </TemplateConnector>
      </Plugin>
    );
  }
}

// tslint:disable-next-line: max-line-length
export const TableKeyboardNavigation: React.ComponentType<TableKeyboardNavigationProps> = TableKeyboardNavigationBase;
