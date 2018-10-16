import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { findSeriesByName } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { PieSeries } from './pie-series';
import { SliceCollection } from '../templates/series/slice-collection';

jest.mock('@devexpress/dx-chart-core', () => ({
  pieAttributes: jest.fn(),
  findSeriesByName: jest.fn(),
  addSeries: jest.fn(),
  ARGUMENT_DOMAIN: 'test_argument_domain',
  getValueDomainName: () => 'test_value_domain',
}));

describe('Pie series', () => {
  const PointComponent = () => null;

  const defaultProps = {
    valueField: 'valueField',
    argumentField: 'argumentField',
  };

  findSeriesByName.mockReturnValue({
    ...defaultProps,
    style: { opacity: 0.4 },
    seriesComponent: SliceCollection,
    pointComponent: PointComponent,
  });

  const defaultDeps = {
    getter: {
      layouts: { pane: { width: 200, height: 100 } },
      scales: {},
      getSeriesPoints: jest.fn().mockReturnValue([
        { value: 'value1', data: { argumentField: 'argument1' }, id: 'value1' },
        { value: 'value2', data: { argumentField: 'argument2' }, id: 'value2' },
        { value: 'value3', data: { argumentField: 'argument3' }, id: 'value3' },
      ]),
    },
    template: {
      series: {},
    },
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
        data: { argumentField: `argument${pointIndex}` },
        value: `value${pointIndex}`,
        style: { opacity: 0.4 },
        id: `value${pointIndex}`,
      });
    });
  });
});
