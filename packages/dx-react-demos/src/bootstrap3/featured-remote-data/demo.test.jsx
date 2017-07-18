import React from 'react';
import { mount } from 'enzyme';
import RemoteDataDemo from './demo';

describe('BS3 featured: remote data demo', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve());
  });

  it('should work', () => {
    mount(
      <RemoteDataDemo />,
    );
  });
});
