import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import {
  visibleTableColumns,
  getMessagesFormatter,
  columnChooserItems,
  toggleColumn,
  tableDataColumnsExist,
  getColumnExtensionValueGetter,
} from '@devexpress/dx-grid-core';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';
import { TableColumnVisibility } from './table-column-visibility';

jest.mock('@devexpress/dx-grid-core', () => ({
  visibleTableColumns: jest.fn(),
  getMessagesFormatter: jest.fn(),
  columnChooserItems: jest.fn(),
  toggleColumn: jest.fn(),
  tableDataColumnsExist: jest.fn(),
  getColumnExtensionValueGetter: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableColumns: [
      { column: { name: 'a' } },
      { column: { name: 'b' } },
      { column: { name: 'c' } },
    ],
    columns: [
      { name: 'a' },
      { name: 'b' },
      { name: 'c' },
    ],
  },
  template: {
    table: {},
  },
  plugins: ['Table'],
};

const DefaultEmptyMessage = () => null;

const defaultProps = {
  emptyMessageComponent: DefaultEmptyMessage,
};

describe('TableColumnVisibility', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    toggleColumn.mockImplementation(args => (args));
    visibleTableColumns.mockImplementation(() => [{ column: { name: 'c' } }]);
    getMessagesFormatter.mockImplementation(messages => key => (messages[key] || key));
    columnChooserItems.mockImplementation(args => (args));
    tableDataColumnsExist.mockImplementation(() => false);
    getColumnExtensionValueGetter.mockImplementation(() => () => {});
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters extending', () => {
    it('should extend hiddenColumnNames from hiddenColumnNames property', () => {
      const hiddenColumnNames = ['b', 'a'];
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnVisibility
            {...defaultProps}
            hiddenColumnNames={hiddenColumnNames}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).hiddenColumnNames)
        .toBe(hiddenColumnNames);
    });

    it('should extend hiddenColumnNames from defaultHiddenColumnNames property', () => {
      const hiddenColumnNames = ['b', 'a'];
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnVisibility
            {...defaultProps}
            defaultHiddenColumnNames={hiddenColumnNames}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).hiddenColumnNames)
        .toBe(hiddenColumnNames);
    });

    it('should call the visibleTableColumns computed with correct arguments', () => {
      const hiddenColumnNames = ['b', 'a'];
      mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnVisibility
            {...defaultProps}
            hiddenColumnNames={hiddenColumnNames}
          />
        </PluginHost>
      ));

      expect(visibleTableColumns)
        .toHaveBeenCalledWith(defaultDeps.getter.tableColumns, hiddenColumnNames);
    });
  });

  it('should remove hidden columns from tableColumns', () => {
    const hiddenColumnNames = ['b', 'a'];
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnVisibility
          {...defaultProps}
          hiddenColumnNames={hiddenColumnNames}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).tableColumns)
      .toEqual([{ column: { name: 'c' } }]);
  });

  it('should force the empty message rendering if all columns are hidden', () => {
    visibleTableColumns.mockImplementation(() => []);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnVisibility
          {...defaultProps}
          messages={{
            noColumns: 'Nothing to show',
          }}
        />
      </PluginHost>
    ));
    const getMessage = tree.find(DefaultEmptyMessage)
      .prop('getMessage');

    expect(getMessage('noColumns'))
      .toBe('Nothing to show');
  });

  it('should call toggleVisibility in action', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnVisibility
          {...defaultProps}
          hiddenColumnNames={[]}
          messages={{
            noColumns: 'Nothing to show',
          }}
        />
      </PluginHost>
    ));

    executeComputedAction(tree, actions => actions.toggleColumnVisibility(defaultDeps.getter.tableColumns, 'test'));
    expect(toggleColumn)
      .toHaveBeenCalled();
  });

  describe('column extensions', () => {
    it('should correctly call getColumnExtensionValueGetter if columnExtensions prop is defined', () => {
      const columnExtensions = [{ columnName: 'a', togglingEnabled: true }];
      mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnVisibility
            {...defaultProps}
            columnTogglingEnabled={false}
            columnExtensions={columnExtensions}
          />
        </PluginHost>
      ));

      expect(getColumnExtensionValueGetter)
        .toBeCalledWith(columnExtensions, 'togglingEnabled', false);
    });
  });
});
