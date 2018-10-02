import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { axisCoordinates } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { Grid } from './grid';

jest.mock('@devexpress/dx-chart-core', () => ({
  ...require.requireActual('@devexpress/dx-chart-core'),
  axisCoordinates: jest.fn(),
}));

describe('Grid', () => {
  beforeEach(() => {
    axisCoordinates.mockImplementation(() => ({
      ticks: [{
        text: 'text1',
        x1: 1,
        x2: 1,
        y1: 0,
        y2: 100,
        key: '1',
      },
      {
        text: 'text2',
        x1: 11,
        x2: 11,
        y1: 33,
        y2: 44,
        key: '2',
      }],
    }));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  // eslint-disable-next-line react/prop-types
  const LineComponent = () => null;

  const defaultDeps = {
    getter: {
      domains: { name: { orientation: 'horizontal', type: 'type' } },
      scales: { name: jest.fn() },
      layouts: {
        pane: {
          x: 1, y: 2, width: 200, height: 300,
        },
      },
    },
    template: {
      series: {},
    },
  };
  const defaultProps = {
    name: 'name',
    lineComponent: LineComponent,
    styles: 'styles',
  };

  beforeEach(() => {
    const ticks = [1, 2];
    const scale = jest.fn(value => value);
    scale.ticks = jest.fn(() => ticks);
  });
  afterEach(() => {
    jest.resetAllMocks();
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
      styles: 'styles',
      x1: 1,
      x2: 1,
      y1: 300,
      y2: 100,
    });

    expect(tree.find(LineComponent).get(1).props).toEqual({
      styles: 'styles',
      x1: 11,
      x2: 11,
      y1: 300,
      y2: 44,
    });
  });

  it('should render ticks, orientation vertical', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, {
          getter: { domains: { name: { orientation: 'vertical', type: 'type' } } },
        })}
        <Grid
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(LineComponent).get(0).props).toEqual({
      styles: 'styles',
      x1: 200,
      x2: 1,
      y1: 0,
      y2: 100,
    });

    expect(tree.find(LineComponent).get(1).props).toEqual({
      styles: 'styles',
      x1: 200,
      x2: 11,
      y1: 33,
      y2: 44,
    });
  });
});
