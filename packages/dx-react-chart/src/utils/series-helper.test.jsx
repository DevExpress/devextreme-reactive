import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { findSeriesByName, addSeries } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { withSeriesPlugin } from './series-helper';

jest.mock('@devexpress/dx-chart-core', () => ({
  findSeriesByName: jest.fn(),
  addSeries: jest.fn(),
}));

describe('Base series', () => {
  const coords = 'test-coordinates';

  const defaultProps = {
    name: 'name',
    axisName: 'axisName',
    valueField: 'valueField',
    argumentField: 'argumentField',
  };

  beforeEach(() => {
    findSeriesByName.mockReturnValue({
      ...defaultProps,
      points: coords,
      color: 'color',
      styles: 'styles',
    });
    addSeries.mockReturnValue('series');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const defaultDeps = {
    getter: {
      data: 'data',
      series: 'series',
      palette: 'test-palette',
      scales: 'test-scales',
      stacks: ['one', 'two'],
      scaleExtension: 'scaleExtension',
    },
    template: {
      series: {},
    },
  };

  const testGetPointTransformer = () => null;

  const TestComponentPath = () => (
    <div>
      TestComponentPath
    </div>
  );

  const WrappedComponent = withSeriesPlugin(
    TestComponentPath,
    'TestComponent',
    'pathType',
    testGetPointTransformer,
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
      styles: 'styles',
    });
  });

  it('should add series to list', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <WrappedComponent
          {...defaultProps}
        />
      </PluginHost>
    ));
    expect(addSeries).toHaveBeenCalledWith('series', 'data', 'test-palette', expect.objectContaining({
      ...defaultProps,
      isStartedFromZero: false,
      getPointTransformer: testGetPointTransformer,
    }));
  });
});
