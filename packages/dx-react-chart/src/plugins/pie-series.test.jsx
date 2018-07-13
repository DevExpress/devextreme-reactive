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
  checkZeroStart: jest.fn(),
  xyScales: jest.fn(),
}));

pieAttributes.mockImplementation(() => [
  { value: 'value1', data: { argumentField: 'argument1', color: 'color1' }, id: 'value1' },
  { value: 'value2', data: { argumentField: 'argument2', color: 'color2' }, id: 'value2' },
  { value: 'value3', data: { argumentField: 'argument3', color: 'color3' }, id: 'value3' },
]);
findSeriesByName.mockImplementation(() => ({}));

describe('Pie series', () => {
  const defaultDeps = {
    getter: {
      layouts: { pane: { width: 200, height: 100 } },
      domains: {},
    },
    template: {
      series: {},
    },
  };

  const defaultProps = {
    pointComponent: PointComponent,
    style: { opacity: 0.4 },
    name: 'val1',
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

    tree.find(PointComponent).forEach((point, index) => {
      const pointIndex = index + 1;
      expect(point.props()).toEqual({
        data: { argumentField: `argument${pointIndex}`, color: `color${pointIndex}` },
        value: `value${pointIndex}`,
        color: `color${pointIndex}`,
        style: { opacity: 0.4 },
        id: `value${pointIndex}`,
      });
    });
  });
});
