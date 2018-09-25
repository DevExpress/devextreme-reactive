import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  findSeriesByName, xyScales, coordinates, seriesData, getValueDomainName,
} from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { withSeriesPlugin } from './series-helper';

jest.mock('@devexpress/dx-chart-core', () => ({
  findSeriesByName: jest.fn(),
  xyScales: jest.fn(),
  coordinates: jest.fn(),
  seriesData: jest.fn(),
  ARGUMENT_DOMAIN: 'test_argument_domain',
  getValueDomainName: jest.fn(),
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
  const defaultProps = {
    name: 'name',
    axisName: 'axisName',
    valueField: 'valueField',
    argumentField: 'argumentField',
  };

  beforeEach(() => {
    findSeriesByName.mockReturnValue({
      ...defaultProps,
      stack: 'stack1',
      groupWidth: 0.7,
      color: 'color',
      styles: 'styles',
    });
    coordinates.mockReturnValue(coords);
    seriesData.mockReturnValue('series');
    getValueDomainName.mockReturnValue('test_value_domain');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const defaultDeps = {
    getter: {
      layouts: { pane: { height: 50, width: 60 } },
      data: 'data',
      series: 'series',
      domains: { test_argument_domain: 'argumentDomain', test_value_domain: 'valueDomain' },
      stacks: ['one', 'two'],
      scaleExtension: 'scaleExtension',
      colorDomain: 'colorDomain',
    },
    template: {
      series: {},
    },
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
      color: 'color',
      colorDomain: 'colorDomain',
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
      'scaleExtension',
    );

    expect(coordinates).toHaveBeenLastCalledWith(
      'data',
      undefined,
      'argumentField',
      'valueField',
      'name',
      'stack1',
      ['one', 'two'],
      { styles: 'styles', color: 'color' },
      'scaleExtension',
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
      }),
    );
  });
});
