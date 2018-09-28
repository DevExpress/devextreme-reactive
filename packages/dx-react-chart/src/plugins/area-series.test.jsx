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
  ARGUMENT_DOMAIN: 'test_argument_domain',
  getValueDomainName: () => 'test_value_domain',
}));

const coords = [
  { x: 1, y: 3, id: 1 },
  { x: 2, y: 5, id: 2 },
  { x: 3, y: 7, id: 3 },
  { x: 4, y: 10, id: 4 },
  { x: 5, y: 15, id: 5 },
];

const defaultProps = {
  name: 'val1',
  axisName: 'axisName',
  valueField: 'valueField',
  argumentField: 'argumentField',
};

const findSeriesByNameResult = {
  ...defaultProps,
  stack: 'stack1',
  uniqueName: 'uniqueSeriesName',
  seriesComponent: SeriesComponent,
  calculateCoordinates: coordinates,
};

findSeriesByName.mockImplementation(() => ({
  ...findSeriesByNameResult,
  customProperty: 'custom',
}));

coordinates.mockImplementation(() => coords);

describe('Area series', () => {
  const defaultDeps = {
    getter: {
      layouts: { pane: {} },
      colorDomain: jest.fn().mockReturnValue('red'),
      domains: {},
    },
    template: {
      series: {},
    },
  };

  it('should render path', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <AreaSeries
          {...defaultProps}
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
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <AreaSeries
          {...defaultProps}
        />
      </PluginHost>
    ));
    const { color } = tree.find(SeriesComponent).props();

    expect(color).toEqual('red');
  });
});
