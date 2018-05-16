import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { findSeriesByName, xyScales, coordinates, seriesData } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { baseSeries } from './base-series';

jest.mock('@devexpress/dx-chart-core', () => ({
  lineAttributes: jest.fn(),
  pointAttributes: jest.fn(),
  findSeriesByName: jest.fn(),
  xyScales: jest.fn(),
  coordinates: jest.fn(),
  seriesData: jest.fn(),
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
    findSeriesByName.mockReturnValue({
      stack: 'stack1',
    });

    coordinates.mockReturnValue(coords);
    pointMethod.mockReturnValue(jest.fn());
    seriesData.mockReturnValue('series');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  const defaultDeps = {
    getter: {
      layouts: { pane: { height: 50, width: 60 } },
      data: 'data',
      series: 'series',
      domains: 'domains',
      stacks: ['one', 'two'],
      argumentAxisName: 'argumentAxisName',
    },
    template: {
      series: {},
    },
  };

  const defaultProps = {
    name: 'name',
    styles: 'styles',
    valueField: 'valueField',
    argumentField: 'argumentField',
    axisName: 'axisName',
    stack: 'stack',
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

    expect(tree.find(TestComponentPath).props()).toEqual({
      styles: 'styles',
    });
    expect(tree.children().find(TestComponentPoint)).toHaveLength(5);
    expect(lineMethod).toBeCalledWith('pathType', coords, undefined);
    expect(pointMethod).toBeCalledWith(undefined, 7, 'stack1');
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
      { width: 60, height: 50 },
      ['one', 'two'],
      0.7,
      0.9,
    );

    expect(coordinates).toHaveBeenLastCalledWith(
      'data',
      undefined,
      'argumentField',
      'valueField',
      'name',
    );
  });

  it('should pass axesData correct arguments', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <WrappedComponent
          {...defaultProps}
        />
      </PluginHost>
    ));
    expect(seriesData).toHaveBeenCalledWith(
      'series',
      expect.objectContaining({
        valueField: 'valueField',
        argumentField: 'argumentField',
        name: 'name',
        axisName: 'axisName',
        stack: 'stack',
      }),
    );
  });
});
