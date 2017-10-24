import React from 'react';
import { mount } from 'enzyme';
import Demo from './remote-grouping-with-local-expanding';

describe('BS3: remote-grouping-with-local-expanding', () => {
  let originalRaf;
  let originalFetch;

  beforeEach(() => {
    originalRaf = window.requestAnimationFrame;
    originalFetch = window.fetch;
    window.requestAnimationFrame = jest.fn();
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ data: [] }));
  });

  afterEach(() => {
    window.requestAnimationFrame = originalRaf;
    window.fetch = originalFetch;
  });

  it('should work', () => {
    mount(<Demo />);
  });
});
