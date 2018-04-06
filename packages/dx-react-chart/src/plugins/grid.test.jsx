import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { createScale } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '../../../dx-testing/test-utils';
import { Grid } from './grid';

jest.mock('@devexpress/dx-chart-core', () => ({
  createScale: jest.fn(),
}));

describe('Grid', () => {
  // eslint-disable-next-line react/prop-types
  const RootComponent = ({ children }) => <div>{children}</div>;
  const LineComponent = () => null;

  const defaultDeps = {
    getter: {
      domains: { name: { orientation: 'horizontal' } },
      layouts: {
        'center-center': {
          x: 1, y: 2, width: 200, height: 100,
        },
      },
    },
    template: {
      canvas: {},
    },
  };
  const defaultProps = {
    name: 'name',
    rootComponent: RootComponent,
    lineComponent: LineComponent,
  };

  beforeEach(() => {
    const ticks = [1, 2];
    const scale = jest.fn(value => value);
    scale.ticks = jest.fn(() => ticks);
    createScale.mockImplementation(() => scale);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render root component', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Grid
          {...defaultProps}
        />
      </PluginHost>
    ));

    const { x, y } = tree.find(RootComponent).props();
    expect(x).toBe(1);
    expect(y).toBe(2);
  });

  it('should render ticks', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Grid
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(LineComponent).get(0).props).toEqual({
      t: true,
      x1: 1,
      x2: 1,
      y1: 0,
      y2: 100,
    });

    expect(tree.find(LineComponent).get(1).props).toEqual({
      t: true,
      x1: 2,
      x2: 2,
      y1: 0,
      y2: 100,
    });
  });

  it('should render ticks, orientation vertical', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, {
          getter: { domains: { name: { orientation: 'vertical' } } },
        })}
        <Grid
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(LineComponent).get(0).props).toEqual({
      t: true,
      x1: 0,
      x2: 200,
      y1: 1,
      y2: 1,
    });

    expect(tree.find(LineComponent).get(1).props).toEqual({
      t: true,
      x1: 0,
      x2: 200,
      y1: 2,
      y2: 2,
    });
  });
});
