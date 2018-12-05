import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { getLegendItems } from '@devexpress/dx-chart-core';
import { Legend } from './legend';

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
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <Legend
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(getLegendItems).toBeCalledWith('test-series');
    expect(tree.find(Label)).toHaveLength(2);
    expect(tree.find(Marker)).toHaveLength(2);
  });

  it('should render Marker with correct props', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <Legend
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(Marker).get(0).props).toEqual({
      name: 'series 1',
      color: 'color 1',
    });
    expect(tree.find(Marker).get(1).props).toEqual({
      name: 'series 2',
      color: 'color 2',
    });
  });

  it('should render Label with correct props', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <Legend
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(Label).get(0).props).toEqual({
      text: 'series 1',
    });
    expect(tree.find(Label).get(1).props).toEqual({
      text: 'series 2',
    });
  });

  it('should render custom items', () => {
    const getItems = jest.fn().mockReturnValue([
      { text: 't1', color: 'c1' },
      { text: 't2', color: 'c2' },
      { text: 't3', color: 'c3' },
    ]);
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <Legend
          {...defaultProps}
          getItems={getItems}
        />
      </PluginHost>
    ));

    expect(getItems).toBeCalledWith(defaultDeps.getter);
    expect(tree.find(Marker).get(0).props).toEqual({ name: 't1', color: 'c1' });
    expect(tree.find(Marker).get(1).props).toEqual({ name: 't2', color: 'c2' });
    expect(tree.find(Marker).get(2).props).toEqual({ name: 't3', color: 'c3' });
  });
});
