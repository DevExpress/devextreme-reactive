import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  findSeriesByName, xyScales, coordinates, seriesData, checkZeroStart,
} from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { withSeriesPlugin } from './series-helper';

jest.mock('@devexpress/dx-chart-core', () => ({
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


describe('Base series', () => {
  beforeEach(() => {
    findSeriesByName.mockReturnValue({
      stack: 'stack1',
      color: 'color',
    });
    coordinates.mockReturnValue(coords);
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
      domains: { argumentAxisName: 'argumentDomain', axisName: 'valueDomain' },
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

  const WrappedComponent = withSeriesPlugin(
    TestComponentPath,
    'TestComponent',
    'pathType',
    coordinates,
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
      coordinates: coords,
      styles: 'styles',
    });
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
      'argumentDomain',
      'valueDomain',
      { width: 60, height: 50 },
      0.7,
    );

    expect(coordinates).toHaveBeenLastCalledWith(
      'data',
      undefined,
      'argumentField',
      'valueField',
      'name',
      'stack1',
      ['one', 'two'],
      { styles: 'styles' },
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
