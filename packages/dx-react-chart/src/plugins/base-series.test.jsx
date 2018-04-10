import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { getSeriesAttributes } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { baseSeries } from './base-series';

// eslint-disable-next-line react/prop-types
const RootComponent = ({ children }) => <div>{children}</div>;

jest.mock('@devexpress/dx-chart-core', () => ({
  getSeriesAttributes: jest.fn(),
}));

describe('Base series', () => {
  beforeEach(() => {
    getSeriesAttributes.mockImplementation(() => 'attributes');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  const defaultDeps = {
    getter: {
      layouts: { 'center-center': { x: 1, y: 2 } },
      data: 'data',
      series: 'series',
      domains: 'domains',
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
  const TestComponent = () => (<div>TestComponent</div>);
  const WrappedComponent = baseSeries(TestComponent, 'TestComponent', 'pathType');

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
    expect(root.children().find(TestComponent).props()).toEqual({
      attributes: 'attributes',
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

    expect(getSeriesAttributes).toHaveBeenCalledTimes(1);
    expect(getSeriesAttributes).toHaveBeenLastCalledWith(
      'data',
      'series',
      'name',
      'domains',
      'argumentAxisName',
      { x: 1, y: 2 },
      'pathType',
    );
  });
});
