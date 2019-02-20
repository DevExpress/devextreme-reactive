import * as React from 'react';
import { shallow } from 'enzyme';
import { dBar } from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';
import { Bar } from './bar';

jest.mock('@devexpress/dx-chart-core', () => ({
  dBar: jest.fn().mockReturnValue({ attributes: 'test-attributes' }),
  getAreaAnimationStyle: 'test-animation-style',
  HOVERED: 'test_hovered',
  SELECTED: 'test_selected',
}));

jest.mock('../../utils/with-states', () => ({
  withStates: jest.fn().mockReturnValue(x => x),
}));
jest.mock('../../utils/with-pattern', () => ({
  withPattern: jest.fn().mockReturnValue(x => x),
}));

describe('Bar', () => {
  const defaultProps = {
    argument: 'arg',
    value: 15,
    seriesIndex: 1,
    index: 2,
    x: 1,
    barWidth: 2,
    maxBarWidth: 20,
    y: 2,
    y1: 18,
    color: 'color',
    style: { tag: 'test-style' },
    scales: { tag: 'test-scales' },
    getAnimatedStyle: jest.fn().mockReturnValue('animated-style'),
  };

  afterEach(() => {
    (dBar as jest.Mock).mockClear();
    defaultProps.getAnimatedStyle.mockClear();
  });

  it('should render bar', () => {
    const tree = shallow((
      <Bar {...defaultProps} />
    ));

    expect(tree.find('rect').props()).toEqual({
      attributes: 'test-attributes',
      fill: 'color',
      style: 'animated-style',
    });
    expect(dBar).toBeCalledWith(defaultProps);
  });

  it('should pass rest properties', () => {
    const tree = shallow((
      <Bar {...defaultProps} custom={10} />
    ));

    const { custom } = tree.find('rect').props() as any;
    expect(custom).toEqual(10);
  });

  it('should apply animation style', () => {
    shallow((
      <Bar {...defaultProps} />
    ));

    expect(defaultProps.getAnimatedStyle)
      .toBeCalledWith(defaultProps.style, 'test-animation-style', defaultProps.scales);
  });

  it('should have hovered and selected states', () => {
    expect(withStates).toBeCalledWith({
      test_hovered: Bar,
      test_selected: Bar,
    });
  });

  it('should use patterns', () => {
    expect((withPattern as jest.Mock).mock.calls).toEqual([
      [expect.any(Function), { opacity: 0.75 }],
      [expect.any(Function), { opacity: 0.5 }],
    ]);
    expect((withPattern as jest.Mock).mock.calls[0][0]({ seriesIndex: 1, index: 2 }))
      .toEqual('series-1-point-2-hover');
    expect((withPattern as jest.Mock).mock.calls[1][0]({ seriesIndex: 2, index: 3 }))
      .toEqual('series-2-point-3-selection');
  });
});
