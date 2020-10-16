import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { prepareGroupSummaryItems } from '@devexpress/dx-grid-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { SummaryState } from './summary-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  ...jest.requireActual('@devexpress/dx-grid-core'),
  prepareGroupSummaryItems: jest.fn(),
}));

const defaultDeps = {
  plugins: [],
};

describe('SummaryState', () => {
  it('should provide value from the "totalItems" property', () => {
    const totalSummaryItems = [{ columnName: 'a', type: 'count' }];
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SummaryState
          totalItems={totalSummaryItems}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).totalSummaryItems)
      .toBe(totalSummaryItems);
  });

  it('should provide value from the "groupItems" property', () => {
    prepareGroupSummaryItems.mockReturnValue('prepareGroupSummaryItems');
    const groupSummaryItems = [{ columnName: 'a', type: 'count' }];
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SummaryState
          groupItems={groupSummaryItems}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).groupSummaryItems)
      .toBe('prepareGroupSummaryItems');
  });

  it('should provide value from the "treeItems" property', () => {
    const treeSummaryItems = [{ columnName: 'a', type: 'count' }];
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SummaryState
          treeItems={treeSummaryItems}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).treeSummaryItems)
      .toBe(treeSummaryItems);
  });

  it('should provide empty array as default value for each items', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SummaryState />
      </PluginHost>
    ));

    expect(getComputedState(tree).treeSummaryItems)
      .toEqual([]);
    expect(prepareGroupSummaryItems).toBeCalledWith([]);
    expect(getComputedState(tree).groupSummaryItems)
      .toBe('prepareGroupSummaryItems');
    expect(getComputedState(tree).totalSummaryItems)
      .toEqual([]);
  });
});
