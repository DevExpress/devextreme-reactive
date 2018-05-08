import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { domains } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { IntegratedScaleProcessing } from './integrated-scale-processing';

jest.mock('@devexpress/dx-chart-core', () => ({
  domains: jest.fn(),
}));

domains.mockImplementation(() => 'domains');

describe('Integrates scale processing', () => {
  it('should provide domains', () => {
    const tree = mount((
      <PluginHost>
        <IntegratedScaleProcessing />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({ domains: 'domains' });
  });
});
