import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { SummaryState } from './summary-state';

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
      .toBe(groupSummaryItems);
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
});
