import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { CustomSummary } from './custom-summary';

const defaultDeps = {
  plugins: ['SummaryState'],
};

describe('CustomSummary', () => {
  it('should provide value from the "totalValues" property', () => {
    const totalSummaryValues = [1, 2, 4];
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <CustomSummary
          totalValues={totalSummaryValues}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).totalSummaryValues)
      .toBe(totalSummaryValues);
  });

  it('should provide value from the "groupValues" property', () => {
    const groupSummaryValues = { 'a|1': [1, 2, 4] };
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <CustomSummary
          groupValues={groupSummaryValues}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).groupSummaryValues)
      .toBe(groupSummaryValues);
  });

  it('should provide value from the "treeValues" property', () => {
    const treeSummaryValues = { 1: [1, 2, 4] };
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <CustomSummary
          treeValues={treeSummaryValues}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).treeSummaryValues)
      .toBe(treeSummaryValues);
  });
});
