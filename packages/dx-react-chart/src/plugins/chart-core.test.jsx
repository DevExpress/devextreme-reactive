import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { argumentAxisName } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents, getComputedState } from '../../../dx-react-grid/src/plugins/test-utils';
import { ChartCore } from './chart-core';

jest.mock('@devexpress/dx-chart-core', () => ({
  argumentAxisName: jest.fn(),
}));
const RootComponent = () => null;

const defaultProps = {
  data: [{ arg: 1, val: 2 }],
  axes: [{}],
  series: [{}],
  width: 20,
  height: 30,
  rootComponent: RootComponent,
};

describe('Chart Core', () => {
  beforeEach(() => {
    argumentAxisName.mockImplementation(() => 'axisName');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide options', () => {
    const tree = mount((
      <PluginHost>
        <ChartCore
          {...defaultProps}
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));
    expect(getComputedState(tree)).toEqual({
      argumentAxisName: 'axisName',
      axes: defaultProps.axes,
      series: defaultProps.series,
      data: defaultProps.data,
    });
  });

  it('should render root template', () => {
    const tree = mount((
      <PluginHost>
        <ChartCore
          {...defaultProps}
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));
    const { width, height, children } = tree.find(RootComponent).props();
    expect(width).toBe(20);
    expect(height).toBe(30);
    expect(children).toEqual(expect.any(Object));
  });
});
