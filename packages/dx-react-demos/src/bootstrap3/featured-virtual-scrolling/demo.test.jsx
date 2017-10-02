import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import VirtualScrollingDemo from './demo';

describe('BS3 featured: virtual scrolling demo', () => {
  let getRect;
  let originalRaf;
  configure({ adapter: new Adapter() });

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
