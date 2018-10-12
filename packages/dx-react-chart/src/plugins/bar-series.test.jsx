import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { findSeriesByName } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { BarSeries } from './bar-series';
import { BarCollection } from '../templates/series/bar-collection';

jest.mock('@devexpress/dx-chart-core', () => ({
  dBar: jest.fn(),
  findSeriesByName: jest.fn(),
  addSeries: jest.fn(),
  ARGUMENT_DOMAIN: 'test_argument_domain',
  getValueDomainName: () => 'test_value_domain',
}));

describe('Bar series', () => {
  const PointComponent = () => null;

  const coords = [{
    x: 1, y: 3, y1: 6, id: 1,
  }, {
    x: 2, y: 5, y1: 8, id: 2,
  }, {
    x: 3, y: 7, y1: 11, id: 3,
  }];

  const defaultProps = {
    valueField: 'valueField',
    argumentField: 'argumentField',
  };

  findSeriesByName.mockReturnValue({
    ...defaultProps,
    stack: 'stack',
    barWidth: 0.3,
    styles: 'styles',
    uniqueName: 'uniqueSeriesName',
    seriesComponent: BarCollection,
    pointComponent: PointComponent,
  });

  const defaultDeps = {
    getter: {
      layouts: { pane: {} },
      scales: {},
      getSeriesPoints: jest.fn().mockReturnValue(coords),
    },
    template: {
      series: {},
    },
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
