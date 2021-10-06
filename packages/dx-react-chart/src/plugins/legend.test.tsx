import * as React from 'react';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { getLegendItems } from '@devexpress/dx-chart-core';
import { Legend } from './legend';
import { create } from 'react-test-renderer';


jest.mock('@devexpress/dx-chart-core', () => ({
  getLegendItems: jest.fn().mockReturnValue([
    { color: 'color 1', text: 'series 1' },
    { color: 'color 2', text: 'series 2' },
  ]),
}));

describe('Legend', () => {
  afterEach(jest.clearAllMocks);

  const defaultDeps = {
    getter: {
      series: 'test-series',
      data: 'test-data',
    },
    template: {
      right: {},
    },
  };

  const Label = () => null;
  const Marker = () => null;
  const Root = ({ children }) => children;
  const Item = ({ children }) => children;

  const defaultProps = {
    markerComponent: Marker,
    labelComponent: Label,
    rootComponent: Root,
    itemComponent: Item,
  };

  it('should render Marker and Label', () => {
    const tree = create((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <Legend
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(getLegendItems).toBeCalledWith('test-series');
    expect(tree.root.findAllByType(Label)).toHaveLength(2);
    expect(tree.root.findAllByType(Marker)).toHaveLength(2);
  });

  it('should render Marker with correct props', () => {
    const tree = create((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <Legend
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.root.findAllByType(Marker)[0].props).toEqual({
      name: 'series 1',
      color: 'color 1',
    });
    expect(tree.root.findAllByType(Marker)[1].props).toEqual({
      name: 'series 2',
      color: 'color 2',
    });
  });

  it('should render Label with correct props', () => {
    const tree = create((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <Legend
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.root.findAllByType(Label)[0].props).toEqual({
      text: 'series 1',
    });
    expect(tree.root.findAllByType(Label)[1].props).toEqual({
      text: 'series 2',
    });
  });

  it('should render custom items', () => {
    const getItems = jest.fn().mockReturnValue([
      { text: 't1', color: 'c1' },
      { text: 't2', color: 'c2' },
      { text: 't3', color: 'c3' },
    ]);
    const tree = create((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <Legend
          {...defaultProps}
          getItems={getItems}
        />
      </PluginHost>
    ));

    expect(getItems).toBeCalledWith(defaultDeps.getter);
    expect(tree.root.findAllByType(Marker)[0].props).toEqual({ name: 't1', color: 'c1' });
    expect(tree.root.findAllByType(Marker)[1].props).toEqual({ name: 't2', color: 'c2' });
    expect(tree.root.findAllByType(Marker)[2].props).toEqual({ name: 't3', color: 'c3' });
  });
});
