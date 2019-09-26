import * as React from 'react';
import { shallow } from 'enzyme';
import { dSymbol } from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { Point } from './point';

jest.mock('@devexpress/dx-chart-core', () => ({
  dSymbol: jest.fn().mockReturnValue('test-d-attribute'),
  getScatterAnimationStyle: 'test-animation-style',
  HOVERED: 'test_hovered',
  SELECTED: 'test_selected',
  getVisibility: jest.fn().mockReturnValue('visible'),
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
    getAnimatedStyle: jest.fn().mockReturnValue('animated-style'),
  };

  afterEach(() => {
    (dSymbol as jest.Mock).mockClear();
    defaultProps.getAnimatedStyle.mockClear();
  });

  it('should render point', () => {
    const tree = shallow((
      <Point {...(defaultProps as any)} />
    ));

    expect(tree.find('path').props()).toEqual({
      transform: 'translate(1 2)',
      d: 'test-d-attribute',
      fill: 'color',
      style: 'animated-style',
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
      style: 'animated-style',
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

  it('should apply animation style', () => {
    shallow((
      <Point {...(defaultProps as any)} />
    ));

    expect(defaultProps.getAnimatedStyle)
      .toBeCalledWith(defaultProps.style, 'test-animation-style', defaultProps.scales);
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
});
