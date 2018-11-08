import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { axisCoordinates } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { Grid } from './grid';

jest.mock('@devexpress/dx-chart-core', () => ({
  axisCoordinates: jest.fn(),
  ARGUMENT_DOMAIN: 'test_argument_domain',
  LEFT: 'left',
  TOP: 'top',
}));

describe('Grid', () => {
  axisCoordinates.mockReturnValue([{
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
  }]);

  const ticks = [1, 2];
  const scale = jest.fn(value => value);
  scale.ticks = jest.fn(() => ticks);

  afterEach(jest.clearAllMocks);

  const LineComponent = () => null;

  const defaultDeps = {
    getter: {
      scales: {
        test_argument_domain: jest.fn(),
        other_domain: jest.fn(),
      },
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
    name: 'test_argument_domain',
    lineComponent: LineComponent,
    styles: 'styles',
  };

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
        {pluginDepsToComponents(defaultDeps)}
        <Grid
          {...defaultProps}
          name="other_domain"
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
