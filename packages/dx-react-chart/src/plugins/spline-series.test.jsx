import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { findSeriesByName, coordinates, dSpline } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { SplineSeries } from './spline-series';

const SeriesComponent = () => null;

const coords = [
  { x: 1, y: 3, id: 1 },
  { x: 2, y: 5, id: 2 },
  { x: 3, y: 7, id: 3 },
  { x: 4, y: 10, id: 4 },
  { x: 5, y: 15, id: 5 },
];

jest.mock('@devexpress/dx-chart-core', () => ({
  dSpline: jest.fn(),
  findSeriesByName: jest.fn(),
  xyScales: jest.fn(),
  coordinates: jest.fn(),
  seriesData: jest.fn(),
  checkZeroStart: jest.fn(),
}));

const defaultProps = {
  name: 'val1',
  axisName: 'axisName',
  valueField: 'valueField',
  argumentField: 'argumentField',
};

findSeriesByName.mockImplementation(() => ({
  ...defaultProps,
  stack: 'stack',
  uniqueName: 'uniqueSeriesName',
  seriesComponent: SeriesComponent,
  customProperty: 'custom',
}));

coordinates.mockImplementation(() => coords);

describe('Spline series', () => {
  const defaultDeps = {
    getter: {
      layouts: { pane: {} },
      domains: {},
      colorDomain: jest.fn(),
    },
    template: {
      series: {},
    },
  };

  it('should render path', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <SplineSeries
          {...defaultProps}
        />
      </PluginHost>
    ));
    const {
      coordinates: seriesCoordinates, path, color, ...restProps
    } = tree.find(SeriesComponent).props();

    expect(seriesCoordinates).toBe(coords);
    expect(path).toBe(dSpline);
    expect(restProps).toEqual({ customProperty: 'custom' });
  });
});
