
import * as React from 'react';
import { create } from 'react-test-renderer';
import { setupConsole } from '@devexpress/dx-testing';
import { Chart } from './chart';
import { BasicData } from './plugins/basic-data';
import { ChartCore } from './plugins/chart-core';
import { LayoutManager } from './plugins/layout-manager';
import { ControllerComponent } from './plugins/controller-component';

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
    const tree = create((
      <Chart
        {...defaultProps}
      >
        <TestChildren />
        <TestChildren />
        <TestChildren />
      </Chart>
    ));

    expect(tree.root.findAllByType(TestChildren))
      .toHaveLength(3);
  });

  it('should render basic content', () => {
    const tree = create(<Chart {...defaultProps} />);

    expect(tree.root.findByType(BasicData).props).toEqual({
      data: 'test-data',
      rotated: 'test-rotated',
    });
    expect(tree.root.findByType(ChartCore).props).toEqual({});
  });

  it('should render layout manager', () => {
    const tree = create(<Chart {...defaultProps} />);

    expect(tree.root.findByType(LayoutManager)).not.toBeNull();
  });

  it('should add controller component', () => {
    const tree = create(<Chart {...defaultProps} />);
    expect(tree.root.findByType(ControllerComponent)).not.toBeNull();
  });
});
