import React from 'react';
import { mount } from 'enzyme';
import Demo from './basic';

describe('MUI virtual-scrolling: basic', () => {
  let getRect;
  let originalRaf;

  beforeEach(() => {
    getRect = jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(() => ({
      top: 0,
      left: 0,
      width: 800,
      height: 600,
      right: 800,
      bottom: 600,
    }));
    originalRaf = window.requestAnimationFrame;
    window.requestAnimationFrame = jest.fn().mockImplementationOnce(callback => callback());
  });

  afterEach(() => {
    getRect.mockRestore();
    window.requestAnimationFrame = originalRaf;
  });

  it('should work', () => {
    expect(() => { mount(<Demo />); })
      .not.toThrow();
  });
});
