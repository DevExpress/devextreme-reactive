import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { PluginHost, Template } from '@devexpress/dx-react-core';
import {
    filterHeaderRows, isDataTableRow, isRowFocused, focus,
} from '@devexpress/dx-grid-core';
import { TableKeyboardNavigation } from './table-keyboard-navigation';

jest.mock('@devexpress/dx-grid-core', () => ({
  filterHeaderRows: jest.fn(),
  isDataTableRow: jest.fn(),
  isRowFocused: jest.fn(),
  focus: jest.fn(),
  TABLE_DATA_TYPE: 'data_type',
}));

const defaultDeps = {
  getter: {
    tableBodyRows: [{ type: 'undefined', rowId: 1 }],
    tableColumns: [{ type: 'undefined', columnName: 'a' }],
    tableHeaderRows: [{ type: 'undefined', rowKey: 'row_1' }],
    expandedRowIds: [5],
    rootRef: {
      current: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    },
  },
  template: {
    tableCell: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      tableColumn: { type: 'undefined', column: 'column' },
      style: {},
    },
    tableRow: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      style: {},
    },
    header: {},
    footer: {},
  },
};

const defaultProps = {
  cellComponent: () => null,
  rowComponent: () => null,
  focusedRowEnabled: false,
};

describe('TableKeyboardNavigation', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should render Cell component', () => {
    const tree = mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableKeyboardNavigation
          {...defaultProps}
        />
      </PluginHost>,
    );

    expect(tree.find(defaultProps.cellComponent).props()).toEqual({
      component: expect.any(Function),
      setFocusedElement: expect.any(Function),
      updateRefForKeyboardNavigation: expect.any(Function),
      tabIndex: -1,
      tableColumn: {
        type: 'undefined', column: 'column',
      },
      tableRow: {
        type: 'undefined', rowId: 1, row: 'row',
      },
      style: {},
    });
  });

  it('should not render Cell component, rootRef.current is null', () => {
    const tree = mount(
      <PluginHost>
        {pluginDepsToComponents({ ...defaultDeps, getter: { rootRef: { current: null } } })}
        <TableKeyboardNavigation
          {...defaultProps}
        />
      </PluginHost>,
    );

    expect(tree.find(defaultProps.cellComponent).exists()).toBeFalsy();
  });

  it('should render Row component, focusedRowEnabled is true', () => {
    isRowFocused.mockImplementation(() => true);
    isDataTableRow.mockImplementation(() => true);
    const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableKeyboardNavigation
            {...defaultProps}
            focusedRowEnabled={true}
          />
        </PluginHost>,
      );

    expect(tree.find(defaultProps.rowComponent).props()).toEqual({
      component: expect.any(Function),
      focused: true,
      tableRow: {
        type: 'undefined', rowId: 1, row: 'row',
      },
      style: {},
    });
    expect(isDataTableRow).toBeCalledWith({ type: 'undefined', rowId: 1, row: 'row' });
    expect(isRowFocused)
      .toBeCalledWith({ type: 'undefined', rowId: 1, row: 'row' }, undefined);
  });

  it('should pass parameters to the header and footer templates', () => {
    const mockHeader = jest.fn().mockReturnValue(null);
    const mockFooter = jest.fn().mockReturnValue(null);
    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Template name="header">
          {mockHeader}
        </Template>
        <Template name="footer">
          {mockFooter}
        </Template>
        <TableKeyboardNavigation
          {...defaultProps}
          focusedRowEnabled={true}
        />
      </PluginHost>,
    );

    expect(mockHeader).toBeCalledWith({
      setFocusedElement: expect.any(Function),
      updateRefForKeyboardNavigation: expect.any(Function),
    });
    expect(mockFooter).toBeCalledWith({
      setFocusedElement: expect.any(Function),
      updateRefForKeyboardNavigation: expect.any(Function),
    });
  });

  it('should be call filterHeaderRows method', () => {
    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableKeyboardNavigation
          {...defaultProps}
        />
      </PluginHost>,
    );
    expect(filterHeaderRows).toBeCalledWith(defaultDeps.getter.tableHeaderRows);
  });

  it('should subscribe on events on mount', () => {
    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableKeyboardNavigation
          {...defaultProps}
        />
      </PluginHost>,
    );

    expect(defaultDeps.getter.rootRef.current.addEventListener)
      .toBeCalledWith('keydown', expect.any(Function));
  });

  it('should unsubscribe on events on unmount', () => {
    const tree = mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableKeyboardNavigation
          {...defaultProps}
        />
      </PluginHost>,
    );
    tree.unmount();

    expect(defaultDeps.getter.rootRef.current.removeEventListener)
      .toBeCalledWith('keydown', expect.any(Function));
  });
});
