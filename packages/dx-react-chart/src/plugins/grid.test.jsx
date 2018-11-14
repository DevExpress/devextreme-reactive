import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { getGridCoordinates } from '@devexpress/dx-chart-core';
import { Grid } from './grid';

jest.mock('@devexpress/dx-chart-core', () => ({
  getGridCoordinates: jest.fn(),
}));

describe('Grid', () => {
  getGridCoordinates.mockReturnValue([{
    key: '1',
    x: 11,
    y: 12,
    dx: 0.1,
    dy: 0.2,
  },
  {
    key: '2',
    x: 21,
    y: 22,
    dx: 0.3,
    dy: 0.4,
  }]);

  afterEach(jest.clearAllMocks);

  const LineComponent = () => null;

  const defaultDeps = {
    getter: {
      scales: {
        domain1: 'test-scale',
      },
      layouts: {
        pane: { width: 200, height: 300 },
      },
    },
    template: {
      series: {},
    },
  };

  const defaultProps = {
    name: 'domain1',
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
      x1: 11,
      x2: 31,
      y1: 12,
      y2: 72,
      styles: 'styles',
    });
    expect(tree.find(LineComponent).get(1).props).toEqual({
      x1: 21,
      x2: 81,
      y1: 22,
      y2: 142,
      styles: 'styles',
    });
    expect(getGridCoordinates).toBeCalledWith({ name: 'domain1', scale: 'test-scale' });
  });
});
