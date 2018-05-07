import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { findSeriesByName, xyScales, coordinates } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { baseSeries } from './base-series';

// eslint-disable-next-line react/prop-types
const RootComponent = ({ children }) => <div>{children}</div>;

jest.mock('@devexpress/dx-chart-core', () => ({
  lineAttributes: jest.fn(),
  pointAttributes: jest.fn(),
  findSeriesByName: jest.fn(),
  xyScales: jest.fn(),
  coordinates: jest.fn(),
}));

const coords = [
  { x: 1, y: 3, id: 1 },
  { x: 2, y: 5, id: 2 },
  { x: 3, y: 7, id: 3 },
  { x: 4, y: 10, id: 4 },
  { x: 5, y: 15, id: 5 },
];

const lineMethod = jest.fn();
const pointMethod = jest.fn();

describe('Base series', () => {
  beforeEach(() => {
    findSeriesByName.mockImplementation(() => ({
      axisName: 'axisName',
      argumentField: 'arg',
      valueField: 'val',
      stack: 'stack',
    }));

    xyScales.mockImplementation();
    coordinates.mockImplementation(() => coords);

    lineMethod.mockImplementation();
    pointMethod.mockImplementation(() => jest.fn());
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  const defaultDeps = {
    getter: {
      layouts: { pane: { x: 1, y: 2 } },
      data: 'data',
      series: 'series',
      domains: 'domains',
      stacks: ['one', 'two'],
      argumentAxisName: 'argumentAxisName',
    },
    template: {
      canvas: {},
    },
  };

  const defaultProps = {
    rootComponent: RootComponent,
    name: 'name',
    styles: 'styles',
  };
  const TestComponentPath = () => (<div>TestComponentPath</div>);
  const TestComponentPoint = () => (<div>TestComponentPoint</div>);

  const WrappedComponent = baseSeries(
    TestComponentPath,
    TestComponentPoint,
    'TestComponent',
    'pathType',
    lineMethod,
    pointMethod,
  );

  it('should render test component', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <WrappedComponent
          {...defaultProps}
        />
      </PluginHost>
    ));

    const root = tree.find(RootComponent);
    expect(root.props().x).toBe(1);
    expect(root.props().y).toBe(2);
    expect(root.children().find(TestComponentPath).props()).toEqual({
      styles: 'styles',
    });
    expect(root.children().find(TestComponentPoint)).toHaveLength(5);
    expect(lineMethod).toBeCalledWith('pathType', coords, undefined);
    expect(pointMethod).toBeCalledWith(undefined, 7, 'stack');
  });

  it('should call function to get attributes for series', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <WrappedComponent
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(findSeriesByName).toHaveBeenCalledTimes(1);
    expect(xyScales).toHaveBeenCalledTimes(1);
    expect(coordinates).toHaveBeenCalledTimes(1);

    expect(findSeriesByName).toHaveBeenLastCalledWith(
      'name',
      'series',
    );

    expect(xyScales).toHaveBeenLastCalledWith(
      'domains',
      'argumentAxisName',
      'axisName',
      { x: 1, y: 2 },
      ['one', 'two'],
      0.7,
      0.9,
    );

    expect(coordinates).toHaveBeenLastCalledWith(
      'data',
      undefined,
      'arg',
      'val',
      'name',
    );
  });
});
