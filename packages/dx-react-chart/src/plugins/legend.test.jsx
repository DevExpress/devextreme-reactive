import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { Legend } from './legend';

const Label = () => null;
const Marker = () => null;
const addNodes = jest.fn();

describe('Legend', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  const defaultDeps = {
    getter: {
      layouts: { pane: {} },
      series: [{ name: 'first' }],
      addNodes,
    },
    template: {
      canvas: {},
    },
  };

  const defaultProps = {
    markerComponent: Marker,
    labelComponent: Label,
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
    expect(tree.find(Label)).toHaveLength(1);
    expect(tree.find(Marker)).toHaveLength(1);
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
      margin: 5,
      name: 'first-legend-marker-right',
      x: 0,
      y: 0,
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
      dominantBaseline: 'text-before-edge',
      margin: 5,
      name: 'first-legend-label-right',
      textAnchor: 'start',
      text: 'first',
      x: 0,
      y: 0,
      refsHandler: expect.any(Function),
    });
  });

  it('should have correct layout', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <Legend
          {...defaultProps}
        />
      </PluginHost>
    ));
    expect(addNodes).toHaveBeenCalledTimes(1);

    const LegendRootLayout = addNodes.mock.calls[0][0];
    expect(LegendRootLayout.props.name).toEqual('legend-right');
    expect(LegendRootLayout.props.flexDirection).toEqual(0);
    expect(LegendRootLayout.props.flexWrap).toEqual(1);
    expect(LegendRootLayout.props.justifyContent).toEqual(0);
    expect(LegendRootLayout.props.children).toHaveLength(1);

    const LegendItemLayout = LegendRootLayout.props.children[0];
    expect(LegendItemLayout.props.name).toEqual('first-legend-root-right');
    expect(LegendItemLayout.props.flexDirection).toEqual(2);
    expect(LegendItemLayout.props.alignItems).toEqual(2);
    expect(LegendItemLayout.props.children).toHaveLength(2);
  });

  it('should add node to default placeholder', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <Legend
          {...defaultProps}
        />
      </PluginHost>
    ));
    expect(addNodes.mock.calls[0][1]).toEqual('right');
  });

  it('should add node to correct placeholder', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Legend
          {...defaultProps}
          position="top"
        />
      </PluginHost>
    ));
    expect(addNodes.mock.calls[0][1]).toEqual('top');
  });
});
