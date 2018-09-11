import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { dArea, findSeriesByName, coordinates } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { AreaSeries } from './area-series';

const SeriesComponent = () => null;

jest.mock('@devexpress/dx-chart-core', () => ({
  dArea: jest.fn(),
  findSeriesByName: jest.fn(),
  xyScales: jest.fn(),
  coordinates: jest.fn(),
  seriesData: jest.fn(),
  checkZeroStart: jest.fn(),
}));

const coords = [
  { x: 1, y: 3, id: 1 },
  { x: 2, y: 5, id: 2 },
  { x: 3, y: 7, id: 3 },
  { x: 4, y: 10, id: 4 },
  { x: 5, y: 15, id: 5 },
];

findSeriesByName.mockImplementation(() => ({
  stack: 'stack1',
}));

coordinates.mockImplementation(() => coords);

describe('Area series', () => {
  const defaultDeps = {
    getter: {
      layouts: { pane: {} },
      colorDomain: jest.fn(),
      domains: {},
    },
    template: {
      series: {},
    },
  };

  const defaultProps = {
    seriesComponent: SeriesComponent,
    name: 'val1',
    valueField: 'valueField',
    argumentField: 'argumentField',
    axisName: 'axisName',
    uniqueName: 'uniqueSeriesName',
  };

  it('should render path', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <AreaSeries
          {...defaultProps}
          customProperty="custom"
        />
      </PluginHost>
    ));
    const {
      coordinates: seriesCoordinates, path, color, ...restProps
    } = tree.find(SeriesComponent).props();

    expect(seriesCoordinates).toBe(coords);
    expect(path).toBe(dArea);
    expect(restProps).toEqual({ customProperty: 'custom' });
  });

  it('should render with color', () => {
    const colorDomain = jest.fn().mockReturnValue('red');
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <AreaSeries
          {...defaultProps}
          colorDomain={colorDomain}
          customProperty="custom"
        />
      </PluginHost>
    ));
    const { color } = tree.find(SeriesComponent).props();

    expect(color).toEqual('red');
    expect(colorDomain).lastCalledWith('uniqueSeriesName');
  });
});
