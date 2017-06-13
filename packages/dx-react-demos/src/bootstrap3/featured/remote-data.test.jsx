import React from 'react';
import { mount } from 'enzyme';
import { RemoteDataDemo } from './remote-data';

describe('BS3 featured: remote data demo', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve());
  });

  test('should work', () => {
    mount(
      <RemoteDataDemo />,
    );
  });
});
