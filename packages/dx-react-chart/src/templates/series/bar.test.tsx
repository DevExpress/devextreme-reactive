import * as React from 'react';
import { shallow } from 'enzyme';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';
import { withAnimation } from '../../utils/with-animation';
import {
  dBar, adjustBarSize, processBarAnimation, isValuesChanged, getPointStart,
} from '@devexpress/dx-chart-core';
import { Bar } from './bar';

jest.mock('@devexpress/dx-chart-core', () => ({
  dBar: jest.fn().mockReturnValue({ attributes: 'test-attributes' }),
  HOVERED: 'test_hovered',
  SELECTED: 'test_selected',
  getVisibility: jest.fn().mockReturnValue('visible'),
  adjustBarSize: jest.fn(value => value),
  isValuesChanged: jest.fn(),
  getPointStart: jest.fn(),
  processBarAnimation: jest.fn(),
}));

jest.mock('../../utils/with-states', () => ({
  withStates: jest.fn().mockReturnValue(x => x),
}));
jest.mock('../../utils/with-pattern', () => ({
  withPattern: jest.fn().mockReturnValue(x => x),
}));
jest.mock('../../utils/with-animation', () => ({
  withAnimation: jest.fn().mockReturnValue(x => x),
}));

describe('Bar', () => {
  const defaultProps = {
    argument: 'arg',
    value: 15,
    seriesIndex: 1,
    index: 2,
    arg: 1,
    barWidth: 2,
    maxBarWidth: 20,
    val: 2,
    startVal: 18,
    color: 'color',
    rotated: true,
    style: { tag: 'test-style' },
    scales: { tag: 'test-scales' } as any,
    pane: { width: 100, height: 200 },
  };

  afterEach(() => {
    (dBar as jest.Mock).mockClear();
  });

  it('should render bar', () => {
    const tree = shallow((
      <Bar {...defaultProps} />
    ));

    expect(tree.find('rect').props()).toEqual({
      attributes: 'test-attributes',
      fill: 'color',
      style: { tag: 'test-style' },
      visibility: 'visible',
    });
    expect(adjustBarSize)
    .toBeCalledWith({ attributes: 'test-attributes' }, { width: 100, height: 200 });
    expect(dBar).toBeCalledWith(1, 2, 18, 40, true);
  });

  it('should pass rest properties', () => {
    const tree = shallow((
      <Bar {...defaultProps} custom={10} />
    ));

    const { custom } = tree.find('rect').props() as any;
    expect(custom).toEqual(10);
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
      .toEqual('series-1-point-2-color-undefined-hover');
    expect((withPattern as jest.Mock).mock.calls[1][0]({ seriesIndex: 2, index: 3 }))
      .toEqual('series-2-point-3-color-undefined-selection');
  });

  it('should animate', () => {
    expect(withAnimation)
    .toBeCalledWith(processBarAnimation, expect.any(Function), getPointStart, isValuesChanged);
  });

  it('should update props', () => {
    const tree = shallow((
      <Bar {...defaultProps} />
    ));

    tree.setProps({ ...defaultProps, arg: 3, val: 4 });

    expect(dBar).toBeCalledWith(3, 4, 18, 40, true);
  });
});
