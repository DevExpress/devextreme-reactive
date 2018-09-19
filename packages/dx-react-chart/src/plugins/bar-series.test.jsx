import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { findSeriesByName, barCoordinates } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { BarSeries } from './bar-series';
import { BarCollection } from '../templates/series/bar-collection';

const PointComponent = () => null;

const coords = [{
  x: 1, y: 3, y1: 6, id: 1,
}, {
  x: 2, y: 5, y1: 8, id: 2,
}, {
  x: 3, y: 7, y1: 11, id: 3,
}];

jest.mock('@devexpress/dx-chart-core', () => ({
  findSeriesByName: jest.fn(),
  xyScales: jest.fn(),
  seriesData: jest.fn(),
  barCoordinates: jest.fn(),
  checkZeroStart: jest.fn(),
  dBar: jest.fn(),
}));

findSeriesByName.mockImplementation(() => ({
  stack: 'stack',
}));

barCoordinates.mockImplementation(() => coords);

describe('Bar series', () => {
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
    seriesComponent: BarCollection,
    pointComponent: PointComponent,
    name: 'val1',
    styles: 'styles',
    valueField: 'valueField',
    argumentField: 'argumentField',
    axisName: 'axisName',
    barWidth: 0.3,
    groupWidth: 0.6,
    uniqueName: 'uniqueSeriesName',
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
        x, y, y1,
      } = tree.find(PointComponent).get(index).props;
      expect(x).toBe(coords[index].x);
      expect(y).toBe(coords[index].y);
      expect(y1).toBe(coords[index].y1);
    });
  });
});
