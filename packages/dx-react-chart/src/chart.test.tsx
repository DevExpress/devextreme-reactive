
import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { Chart } from './chart';
import { BasicData } from './plugins/basic-data';
import { ChartCore } from './plugins/chart-core';
import { LayoutManager } from './plugins/layout-manager';

jest.mock('./plugins/chart-core', () => ({
  ChartCore: () => null,
}));
const TestChildren = () => null;

describe('Chart', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

  const defaultProps: any = {
    data: 'test-data',
    palette: 'test-palette',
    rootComponent: () => null,
    rotated: 'test-rotated',
  };

  it('should render root children', () => {
    const tree = mount((
      <Chart
        {...defaultProps}
      >
        <TestChildren />
        <TestChildren />
        <TestChildren />
      </Chart>
    ));

    expect(tree.find(TestChildren))
      .toHaveLength(3);
  });

  it('should render basic content', () => {
    const tree = mount(<Chart {...defaultProps} />);

    expect(tree.find(BasicData).props()).toEqual({
      data: 'test-data',
      rotated: 'test-rotated',
    });
    expect(tree.find(ChartCore).props()).toEqual({});
  });

  it('should render layout manager', () => {
    const tree = mount(<Chart {...defaultProps} />);

    expect(tree.find(LayoutManager).exists())
      .toBeTruthy();
  });
});
