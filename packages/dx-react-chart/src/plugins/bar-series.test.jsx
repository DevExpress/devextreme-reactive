import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { barPointAttributes, findSeriesByName, xyScales, coordinates } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { BarSeries } from './bar-series';

const PointComponent = () => null;

const coords = [
  {
    x: 1, y: 3, y1: 6, id: 1,
  },
  {
    x: 2, y: 5, y1: 8, id: 2,
  },
  {
    x: 3, y: 7, y1: 11, id: 3,
  },
  {
    x: 4, y: 10, y1: 13, id: 4,
  },
  {
    x: 5, y: 15, y1: 20, id: 5,
  },
];

jest.mock('@devexpress/dx-chart-core', () => ({
  lineAttributes: jest.fn(),
  barPointAttributes: jest.fn(),
  findSeriesByName: jest.fn(),
  xyScales: jest.fn(),
  seriesData: jest.fn(),
  coordinates: jest.fn(),
  checkZeroStart: jest.fn(),
}));

barPointAttributes.mockImplementation(() => () => ({
  x: 4,
  y: 3,
  width: 20,
  height: 10,
}));

findSeriesByName.mockImplementation(() => ({
  stack: 'stack',
}));

xyScales.mockImplementation();
coordinates.mockImplementation(() => coords);

describe('Bar series', () => {
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
    name: 'val1',
    styles: 'styles',
    valueField: 'valueField',
    argumentField: 'argumentField',
    axisName: 'axisName',
    barWidth: 0.3,
    groupWidth: 0.6,
  };

  it('should render bars', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <BarSeries
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(PointComponent)).toHaveLength(coords.length);

    coords.forEach((coord, index) => {
      const {
        x, y, height, width, styles,
      } = tree.find(PointComponent).get(index).props;
      expect(x).toBe(4);
      expect(y).toBe(3);
      expect(width).toBe(20);
      expect(height).toBe(10);
      expect(styles).toBe('styles');
    });
    expect(barPointAttributes).toBeCalledWith(undefined, { barWidth: 0.3, groupWidth: 0.6 }, 'stack');
  });
});
