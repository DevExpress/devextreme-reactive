import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import Demo from './remote-filtering';

describe('BS3 filtering: remote-filtering', () => {
  let originalRaf;
  let originalFetch;
  configure({ adapter: new Adapter() });

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
    mount(
      <Demo />,
    );
  });
});
