import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { CustomPaging } from './custom-paging';

const defaultDeps = {
  plugins: ['PagingState'],
};

describe('CustomPaging', () => {
  it('should provide value from the "totalCount" property', () => {
    const totalCount = 100;
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <CustomPaging
          totalCount={100}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).totalCount)
      .toBe(totalCount);
  });

  it('should provide \'0\' if a value for the "totalCount" property undefined', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <CustomPaging />
      </PluginHost>
    ));

    expect(getComputedState(tree).totalCount)
      .toBe(0);
  });
});
