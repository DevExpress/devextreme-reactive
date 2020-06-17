// import * as React from 'react';
import { MouseStrategy } from './mouse-strategy';

describe('MouseStrategy', () => {
  const startPoint = { clientX: 0, clientY: 0 };
  const defaultEvent = { clientX: 100, clientY: 100, preventDefault: jest.fn() };
  const { elementFromPoint } = document;
  const { getComputedStyle } = window;
  let delegate;

  beforeEach(() => {
    delegate = {
      onStart: jest.fn(),
      onMove: jest.fn(),
      onEnd: jest.fn(),
    };
  });
  afterEach(() => {
    document.elementFromPoint = elementFromPoint;
    window.getComputedStyle = getComputedStyle;
  });

  it('"move" should work', () => {
    document.elementFromPoint = jest.fn().mockImplementation(() => 'Element');
    window.getComputedStyle = jest.fn().mockImplementation(() => ({ style: { cursor: '' } }));

    const mouse = new MouseStrategy(delegate);
    mouse.start(startPoint);

    expect(() => mouse.move(defaultEvent))
      .not.toThrow();
    expect(document.elementFromPoint).toHaveBeenCalled();
    expect(window.getComputedStyle).toHaveBeenCalled();
  });

  it('"move" should work if element is null', () => {
    document.elementFromPoint = jest.fn().mockImplementation(() => null);
    window.getComputedStyle = jest.fn().mockImplementation(getComputedStyle);

    const mouse = new MouseStrategy(delegate);
    mouse.start(startPoint);

    expect(() => mouse.move(defaultEvent))
      .not.toThrow();
    expect(document.elementFromPoint).toHaveBeenCalled();
    expect(window.getComputedStyle).not.toHaveBeenCalled();
  });
});
