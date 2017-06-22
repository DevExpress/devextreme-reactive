import React from 'react';
import { mount } from 'enzyme';
import { VirtualScrollingDemo } from './virtual-scrolling';

describe('BS3 featured: virtual scrolling demo', () => {
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
    getRect.mockImplementation(() =>
      ({ top: 0, left: 0, width: 800, height: 600, right: 800, bottom: 600 }));

    mount(
      <VirtualScrollingDemo />,
    );
  });
});
