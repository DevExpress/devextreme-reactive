import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { visibleTableColumns } from '@devexpress/dx-grid-core';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from './test-utils';
import { HiddenTableColumns } from './hidden-table-columns';

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
};

describe('HiddenTableColumns', () => {
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
    const hiddenColumnNames = ['b', 'a'];
    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <HiddenTableColumns
          hiddenColumnNames={hiddenColumnNames}
        />
      </PluginHost>,
    );

    expect(visibleTableColumns)
      .toHaveBeenCalledWith(defaultDeps.getter.tableColumns, hiddenColumnNames);
  });

  it('should remove hidden columns from tableColumns', () => {
    const hiddenColumnNames = ['b', 'a'];
    const tree = mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <HiddenTableColumns
          hiddenColumnNames={hiddenColumnNames}
        />
      </PluginHost>,
    );

    expect(getComputedState(tree).getters.tableColumns)
      .toEqual([{ column: { name: 'c' } }]);
  });
});
