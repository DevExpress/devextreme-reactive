import * as React from 'react';
import { shallow } from 'enzyme';
import { withStates } from '../../utils/with-states';
import { Path } from './path';
import { getStartCoordinates, processLineAnimation, isArrayValuesChanged } from '@devexpress/dx-chart-core';

jest.mock('@devexpress/dx-chart-core', () => ({
  HOVERED: 'test_hovered',
  SELECTED: 'test_selected',
  isArrayValuesChanged: jest.fn().mockReturnValue(true),
  getStartCoordinates: jest.fn().mockReturnValue('startCoordinates'),
  processLineAnimation: jest.fn(),
}));

jest.mock('../../utils/with-states', () => ({
  withStates: jest.fn().mockReturnValue(x => x),
}));

describe('Path', () => {
  const defaultProps = {
    path: jest.fn(value => value.join('-')),
    coordinates: [1, 2, 3],
    index: 1,
    color: 'red',
    scales: { tag: 'test-scales' },
    rotated: true,
    clipPathId: 'clipPathId',
    style: { tag: 'test-style' },
  };

  it('should render root element', () => {
    const tree = shallow((
      <Path
        {...defaultProps}
      />
    ));

    expect(tree.find('path').props()).toEqual({
      d: '1-2-3',
      fill: 'none',
      strokeWidth: 2,
      stroke: 'red',
      clipPath: 'url(#clipPathId)',
      style: { tag: 'test-style' },
    });
    expect(defaultProps.path).toBeCalledWith(defaultProps.coordinates);
  });

  it('should apply custom styles if any', () => {
    const customStyle = {
      stroke: 'red',
      strokeWidth: '2px',
    };
    const tree = shallow((
      <Path
        {...defaultProps}
        style={customStyle}
      />
    ));
    const { style } = tree.find('path').props();

    expect(style).toEqual(customStyle);
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow((
      <Path {...defaultProps} customProperty />
    ));
    const { customProperty } = tree.find('path').props() as any;

    expect(customProperty).toBeTruthy();
  });

  it('should have hovered and selected states', () => {
    expect(withStates).toBeCalledWith({
      test_hovered: expect.any(Function),
      test_selected: expect.any(Function),
    });
    expect((withStates as jest.Mock).mock.calls[0][0].test_hovered({ a: 1, b: 2 }))
      .toEqual({ a: 1, b: 2, strokeWidth: 4 });
    expect((withStates as jest.Mock).mock.calls[0][0].test_selected({ a: 1, b: 2 }))
      .toEqual({ a: 1, b: 2, strokeWidth: 4 });
  });

  it('should update props', () => {
    const tree = shallow((
      <Path
        {...defaultProps}
      />
    ));

    tree.setProps({ ...defaultProps, coordinates: [4, 5, 6] });

    expect(tree.find('path').props()).toEqual({
      d: '4-5-6',
      fill: 'none',
      strokeWidth: 2,
      stroke: 'red',
      clipPath: 'url(#clipPathId)',
      style: { tag: 'test-style' },
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
    path: jest.fn(value => value.join('-')),
    coordinates: [1, 2, 3],
    index: 1,
    color: 'red',
    scales: { tag: 'test-scales' },
    rotated: true,
    clipPathId: 'clipPathId',
    style: { tag: 'test-style' },
    animation: createAnimation,
  };
  afterEach(jest.clearAllMocks);

  it('should start animation on mount', () => {
    shallow((
      <Path
        {...defaultProps}
      />
    ));

    expect(getStartCoordinates).lastCalledWith({ tag: 'test-scales' }, [1, 2, 3]);
    expect(createAnimation).toBeCalledWith(
      'startCoordinates', [1, 2, 3], processLineAnimation, expect.any(Function),
    );
  });

  it('should start animation from previous values, update values', () => {
    const tree = shallow((
      <Path
        {...defaultProps}
      />
    ));
    tree.setProps({ ...defaultProps, coordinates: [4, 5, 6] });

    expect(isArrayValuesChanged).lastCalledWith([1, 2, 3], [4, 5, 6], 'argument', 'value');
    expect(updateAnimation).lastCalledWith([1, 2, 3], [4, 5, 6]);
  });

  it('should not start animation on change coordinates', () => {
    isArrayValuesChanged.mockReturnValueOnce(false).mockReturnValueOnce(true);
    const tree = shallow((
      <Path
        {...defaultProps}
      />
    ));
    tree.setProps({ ...defaultProps, coordinates: [4, 5, 6] });

    expect(isArrayValuesChanged.mock.calls[1]).toEqual([[1, 2, 3], [4, 5, 6], 'arg', 'val']);
  });

  it('should start animation from start position, count of values are different', () => {
    const tree = shallow((
      <Path
        {...defaultProps}
      />
    ));
    tree.setProps({ ...defaultProps, coordinates: [1, 2, 3, 4] });

    expect(getStartCoordinates).lastCalledWith({ tag: 'test-scales' }, [1, 2, 3, 4]);
    expect(updateAnimation).lastCalledWith('startCoordinates', [1, 2, 3, 4]);
  });

  it('should call stop animation on unmount', () => {
    const tree = shallow((
      <Path
        {...defaultProps}
      />
    ));
    tree.unmount();

    expect(stopAnimation).toBeCalled();
  });
});
