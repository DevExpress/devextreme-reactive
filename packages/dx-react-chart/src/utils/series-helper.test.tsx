import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { findSeriesByName, addSeries, getValueDomainName } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { declareSeries } from './series-helper';

jest.mock('@devexpress/dx-chart-core', () => ({
  findSeriesByName: jest.fn(),
  addSeries: jest.fn(),
  ARGUMENT_DOMAIN: 'test_argument_domain',
  getValueDomainName: jest.fn(),
}));

describe('#declareSeries', () => {
  const coords = 'test-coordinates';

  const testGetPointTransformer = () => null;

  const TestComponentPath = () => (
    <div>
      TestComponentPath
    </div>
  );

  const TestComponentPoint = () => null;

  const defaultProps = {
    name: 'name',
    scaleName: 'scaleName',
    valueField: 'valueField',
    argumentField: 'argumentField',
  };

  findSeriesByName.mockReturnValue({
    ...defaultProps,
    index: 1,
    seriesComponent: TestComponentPath,
    points: coords,
    state: 'test-state',
    color: 'color',
    styles: 'styles',
  });
  addSeries.mockReturnValue('extended-series');
  getValueDomainName.mockReturnValue('value_domain');

  afterEach(jest.clearAllMocks);

  const defaultDeps = {
    getter: {
      series: 'test-series',
      data: 'test-data',
      palette: 'test-palette',
      scales: { test_argument_domain: 'argument-scale', value_domain: 'value-scale' },
      getAnimatedStyle: 'test-animated-style-getter',
    },
    template: {
      series: {},
    },
  };

  const WrappedComponent = declareSeries('TestComponent', {
    components: {
      Path: TestComponentPath,
      Point: TestComponentPoint,
    },
    getPointTransformer: testGetPointTransformer,
  });

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
      index: 1,
      path: undefined,
      coordinates: coords,
      pointComponent: undefined,
      state: 'test-state',
      color: 'color',
      scales: { xScale: 'argument-scale', yScale: 'value-scale' },
      getAnimatedStyle: 'test-animated-style-getter',
    });
  });

  it('should add series to list', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <WrappedComponent
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(addSeries).toBeCalledWith('test-series', 'test-data', 'test-palette', {
      ...defaultProps,
      symbolName: expect.anything(),
      getPointTransformer: testGetPointTransformer,
      seriesComponent: TestComponentPath,
      pointComponent: TestComponentPoint,
    }, {});
    expect(getComputedState(tree)).toEqual({
      ...defaultDeps.getter,
      series: 'extended-series',
    });
  });

  it('should set components', () => {
    expect(WrappedComponent.components).toEqual({
      seriesComponent: 'Path',
      pointComponent: 'Point',
    });
    expect(WrappedComponent.Path).toEqual(TestComponentPath);
    expect(WrappedComponent.Point).toEqual(TestComponentPoint);
  });
});
