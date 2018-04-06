import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { getSeriesAttributes } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '../../../dx-testing/test-utils';
import { BarSeries } from './bar-series';

const PointComponent = () => null;
// eslint-disable-next-line react/prop-types
const RootComponent = ({ children }) => <div>{children}</div>;

const coordinates = [
  { x: 1, y: 3, id: 1 },
  { x: 2, y: 5, id: 2 },
  { x: 3, y: 7, id: 3 },
  { x: 4, y: 10, id: 4 },
  { x: 5, y: 15, id: 5 },
];
const widgetHeight = 10;
const bandwidth = 11;

jest.mock('@devexpress/dx-chart-core', () => ({
  getSeriesAttributes: jest.fn(),
}));

getSeriesAttributes.mockImplementation(() => ({
  coordinates,
  height: widgetHeight,
  scales: { xScale: { bandwidth: jest.fn(() => bandwidth) } },
}));

describe('Scatter series', () => {
  const defaultDeps = {
    getter: {
      layouts: { 'center-center': {} },
    },
    template: {
      canvas: {},
    },
  };

  const defaultProps = {
    rootComponent: RootComponent,
    pointComponent: PointComponent,
    name: 'val1',
    styles: 'styles',
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

    expect(tree.find(PointComponent)).toHaveLength(coordinates.length);

    coordinates.forEach((coord, index) =>
      expect(tree.find(PointComponent).get(index).props).toEqual({
        x: coord.x,
        y: coord.y,
        styles: 'styles',
        height: widgetHeight - coord.y,
        width: bandwidth,
      }));
  });
});
