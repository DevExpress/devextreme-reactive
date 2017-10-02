import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import RemoteDataDemo from './demo';

describe('BS3 featured: remote data demo', () => {
  beforeEach(() => {
    window.fetch = jest.fn(() => Promise.resolve());
  });
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <RemoteDataDemo />,
    );
  });
});
