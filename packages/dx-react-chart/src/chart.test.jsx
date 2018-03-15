
import * as React from 'react';
import { shallow } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { Chart } from './chart';
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

  const defaultProps = {
    data: [],
    rootComponent: () => null,
  };

  it('should render root children', () => {
    const tree = shallow((
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

  it('should render chart core', () => {
    const tree = shallow((<Chart {...defaultProps} />));

    expect(tree.find(ChartCore).exists())
      .toBeTruthy();
  });

  it('should render layout manager', () => {
    const tree = shallow((<Chart {...defaultProps} />));

    expect(tree.find(LayoutManager).exists())
      .toBeTruthy();
  });
});
