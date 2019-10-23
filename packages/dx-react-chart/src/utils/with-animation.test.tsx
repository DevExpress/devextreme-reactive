import * as React from 'react';
import { mount } from 'enzyme';
import { withAnimation } from './with-animation';
import { isScalesChanged } from '@devexpress/dx-chart-core';

jest.mock('@devexpress/dx-chart-core', () => ({
  isScalesChanged: jest.fn().mockReturnValue(false),
}));

describe('#withAnimation', () => {
  const BaseComponent = () => null;
  const processAnimation = jest.fn();
  const getProps = jest.fn(value => ({ x: value.x, y: value.y }));
  const getStartCoordinates = jest.fn().mockReturnValue('startCoordinates');
  const isValuesChanged = jest.fn().mockReturnValue(true);
  const getDelay = jest.fn().mockReturnValue('delay');
  const TestComponent = withAnimation(
    processAnimation,
    getProps,
    getStartCoordinates,
    isValuesChanged,
    getDelay,
  )(BaseComponent);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render base element without animation', () => {
    const tree = mount(<TestComponent x={11} y={12} />);

    expect(tree.find(BaseComponent).props()).toEqual({ x: 11, y: 12 });
  });

  it('should update base element without animation', () => {
    const tree = mount(<TestComponent x={11} y={12} />);

    tree.setProps({ x: 19, y: 21 });
    expect(tree.find(BaseComponent).props()).toEqual({ x: 11, y: 12 });
  });

  it('should start animation on mount', () => {
    const animation = jest.fn();
    mount(<TestComponent x={11} y={12} animation={animation} />);

    expect(animation).toBeCalledWith(
      'startCoordinates', { x: 11, y: 12 }, processAnimation, expect.any(Function), 'delay',
    );
  });

  it('should update animation, values are changed', () => {
    const update = jest.fn();
    const animation = jest.fn().mockReturnValue({ update });
    const tree = mount(
    <TestComponent x={11} y={12} scales="scales" index={2} animation={animation} />,
    );

    tree.setProps({ x: 19, y: 21 });
    expect(update).toBeCalledWith(
      { x: 11, y: 12 }, { x: 19, y: 21 }, 'delay',
    );
    expect(isScalesChanged).toBeCalledWith('scales', 'scales');
    expect(getDelay).toBeCalledWith(2, false);
  });

  it('should not update animation, values are not changed', () => {
    isValuesChanged.mockReturnValue(false);
    const update = jest.fn();
    const animation = jest.fn().mockReturnValue({ update });
    const tree = mount(
    <TestComponent x={11} y={12} scales="scales" index={2} animation={animation} />,
    );

    tree.setProps({ x: 19, y: 21 });
    expect(update).toBeCalledTimes(0);
  });

  it('should not update animation, scales are changed', () => {
    isScalesChanged.mockReturnValue(true);
    const update = jest.fn();
    const animation = jest.fn().mockReturnValue({ update });
    const tree = mount(
    <TestComponent x={11} y={12} scales="scales" animation={animation} />,
    );
    tree.setProps({ x: 19, y: 21 });
    expect(isScalesChanged).toBeCalledWith('scales', 'scales');
    expect(isValuesChanged).toBeCalledTimes(0);
    expect(update).toBeCalledTimes(0);
  });

  it('should stop animation on unmount', () => {
    const stop = jest.fn();
    const animation = jest.fn().mockReturnValue({ stop });
    const tree = mount(
    <TestComponent x={11} y={12} animation={animation} />,
    );
    tree.unmount();
    expect(stop).toBeCalled();
  });

  it('should not render element if null state', () => {
    getProps.mockReturnValue(null);
    const animation = jest.fn();
    const tree = mount(
      <TestComponent x={11} y={12} animation={animation} />,
    );
    expect(tree.find(BaseComponent)).toEqual({});
  });
});
