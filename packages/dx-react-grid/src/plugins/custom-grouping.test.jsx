import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import {
  groupRowChecker,
  groupRowLevelKeyGetter,
  customGroupingRowIdGetter,
  customGroupedRows,
  expandedGroupRows,
} from '@devexpress/dx-grid-core';
import { PluginHost } from '@devexpress/dx-react-core';
import { CustomGrouping } from './custom-grouping';
import { pluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  groupRowChecker: jest.fn(),
  groupRowLevelKeyGetter: jest.fn(),
  customGroupingRowIdGetter: jest.fn(),
  customGroupedRows: jest.fn(),
  expandedGroupRows: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 0 }, { id: 1 }],
    grouping: [{ columnName: 'a' }],
    expandedGroups: ['A', 'B'],
    getRowId: () => {},
  },
  plugins: ['GroupingState'],
};

const defaultProps = {
  getChildGroups: () => {},
};

describe('CustomGrouping', () => {
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
    customGroupingRowIdGetter.mockImplementation(() => 'customGroupingRowIdGetter');
    customGroupedRows.mockImplementation(() => 'customGroupedRows');
    expandedGroupRows.mockImplementation(() => 'expandedGroupRows');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide isGroupRow getter', () => {
    const tree = mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <CustomGrouping
          {...defaultProps}
        />
      </PluginHost>,
    );

    expect(getComputedState(tree).getters.isGroupRow)
      .toBe(groupRowChecker);
  });

  it('should provide getRowLevelKey getter', () => {
    const tree = mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <CustomGrouping
          {...defaultProps}
        />
      </PluginHost>,
    );

    expect(getComputedState(tree).getters.getRowLevelKey)
      .toBe(groupRowLevelKeyGetter);
  });

  it('should provide rows getter based on grouping and expandedGroups getters', () => {
    const tree = mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <CustomGrouping
          {...defaultProps}
        />
      </PluginHost>,
    );

    expect(customGroupedRows)
      .toBeCalledWith(
        defaultDeps.getter.rows,
        defaultDeps.getter.grouping,
        defaultProps.getChildGroups);

    expect(expandedGroupRows)
      .toBeCalledWith(
        customGroupedRows(),
        defaultDeps.getter.grouping,
        defaultDeps.getter.expandedGroups);

    expect(getComputedState(tree).getters.rows)
      .toBe(expandedGroupRows());
  });

  it('should provide getRowId getter based on grouped rows', () => {
    const tree = mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <CustomGrouping
          {...defaultProps}
        />
      </PluginHost>,
    );

    expect(customGroupingRowIdGetter)
      .toBeCalledWith(
        defaultDeps.getter.getRowId,
        customGroupedRows());

    expect(getComputedState(tree).getters.getRowId)
      .toBe(customGroupingRowIdGetter());
  });

  describe('temporary grouping', () => {
    it('should provide grouping and expanded groups based on tempGrouping and tempExpandedGroups properties', () => {
      const tempGrouping = [{ columnName: 'a' }];
      const tempExpandedGroups = ['a', 'b'];

      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <CustomGrouping
            {...defaultProps}
            tempGrouping={tempGrouping}
            tempExpandedGroups={tempExpandedGroups}
          />
        </PluginHost>,
      );

      expect(getComputedState(tree).getters.grouping)
        .toBe(tempGrouping);
      expect(getComputedState(tree).getters.expandedGroups)
        .toEqual(new Set(tempExpandedGroups));
    });

    it('should provide rows getter based on tempGrouping and tempExpandedGroups properties', () => {
      const tempGrouping = [{ columnName: 'a' }];
      const tempExpandedGroups = ['a', 'b'];

      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <CustomGrouping
            {...defaultProps}
            tempGrouping={tempGrouping}
            tempExpandedGroups={tempExpandedGroups}
          />
        </PluginHost>,
      );

      expect(customGroupedRows)
        .toBeCalledWith(
          defaultDeps.getter.rows,
          tempGrouping,
          defaultProps.getChildGroups);

      expect(expandedGroupRows)
        .toBeCalledWith(
          customGroupedRows(),
          tempGrouping,
          new Set(tempExpandedGroups));

      expect(getComputedState(tree).getters.rows)
        .toBe(expandedGroupRows());
    });
  });
});
