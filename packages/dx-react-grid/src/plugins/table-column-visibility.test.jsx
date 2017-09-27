import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { visibleTableColumns } from '@devexpress/dx-grid-core';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from './test-utils';
import { TableColumnVisibility } from './table-column-visibility';

jest.mock('@devexpress/dx-grid-core', () => ({
  visibleTableColumns: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableColumns: [
      { column: { name: 'a' } },
      { column: { name: 'b' } },
      { column: { name: 'c' } },
    ],
  },
  template: {
    tableView: {},
  },
  plugins: ['TableView'],
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
    visibleTableColumns.mockImplementation(() => [{ column: { name: 'c' } }]);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call the visibleTableColumns computed with correct arguments', () => {
    const hiddenColumns = ['b', 'a'];
    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnVisibility
          hiddenColumns={hiddenColumns}
          emptyMessageTemplate={() => null}
        />
      </PluginHost>,
    );

    expect(visibleTableColumns)
      .toHaveBeenCalledWith(defaultDeps.getter.tableColumns, hiddenColumns);
  });

  it('should remove hidden columns from tableColumns', () => {
    const hiddenColumns = ['b', 'a'];
    const tree = mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnVisibility
          hiddenColumns={hiddenColumns}
          emptyMessageTemplate={() => null}
        />
      </PluginHost>,
    );

    expect(getComputedState(tree).getters.tableColumns)
      .toEqual([{ column: { name: 'c' } }]);
  });

  it('should force ', () => {
    const emptyMessageTemplate = jest.fn(() => null);
    visibleTableColumns.mockImplementation(() => []);

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnVisibility
          hiddenColumns={[]}
          emptyMessageTemplate={emptyMessageTemplate}
        />
      </PluginHost>,
    );

    expect(emptyMessageTemplate)
      .toHaveBeenCalledTimes(1);
  });
});
