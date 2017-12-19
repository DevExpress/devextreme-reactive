import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import {
  groupRowChecker,
  groupRowLevelKeyGetter,
  groupedRows,
  expandedGroupRows,
} from '@devexpress/dx-grid-core';
import { PluginHost } from '@devexpress/dx-react-core';
import { LocalGrouping } from './local-grouping';
import { pluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  groupRowChecker: jest.fn(),
  groupRowLevelKeyGetter: jest.fn(),
  groupedRows: jest.fn(),
  expandedGroupRows: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 0 }, { id: 1 }],
    grouping: [{ columnName: 'a' }],
    expandedGroups: ['A', 'B'],
    getCellValue: () => {},
  },
  plugins: ['GroupingState'],
};

describe('LocalGrouping', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    groupRowChecker.mockImplementation(() => 'groupRowChecker');
    groupRowLevelKeyGetter.mockImplementation(() => 'groupRowLevelKeyGetter');
    groupedRows.mockImplementation(() => 'groupedRows');
    expandedGroupRows.mockImplementation(() => 'expandedGroupRows');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide isGroupRow getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <LocalGrouping />
      </PluginHost>
    ));

    expect(getComputedState(tree).isGroupRow)
      .toBe(groupRowChecker);
  });

  it('should provide getRowLevelKey getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <LocalGrouping />
      </PluginHost>
    ));

    expect(getComputedState(tree).getRowLevelKey)
      .toBe(groupRowLevelKeyGetter);
  });

  it('should provide rows getter based on grouping and expandedGroups getters', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <LocalGrouping />
      </PluginHost>
    ));

    expect(groupedRows)
      .toBeCalledWith(
        defaultDeps.getter.rows,
        defaultDeps.getter.grouping,
        defaultDeps.getter.getCellValue,
        undefined,
      );

    expect(expandedGroupRows)
      .toBeCalledWith(
        groupedRows(),
        defaultDeps.getter.grouping,
        defaultDeps.getter.expandedGroups,
      );

    expect(getComputedState(tree).rows)
      .toBe(expandedGroupRows());
  });

  it('should provide rows getter based on getColumnIdentity function', () => {
    const getColumnIdentity = () => {};

    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <LocalGrouping
          getColumnIdentity={getColumnIdentity}
        />
      </PluginHost>
    ));

    expect(groupedRows)
      .toBeCalledWith(
        defaultDeps.getter.rows,
        defaultDeps.getter.grouping,
        defaultDeps.getter.getCellValue,
        getColumnIdentity,
      );
  });
});
