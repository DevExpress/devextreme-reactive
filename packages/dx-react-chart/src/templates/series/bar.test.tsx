import * as React from 'react';
import { shallow } from 'enzyme';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';
import {
  dBar, adjustBarSize, getStartY, processBarAnimation, isValuesChanged,
  isScalesChanged,
} from '@devexpress/dx-chart-core';
import { Bar } from './bar';

jest.mock('@devexpress/dx-chart-core', () => ({
  dBar: jest.fn().mockReturnValue({ attributes: 'test-attributes' }),
  HOVERED: 'test_hovered',
  SELECTED: 'test_selected',
  getVisibility: jest.fn().mockReturnValue('visible'),
  adjustBarSize: jest.fn(value => value),
  isValuesChanged: jest.fn().mockReturnValue(true),
  getStartY: jest.fn().mockReturnValue('startY'),
  processBarAnimation: jest.fn(),
  isScalesChanged: jest.fn().mockReturnValue(false),
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
      .toEqual('series-1-point-2-hover');
    expect((withPattern as jest.Mock).mock.calls[1][0]({ seriesIndex: 2, index: 3 }))
      .toEqual('series-2-point-3-selection');
  });

  it('should update props', () => {
    const tree = shallow((
      <Bar {...defaultProps} />
    ));

    tree.setProps({ ...defaultProps, arg: 3, val: 4 });

    expect(dBar).toBeCalledWith(3, 4, 18, 40, true);
  });
});

describe('Animation', () => {
  const updateAnimation = jest.fn();
  const stopAnimation = jest.fn();
  const createAnimation = jest.fn().mockReturnValue({
    update: updateAnimation, stop: stopAnimation,
  });
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
    animation: createAnimation,
  };
  afterEach(jest.clearAllMocks);

  it('should start animation on mount', () => {
    shallow((
      <Bar
        {...defaultProps}
      />
    ));

    expect(getStartY).lastCalledWith({ tag: 'test-scales' });
    expect(createAnimation).lastCalledWith(
      { x: 1, y: 'startY', startY: 'startY' }, { x: 1, y: 2, startY: 18 },
      processBarAnimation, expect.any(Function),
    );
  });

  it('should start animation from previous values, update values', () => {
    const tree = shallow((
      <Bar
        {...defaultProps}
      />
    ));
    tree.setProps({ ...defaultProps, value: 3 });

    expect(isValuesChanged).lastCalledWith([1, 2, 18], [1, 2, 18]);
    expect(updateAnimation).lastCalledWith({ x: 1, y: 2, startY: 18 }, { x: 1, y: 2, startY: 18 });
  });

  it('should not start animation on resize/zoom', () => {
    isScalesChanged.mockReturnValueOnce(true);
    isValuesChanged.mockReturnValueOnce(false);
    const tree = shallow((
      <Bar
        {...defaultProps}
      />
    ));
    tree.setProps({ ...defaultProps, val: 3 });

    expect(isScalesChanged).toBeCalled();
    expect(updateAnimation).not.toBeCalled();
  });

  it('should call stop animation on unmount', () => {
    const tree = shallow((
      <Bar
        {...defaultProps}
      />
    ));
    tree.unmount();

    expect(stopAnimation).toBeCalled();
  });
});
