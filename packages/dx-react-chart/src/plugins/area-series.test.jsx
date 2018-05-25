import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { lineAttributes, pointAttributes, findSeriesByName, xyScales, coordinates } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { AreaSeries } from './area-series';

const PointComponent = () => null;
const SeriesComponent = () => null;

jest.mock('@devexpress/dx-chart-core', () => ({
  lineAttributes: jest.fn(),
  pointAttributes: jest.fn(),
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

lineAttributes.mockImplementation(() => ({
  x: 2,
  y: 1,
  d: 'M11 11',
}));

pointAttributes.mockImplementation(() => () => ({
  x: 4,
  y: 3,
  d: 'M12 12',
}));

findSeriesByName.mockImplementation(() => ({
  stack: 'stack1',
}));

xyScales.mockImplementation();
coordinates.mockImplementation(() => coords);

describe('Area series', () => {
  const defaultDeps = {
    getter: {
      layouts: { pane: {} },
    },
    template: {
      series: {},
    },
  };

  const defaultProps = {
    pointComponent: PointComponent,
    seriesComponent: SeriesComponent,
    name: 'val1',
    styles: 'styles',
    pointStyle: { fill: 'point fill' },
    valueField: 'valueField',
    argumentField: 'argumentField',
    axisName: 'axisName',
  };

  it('should render points', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <AreaSeries
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(PointComponent)).toHaveLength(coords.length);

    coords.forEach((coord, index) => {
      const {
        d, x, y, style,
      } = tree.find(PointComponent).get(index).props;
      expect(d).toBe('M12 12');
      expect(x).toBe(4);
      expect(y).toBe(3);
      expect(style).toEqual({ fill: 'point fill' });
    });
  });

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
      d, styles, x, y,
    } = tree.find(SeriesComponent).props();
    expect(d).toBe('M11 11');
    expect(styles).toBe('styles');
    expect(x).toBe(2);
    expect(y).toBe(1);
  });
});
