import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { dLine, findSeriesByName } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { LineSeries } from './line-series';

jest.mock('@devexpress/dx-chart-core', () => ({
  dLine: jest.fn(),
  findSeriesByName: jest.fn(),
  addSeries: jest.fn(),
  ARGUMENT_DOMAIN: 'test_argument_domain',
  getValueDomainName: () => 'test_value_domain',
  checkZeroStart: jest.fn(),
}));

describe('Line series', () => {
  const SeriesComponent = () => null;

  const coords = [
    { x: 1, y: 3, id: 1 },
    { x: 2, y: 5, id: 2 },
    { x: 3, y: 7, id: 3 },
    { x: 4, y: 10, id: 4 },
    { x: 5, y: 15, id: 5 },
  ];

  const defaultProps = {
    valueField: 'valueField',
    argumentField: 'argumentField',
  };

  findSeriesByName.mockReturnValue({
    ...defaultProps,
    points: coords,
    seriesComponent: SeriesComponent,
    customProperty: 'custom',
  });

  const defaultDeps = {
    getter: {
      layouts: { pane: {} },
      scales: {},
    },
    template: {
      series: {},
    },
  };

  it('should render path', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <LineSeries
          {...defaultProps}
        />
      </PluginHost>
    ));
    const {
      coordinates: seriesCoordinates, path, ...restProps
    } = tree.find(SeriesComponent).props();

    expect(seriesCoordinates).toBe(coords);
    expect(path).toBe(dLine);
    expect(restProps).toEqual({
      customProperty: 'custom',
      getAnimatedStyle: undefined,
      scales: {},
    });
  });
});
