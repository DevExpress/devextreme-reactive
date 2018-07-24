import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  findSeriesByName, xyScales, coordinates, seriesData, checkZeroStart,
} from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { withSeriesPlugin } from './series-helper';

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
  {
    x: 1, y: 3, id: 1, value: 10,
  },
  {
    x: 2, y: 5, id: 2, value: 20,
  },
  {
    x: 3, y: 7, id: 3, value: 30,
  },
  {
    x: 4, y: 10, id: 4, value: 40,
  },
  {
    x: 5, y: 15, id: 5, value: 50,
  },
];

const lineMethod = jest.fn();
const pointMethod = jest.fn();
const extraOptions = jest.fn();

describe('Base series', () => {
  beforeEach(() => {
    findSeriesByName.mockReturnValue({
      stack: 'stack1',
      themeColor: 'color',
    });

    coordinates.mockReturnValue(coords);
    pointMethod.mockReturnValue(jest.fn());
    seriesData.mockReturnValue('series');
    checkZeroStart.mockReturnValue('zeroAxes');
    extraOptions.mockReturnValue('extraOptions');
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
  const TestComponentPath = () => (
    <div>
      TestComponentPath
    </div>
  );
  const TestComponentPoint = () => (
    <div>
      TestComponentPoint
    </div>
  );

  const WrappedComponent = withSeriesPlugin(
    TestComponentPath,
    TestComponentPoint,
    'TestComponent',
    'pathType',
    lineMethod,
    pointMethod,
    extraOptions,
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
    const points = tree.children().find(TestComponentPoint);

    expect(tree.find(TestComponentPath).props()).toEqual({
      coordinates: coords,
      styles: 'styles',
      themeColor: 'color',
    });
    for (let i = 0; i < coords.length; i += 1) {
      expect(points.get(i).props.value).toBe(coords[i].value);
    }

    expect(lineMethod).toBeCalledWith('pathType', undefined);
    expect(pointMethod).toBeCalledWith(undefined, 'extraOptions', 'stack1');
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
      expect.anything(),
      'series',
    );

    expect(xyScales).toHaveBeenLastCalledWith(
      'domains',
      'argumentAxisName',
      'axisName',
      { width: 60, height: 50 },
      ['one', 'two'],
      'extraOptions',
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

  it('should pass correct arguments to checkZeroStart', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <WrappedComponent
          {...defaultProps}
        />
      </PluginHost>
    ));
    expect(checkZeroStart)
      .toHaveBeenCalledWith({}, 'axisName', 'pathType');
  });
});
