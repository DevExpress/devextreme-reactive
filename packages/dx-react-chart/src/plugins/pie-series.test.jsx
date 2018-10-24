import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { findSeriesByName } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { PieSeries } from './pie-series';
import { SliceCollection } from '../templates/series/slice-collection';

jest.mock('@devexpress/dx-chart-core', () => ({
  findSeriesByName: jest.fn(),
  addSeries: jest.fn(),
  ARGUMENT_DOMAIN: 'test_argument_domain',
  getValueDomainName: () => 'test_value_domain',
}));

describe('Pie series', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['<%s>'] });
  });
  afterAll(() => {
    resetConsole();
  });
  const PointComponent = () => null;

  const defaultProps = {
    valueField: 'valueField',
    argumentField: 'argumentField',
  };

  findSeriesByName.mockReturnValue({
    ...defaultProps,
    points: [
      {
        value: 'value1', data: { argumentField: 'argument1' }, index: 'value1', x: 1, y: 2,
      },
      {
        value: 'value2', data: { argumentField: 'argument2' }, index: 'value2', x: 1, y: 2,
      },
      {
        value: 'value3', data: { argumentField: 'argument3' }, index: 'value3', x: 1, y: 2,
      },
    ],
    style: { opacity: 0.4 },
    seriesComponent: SliceCollection,
    pointComponent: PointComponent,
  });

  const defaultDeps = {
    getter: {
      layouts: { pane: { width: 200, height: 100 } },
      scales: {},
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
        style: { opacity: 0.4 },
        index: `value${pointIndex}`,
        x: 1,
        y: 2,
      });
    });
  });
});
