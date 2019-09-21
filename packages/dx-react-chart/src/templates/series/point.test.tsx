import * as React from 'react';
import { shallow } from 'enzyme';
import { dSymbol, getStartY, processPointAnimation, isValuesChanged } from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { Point } from './point';

jest.mock('@devexpress/dx-chart-core', () => ({
  dSymbol: jest.fn().mockReturnValue('test-d-attribute'),
  HOVERED: 'test_hovered',
  SELECTED: 'test_selected',
  getVisibility: jest.fn().mockReturnValue('visible'),
  isValuesChanged: jest.fn().mockReturnValue(true),
  getStartY: jest.fn().mockReturnValue('startY'),
  processPointAnimation: jest.fn(),
}));

jest.mock('../../utils/with-states', () => ({
  withStates: jest.fn().mockReturnValue(x => x),
}));

describe('Point', () => {
  const defaultProps = {
    argument: 'arg',
    value: 15,
    seriesIndex: 1,
    index: 2,
    arg: 1,
    val: 2,
    point: { tag: 'test-options' },
    color: 'color',
    style: { tag: 'test-style' },
    scales: { tag: 'test-scales' },
  };

  afterEach(() => {
    (dSymbol as jest.Mock).mockClear();
  });

  it('should render point', () => {
    const tree = shallow((
      <Point {...(defaultProps as any)} />
    ));

    expect(tree.find('path').props()).toEqual({
      transform: 'translate(1 2)',
      d: 'test-d-attribute',
      fill: 'color',
      style: { tag: 'test-style' },
      stroke: 'none',
      visibility: 'visible',
    });
    expect(dSymbol).toBeCalledWith(defaultProps.point);
  });

  it('should render point / rotated', () => {
    const tree = shallow((
      <Point {...(defaultProps as any)} rotated={true} />
    ));

    expect(tree.find('path').props()).toEqual({
      transform: 'translate(2 1)',
      d: 'test-d-attribute',
      fill: 'color',
      style: { tag: 'test-style' },
      stroke: 'none',
      visibility: 'visible',
    });
    expect(dSymbol).toBeCalledWith(defaultProps.point);
  });

  it('should pass rest properties', () => {
    const tree = shallow((
      <Point {...(defaultProps as any)} custom={10} />
    ));
    const { custom } = tree.find('path').props() as any;

    expect(custom).toEqual(10);
  });

  it('should have hovered and selected states', () => {
    expect(withStates).toBeCalledWith({
      test_hovered: expect.any(Function),
      test_selected: expect.any(Function),
    });
    expect((withStates as jest.Mock).mock.calls[0][0].test_hovered({
      a: 1, b: 2, color: 'green', point: { size: 7 },
    })).toEqual({
      a: 1, b: 2, strokeWidth: 4, fill: 'none', stroke: 'green', point: { size: 12 },
    });
    expect((withStates as jest.Mock).mock.calls[0][0].test_selected({
      a: 1, b: 2, color: 'blue', point: { size: 9 },
    })).toEqual({
      a: 1, b: 2, strokeWidth: 4, fill: 'none', stroke: 'blue', point: { size: 15 },
    });
  });

  it('should update props', () => {
    const tree = shallow((
      <Point {...defaultProps} />
    ));

    tree.setProps({ ...defaultProps, arg: 3, val: 4 });

    expect(tree.find('path').props()).toEqual({
      transform: 'translate(3 4)',
      d: 'test-d-attribute',
      fill: 'color',
      style: { tag: 'test-style' },
      stroke: 'none',
      visibility: 'visible',
    });
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
    val: 2,
    point: { tag: 'test-options' },
    color: 'color',
    style: { tag: 'test-style' },
    scales: { tag: 'test-scales' },
    animation: createAnimation,
  };

  afterEach(jest.clearAllMocks);

  it('should start animation on mount', () => {
    shallow((
      <Point
        {...defaultProps}
      />
    ));

    expect(getStartY).lastCalledWith({ tag: 'test-scales' });
    expect(createAnimation).toBeCalledWith(
      { x: 1, y: 'startY' }, { x: 1, y: 2 },
      processPointAnimation, expect.any(Function),
    );
  });

  it('should start animation from previous values, update values', () => {
    const tree = shallow((
      <Point
        {...defaultProps}
      />
    ));
    tree.setProps({ ...defaultProps, value: 3, val: 10 });

    expect(isValuesChanged).lastCalledWith(['arg', 15], ['arg', 3]);
    expect(updateAnimation).lastCalledWith({ x: 1, y: 2 }, { x: 1, y: 10 });
  });

  it('should not start animation on change coordinates', () => {
    isValuesChanged.mockReturnValueOnce(false).mockReturnValueOnce(true);
    const tree = shallow((
      <Point
        {...defaultProps}
      />
    ));
    tree.setProps({ ...defaultProps, val: 10 });

    expect(isValuesChanged.mock.calls[1]).toEqual([[1, 2], [1, 10]]);
  });

  it('should call stop animation on unmount', () => {
    const tree = shallow((
      <Point
        {...defaultProps}
      />
    ));
    tree.unmount();

    expect(stopAnimation).toBeCalled();
  });
});
