import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pieAttributes, findSeriesByName } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { PieSeries } from './pie-series';

const PointComponent = () => null;

jest.mock('@devexpress/dx-chart-core', () => ({
  pieAttributes: jest.fn(),
  findSeriesByName: jest.fn(),
  seriesData: jest.fn(),
}));

pieAttributes.mockImplementation(() => [
  { d: 'M11 11', value: 'value1' },
  { d: 'M22 22', value: 'value2' },
  { d: 'M33 33', value: 'value3' },
]);
findSeriesByName.mockImplementation(() => ({
  stack: 'stack',
}));

describe('Pie series', () => {
  const defaultDeps = {
    getter: {
      layouts: { pane: { width: 200, height: 100 } },
    },
    template: {
      series: {},
    },
  };

  const defaultProps = {
    pointComponent: PointComponent,
    name: 'val1',
    styles: 'styles',
    valueField: 'valueField',
    argumentField: 'argumentField',
  };

  it('should render points', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <PieSeries
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(PointComponent).get(0).props).toEqual({
      d: 'M11 11',
      x: 100,
      y: 50,
      value: 'value1',
      styles: 'styles',
    });
    expect(tree.find(PointComponent).get(1).props).toEqual({
      d: 'M22 22',
      x: 100,
      y: 50,
      value: 'value2',
      styles: 'styles',
    });
    expect(tree.find(PointComponent).get(2).props).toEqual({
      d: 'M33 33',
      x: 100,
      y: 50,
      value: 'value3',
      styles: 'styles',
    });
  });
});
