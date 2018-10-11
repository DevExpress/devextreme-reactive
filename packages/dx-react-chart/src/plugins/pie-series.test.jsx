import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { pieAttributes, findSeriesByName } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { PieSeries } from './pie-series';
import { SliceCollection } from '../templates/series/slice-collection';

const PointComponent = () => null;

jest.mock('@devexpress/dx-chart-core', () => ({
  pieAttributes: jest.fn(),
  findSeriesByName: jest.fn(),
  seriesData: jest.fn(),
  xyScales: jest.fn(),
  ARGUMENT_DOMAIN: 'test_argument_domain',
  getValueDomainName: () => 'test_value_domain',
}));

pieAttributes.mockImplementation(() => [
  {
    value: 'value1', data: { argumentField: 'argument1' }, id: 'value1', x: 1, y: 2,
  },
  {
    value: 'value2', data: { argumentField: 'argument2' }, id: 'value2', x: 1, y: 2,
  },
  {
    value: 'value3', data: { argumentField: 'argument3' }, id: 'value3', x: 1, y: 2,
  },
]);

const defaultProps = {
  name: 'val1',
  valueField: 'valueField',
  argumentField: 'argumentField',
};

findSeriesByName.mockImplementation(() => ({
  ...defaultProps,
  style: { opacity: 0.4 },
  seriesComponent: SliceCollection,
  pointComponent: PointComponent,
  calculateCoordinates: pieAttributes,
}));

describe('Pie series', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['<%s>'] });
  });
  afterAll(() => {
    resetConsole();
  });
  const defaultDeps = {
    getter: {
      layouts: { pane: { width: 200, height: 100 } },
      colorDomain: jest.fn().mockReturnValue('color'),
      domains: {},
      getAnimatedStyle: jest.fn(style => style),
    },
    template: {
      series: {},
    },
  };

  it('should render root element', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <PieSeries
          {...defaultProps}
        />
      </PluginHost>
    ));

    const g = tree.find('g');
    const { transform } = g.props();

    expect(transform)
      .toBe('translate(1 2)');
  });

  it('should render points', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <PieSeries
          {...defaultProps}
        />
      </PluginHost>
    ));

    tree.find(PointComponent).forEach((point, index) => {
      const pointIndex = index + 1;
      expect(point.props()).toEqual({
        data: { argumentField: `argument${pointIndex}` },
        value: `value${pointIndex}`,
        color: 'color',
        style: { opacity: 0.4 },
        id: `value${pointIndex}`,
        x: 1,
        y: 2,
      });
      expect(defaultDeps.getter.colorDomain)
        .toHaveBeenNthCalledWith(index + 1, `value${pointIndex}`);
    });
  });
});
