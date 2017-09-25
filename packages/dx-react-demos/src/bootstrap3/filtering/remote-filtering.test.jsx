import React from 'react';
import { mount } from 'enzyme';
import Demo from './remote-filtering';

describe('BS3 filtering: remote-filtering', () => {
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ data: [] }));
  it('should work', () => {
    mount(
      <Demo />,
    );
  });
});
