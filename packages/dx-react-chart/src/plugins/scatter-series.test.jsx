import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pointAttributes, findSeriesByName } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { ScatterSeries } from './scatter-series';

jest.mock('@devexpress/dx-chart-core', () => ({
  pointAttributes: jest.fn(),
  findSeriesByName: jest.fn(),
  addSeries: jest.fn(),
  ARGUMENT_DOMAIN: 'test_argument_domain',
  getValueDomainName: () => 'test_value_domain',
  checkZeroStart: jest.fn(),
}));

describe('Scatter series', () => {
  const SeriesComponent = () => null;
  const PointComponent = () => null;

  const coords = [
    { x: 1, y: 11, index: 1 },
    { x: 2, y: 12, index: 2 },
    { x: 3, y: 13, index: 3 },
    { x: 4, y: 14, index: 4 },
    { x: 5, y: 15, index: 5 },
  ];

  pointAttributes.mockReturnValue(() => ({
    x: 4,
    y: 3,
    d: 'M12 12',
  }));

  const defaultProps = {
    argumentField: 'arg',
    valueField: 'val',
  };

  findSeriesByName.mockReturnValue({
    ...defaultProps,
    index: 1,
    points: coords,
    seriesComponent: SeriesComponent,
    pointComponent: PointComponent,
    color: 'color',
  });

  const defaultDeps = {
    getter: {
      layouts: { pane: {} },
      scales: { test_argument_domain: 'arg-scale', test_value_domain: 'val-scale' },
    },
    template: {
      series: {},
    },
  };

  it('should render points', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <ScatterSeries
          {...defaultProps}
        />
      </PluginHost>));

    expect(tree.find(SeriesComponent).props()).toEqual({
      pointComponent: PointComponent,
      index: 1,
      color: 'color',
      coordinates: coords,
      path: undefined,
      getAnimatedStyle: undefined,
      scales: { xScale: 'arg-scale', yScale: 'val-scale' },
    });
  });
});
