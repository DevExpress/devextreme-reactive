import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { dLine, findSeriesByName, coordinates } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { LineSeries } from './line-series';

const SeriesComponent = () => null;

const coords = [
  { x: 1, y: 3, id: 1 },
  { x: 2, y: 5, id: 2 },
  { x: 3, y: 7, id: 3 },
  { x: 4, y: 10, id: 4 },
  { x: 5, y: 15, id: 5 },
];

jest.mock('@devexpress/dx-chart-core', () => ({
  dLine: jest.fn(),
  findSeriesByName: jest.fn(),
  xyScales: jest.fn(),
  coordinates: jest.fn(),
  seriesData: jest.fn(),
  checkZeroStart: jest.fn(),
}));

findSeriesByName.mockImplementation(() => ({
  stack: 'stack',
}));

coordinates.mockImplementation(() => coords);

describe('Line series', () => {
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

        <LineSeries
          {...defaultProps}
          customProperty="custom"
        />
      </PluginHost>
    ));
    const {
      coordinates: seriesCoordinates, path, color, ...restProps
    } = tree.find(SeriesComponent).props();

    expect(seriesCoordinates).toBe(coords);
    expect(path).toBe(dLine);
    expect(restProps).toEqual({ customProperty: 'custom' });
  });
});
