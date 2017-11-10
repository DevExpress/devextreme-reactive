import React from 'react';
import { mount } from 'enzyme';
import Demo from './remote-filtering';

describe('MUI filtering: remote-filtering', () => {
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
