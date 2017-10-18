import React from 'react';
import { mount } from 'enzyme';
import Demo from './basic';

describe('BS3 virtual-scrolling: basic SSR', () => {
  let getRect;
  let originalRaf;

  beforeEach(() => {
    getRect = jest.spyOn(Element.prototype, 'getBoundingClientRect');
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
