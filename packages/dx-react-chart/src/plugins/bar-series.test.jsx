import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { seriesAttributes } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { BarSeries } from './bar-series';

const PointComponent = () => null;
// eslint-disable-next-line react/prop-types
const RootComponent = ({ children }) => <div>{children}</div>;
const OFFSET = 3;

const coordinates = [
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
const bandwidth = 20;
const x0Scale = jest.fn(stack => stack === 'seriesStack' && OFFSET);
x0Scale.bandwidth = jest.fn(() => bandwidth);

jest.mock('@devexpress/dx-chart-core', () => ({
  seriesAttributes: jest.fn(),
}));

seriesAttributes.mockImplementation(() => ({
  coordinates,
  scales: { x0Scale },
  stack: 'seriesStack',
}));

describe('Bar series', () => {
  const defaultDeps = {
    getter: {
      layouts: { pane: {} },
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
        x: coord.x + OFFSET,
        y: coord.y,
        styles: 'styles',
        height: coord.y1 - coord.y,
        width: bandwidth,
      }));
  });
});
