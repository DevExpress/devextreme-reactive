import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { Legend } from './legend';

const Label = () => null;
const Marker = () => null;

describe('Legend', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  const defaultDeps = {
    getter: {
      layouts: { pane: {} },
      series: [{ name: 'first' }],
      setBBox: jest.fn(),
    },
    template: {
      right: {},
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
      refsHandler: expect.any(Function),
    });
  });
});
