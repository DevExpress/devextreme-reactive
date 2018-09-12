import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { Legend } from './legend';

const Label = () => null;
const Marker = () => null;
const Root = ({ children }) => children;
const Item = ({ children }) => children;

describe('Legend', () => {
  const colorDomain = jest.fn();
  beforeEach(() => {
    colorDomain.domain = jest.fn().mockReturnValue(['first']);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  const defaultDeps = {
    getter: {
      layouts: { pane: {} },
      series: [{ name: 'first', color: 'color', uniqueName: 'first' }],
      setBBox: jest.fn(),
      colorDomain,
    },
    template: {
      right: {},
    },
  };

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
      name: 'first',
      color: 'color',
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
      text: 'first',
    });
  });
});
