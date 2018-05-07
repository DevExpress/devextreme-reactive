import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { seriesAttributes } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { AreaSeries } from './area-series';

const PointComponent = () => null;
const PathComponent = () => null;
// eslint-disable-next-line react/prop-types
const RootComponent = ({ children }) => <div>{children}</div>;

const coordinates = [
  { x: 1, y: 3, id: 1 },
  { x: 2, y: 5, id: 2 },
  { x: 3, y: 7, id: 3 },
  { x: 4, y: 10, id: 4 },
  { x: 5, y: 15, id: 5 },
];

jest.mock('@devexpress/dx-chart-core', () => ({
  seriesAttributes: jest.fn(),
}));

seriesAttributes.mockImplementation(() => ({
  coordinates,
  dPoint: 'M10 10',
  d: 'M11 11',
}));

describe('Area series', () => {
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
    pathComponent: PathComponent,
    name: 'val1',
    styles: 'styles',
    pointStyle: { fill: 'point fill' },
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

    expect(tree.find(PointComponent)).toHaveLength(coordinates.length);

    coordinates.forEach((coord, index) =>
      expect(tree.find(PointComponent).get(index).props).toEqual({
        d: 'M10 10',
        x: coord.x,
        y: coord.y,
        style: { fill: 'point fill' },
      }));
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
    expect(tree.find(PathComponent).props()).toEqual({
      d: 'M11 11',
      styles: 'styles',
      x: 0,
      y: 0,
    });
  });
});
