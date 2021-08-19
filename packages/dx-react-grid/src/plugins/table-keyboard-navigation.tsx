import * as React from 'react';
import {
 Plugin, TemplateConnector, Action, Template, TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import {
  TABLE_ADDED_TYPE, TABLE_DATA_TYPE,
  getNextFocusedCell,  getPart, getIndexToFocus,
  isCellExist, focus, isTabArrowUpDown,
  filterHeaderRows, Elements, isDataTableRow, isRowFocused, getClosestCellByRow,
  isCellFocused,
} from '@devexpress/dx-grid-core';
import {
  KeyboardNavigationProps, KeyboardNavigationCoreProps, KeyboardNavigationCoreState,
  TableCellProps, TableRowProps,
} from '../types';

const CellPlaceholder = (props: TableCellProps) => <TemplatePlaceholder params={props} />;
const RowPlaceholder = (props: TableRowProps) => <TemplatePlaceholder params={props} />;

class TableKeyboardNavigationCore extends React.PureComponent<KeyboardNavigationCoreProps,
KeyboardNavigationCoreState> {
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
    props: KeyboardNavigationCoreProps, state: KeyboardNavigationCoreState,
  ): KeyboardNavigationCoreState {
    const focusedCell = props.focusedCell !== undefined ? props.focusedCell : state.focusedElement;
    return {
      focusedElement: focusedCell ? {
        part: TABLE_DATA_TYPE.toString(),
        ...focusedCell,
      } : focusedCell,
    };
  }

  componentDidMount() {
    this.props.rootRef.current!.addEventListener('keydown', this.handleKeyDownOnWidget);
  }

  componentWillUnmount() {
    this.props.rootRef.current!.removeEventListener('keydown', this.handleKeyDownOnWidget);
  }

  componentDidUpdate(_, prevState) {
    const { focusedElement } = this.state;
    focus(this.elements, focusedElement, prevState.focusedElement, this.props.onFocusedCellChanged);
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
      focus(this.elements, focusedElement, undefined, this.props.onFocusedCellChanged);
    }

    if (key1.toString().includes(TABLE_ADDED_TYPE.toString()) &&
    key2 === tableColumns[0].key) {
      this.setState({
        focusedElement: {
          part: TABLE_DATA_TYPE.toString(),
          columnKey: key2,
          rowKey: key1,
        },
      });
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

  handleKeyDownOnWidget(event) {
    let focusedCell;
    const { focusedElement } = this.state;
    const {
      tableColumns, tableBodyRows, tableHeaderRows, expandedRowIds, scrollToColumn,
    } = this.props;

    if (event.key === 'f' && event.ctrlKey) {
      event.preventDefault();
      this.searchPanelRef?.current?.click();
      if (focusedElement) {
        this.setState({
          focusedElement: undefined,
        });
      }
      return;
    }

    if (focusedElement && !isCellExist(this.elements, focusedElement) && event.key === 'Tab') {
      focusedCell = getClosestCellByRow(tableBodyRows, focusedElement, this.elements);
      event.preventDefault();
      this.setState({
        focusedElement: focusedCell,
      });
      return;
    }

    if (focusedElement || isTabArrowUpDown(event)) {
      focusedCell = getNextFocusedCell(tableColumns, tableBodyRows,
        tableHeaderRows, expandedRowIds, this.elements, event, focusedElement, scrollToColumn);

      if (focusedCell) {
        event.preventDefault();
        this.setState({
          focusedElement: focusedCell,
        });
      } else if (isTabArrowUpDown(event) && focusedElement) {
        this.setState({
          focusedElement: undefined,
        });
      }
    }
  }

  setFocusedElement({ key1, key2 }) {
    if (key1 === 'paging' || key1 === 'toolbar') {
      this.setState({
        focusedElement: undefined,
      });
    } else {
      this.setState({
        focusedElement: {
          rowKey: key1,
          columnKey: key2,
          index: getIndexToFocus(key1, key2, this.elements),
          part: getPart(key1),
        },
      });
    }
  }

  render() {
    const {
      cellComponent: Cell,
      rowComponent: Row,
      focusedRowEnabled,
    } = this.props;
    const { focusedElement } = this.state;
    return (
      <Plugin
        name="TableKeyboardNavigationCore"
      >
        <Action name="setSearchPanelRef" action={this.setSearchPanelRef} />
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
class TableKeyboardNavigationBase extends React.PureComponent<KeyboardNavigationProps> {
  static components = {
    cellComponent: 'Cell',
    rowComponent: 'Row',
  };
  render() {
    return (
      <Plugin name="TableKeyboardNavigation">
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
export const TableKeyboardNavigation: React.ComponentType<KeyboardNavigationProps> = TableKeyboardNavigationBase;
