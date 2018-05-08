import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { lineAttributes, pointAttributes, findSeriesByName, xyScales, coordinates } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { LineSeries } from './line-series';

const PointComponent = () => null;
const PathComponent = () => null;
// eslint-disable-next-line react/prop-types
const RootComponent = ({ children }) => <div>{children}</div>;

const coords = [
  { x: 1, y: 3, id: 1 },
  { x: 2, y: 5, id: 2 },
  { x: 3, y: 7, id: 3 },
  { x: 4, y: 10, id: 4 },
  { x: 5, y: 15, id: 5 },
];

jest.mock('@devexpress/dx-chart-core', () => ({
  lineAttributes: jest.fn(),
  pointAttributes: jest.fn(),
  findSeriesByName: jest.fn(),
  xyScales: jest.fn(),
  coordinates: jest.fn(),
}));

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
  axisName: 'axisName',
  argumentField: 'arg',
  valueField: 'val',
  stack: 'stack',
}));

xyScales.mockImplementation();
coordinates.mockImplementation(() => coords);

describe('Line series', () => {
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

        <LineSeries
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

        <LineSeries
          {...defaultProps}
        />
      </PluginHost>
    ));
    const {
      d, styles, x, y,
    } = tree.find(PathComponent).props();
    expect(d).toBe('M11 11');
    expect(styles).toBe('styles');
    expect(x).toBe(2);
    expect(y).toBe(1);
  });
});
