import * as React from 'react';
import { mount } from 'enzyme';
import {
  pluginDepsToComponents, getComputedState, testStatePluginField, setupConsole,
} from '@devexpress/dx-testing';
import {
  visibleTableColumns,
  columnChooserItems,
  toggleColumn,
  tableDataColumnsExist,
  getColumnExtensionValueGetter,
} from '@devexpress/dx-grid-core';
import { PluginHost } from '@devexpress/dx-react-core';
import { TableColumnVisibility } from './table-column-visibility';

jest.mock('@devexpress/dx-grid-core', () => ({
  visibleTableColumns: jest.fn(),
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

const defaultProps = {
  emptyMessageComponent: () => null,
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
    columnChooserItems.mockImplementation(args => (args));
    tableDataColumnsExist.mockImplementation(() => false);
    getColumnExtensionValueGetter.mockImplementation(() => () => {});
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  testStatePluginField({
    defaultDeps,
    defaultProps,
    Plugin: TableColumnVisibility,
    propertyName: 'hiddenColumnNames',
    values: [
      ['a'],
      ['b'],
      ['c'],
    ],
    actions: [{
      actionName: 'toggleColumnVisibility',
      reducer: toggleColumn,
    }],
  });

  describe('table layout getters extending', () => {
    it('should call the visibleTableColumns computed with correct arguments', () => {
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

      expect(visibleTableColumns)
        .toHaveBeenCalledWith(defaultDeps.getter.tableColumns, hiddenColumnNames);

      expect(getComputedState(tree).tableColumns)
        .toEqual(visibleTableColumns());
    });
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
    const getMessage = tree.find(defaultProps.emptyMessageComponent)
      .prop('getMessage');

    expect(getMessage('noColumns'))
      .toBe('Nothing to show');
  });

  describe('column extensions', () => {
    // tslint:disable-next-line: max-line-length
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
