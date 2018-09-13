import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { ChartCore } from './chart-core';

jest.mock('@devexpress/dx-chart-core', () => ({
  axisName: jest.fn(() => 'argumentName'),
  prepareData: jest.fn(data => data),
}));

const domains = { argumentName: { domain: 'domain' } };
const computedDomain = jest.fn(() => domains);
const themeComputing = jest.fn(() => 'themeComputing');

const defaultProps = {
  data: [{ arg: 1, val: 2 }],
};

const defaultDeps = {
  getter: {
    computedDomain,
    themeComputing,
  },
};

describe('Chart Core', () => {
  it('should provide options', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ChartCore
          {...defaultProps}
        />
      </PluginHost>
    ));
    expect(getComputedState(tree)).toEqual({
      data: defaultProps.data,
      argumentAxisName: 'argumentName',
      domains,
      computedDomain,
      colorDomain: 'themeComputing',
      themeComputing,
    });
  });

  it('should provide options, themeComputing is not set', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({
          getter: {
            computedDomain,
          },
        })}
        <ChartCore
          {...defaultProps}
        />
      </PluginHost>
    ));
    expect(getComputedState(tree)).toEqual({
      data: defaultProps.data,
      argumentAxisName: 'argumentName',
      domains,
      computedDomain,
      colorDomain: expect.any(Function),
    });
  });
});
