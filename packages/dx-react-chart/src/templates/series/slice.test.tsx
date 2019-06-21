import * as React from 'react';
import { shallow } from 'enzyme';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';
import { Slice } from './slice';

jest.mock('@devexpress/dx-chart-core', () => ({
  dPie: jest.fn().mockReturnValue('test-d-attribute'),
  getPieAnimationStyle: 'test-animation-style',
  HOVERED: 'test_hovered',
  SELECTED: 'test_selected',
}));

jest.mock('../../utils/with-states', () => ({
  withStates: jest.fn().mockReturnValue(x => x),
}));
jest.mock('../../utils/with-pattern', () => ({
  withPattern: jest.fn().mockReturnValue(x => x),
}));

describe('Slice', () => {
  const defaultProps = {
    argument: 'arg',
    value: 15,
    seriesIndex: 1,
    index: 2,
    arg: 1,
    val: 2,
    maxRadius: 20,
    innerRadius: 2,
    outerRadius: 4,
    startAngle: 11,
    endAngle: 12,
    color: 'color',
    style: { tag: 'test-style' },
    scales: { tag: 'test-scales' },
    getAnimatedStyle: jest.fn().mockReturnValue('animated-style'),
  };

  it('should render slice', () => {
    const tree = shallow((
      <Slice {...(defaultProps as any)} />
    ));

    expect(tree.find('g').props().transform).toEqual('translate(1 2)');
    expect(tree.find('path').props()).toEqual({
      d: 'test-d-attribute',
      fill: 'color',
      stroke: 'none',
      style: 'animated-style',
    });
  });

  it('should pass rest properties', () => {
    const tree = shallow((
      <Slice {...(defaultProps as any)} custom={10} />
    ));
    const { custom } = tree.find('path').props() as any;

    expect(custom).toEqual(10);
  });

  it('should have hovered and selected states', () => {
    expect(withStates).toBeCalledWith({
      test_hovered: Slice,
      test_selected: Slice,
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
