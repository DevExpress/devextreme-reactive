import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { addDomain, getValueDomainName } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { Scale, ArgumentScale, ValueScale } from './scale';

jest.mock('@devexpress/dx-chart-core', () => ({
  ARGUMENT_DOMAIN: 'test_argument',
  getValueDomainName: jest.fn().mockReturnValue('test_value'),
  addDomain: jest.fn().mockReturnValue('added-domains'),
}));

describe('Scale', () => {
  afterEach(jest.clearAllMocks);

  const defaultDeps = {
    getter: {
      domains: 'test-domains',
    },
  };

  it('should update domains', () => {
    const mock = () => 0;
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Scale name="scale-1" min={1} max={2} factory={mock} />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      domains: 'added-domains',
    });
    expect(addDomain).toBeCalledWith('test-domains', 'scale-1', { min: 1, max: 2, factory: mock });
  });

  it('should handle *constructor* keyword case', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Scale name="scale-1" min={1} />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      domains: 'added-domains',
    });
    expect(addDomain).toBeCalledWith('test-domains', 'scale-1', { min: 1 });
  });

  it('should add argument scale', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ArgumentScale name="scale-1" min={1} />
      </PluginHost>
    ));

    expect(addDomain).toBeCalledWith('test-domains', 'test_argument', { min: 1 });
  });

  it('should add value scale', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ValueScale name="scale-1" max={2} />
      </PluginHost>
    ));

    expect(addDomain).toBeCalledWith('test-domains', 'test_value', { max: 2 });
    expect(getValueDomainName).toBeCalledWith('scale-1');
  });
});
