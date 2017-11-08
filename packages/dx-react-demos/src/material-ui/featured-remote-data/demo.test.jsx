import React from 'react';
import { mount } from 'enzyme';
import Demo from './demo';

describe('MUI featured: remote data demo', () => {
  beforeEach(() => {
    window.fetch = jest.fn(() => Promise.resolve());
  });

  it('should work', () => {
    mount(<Demo />);
  });
});
