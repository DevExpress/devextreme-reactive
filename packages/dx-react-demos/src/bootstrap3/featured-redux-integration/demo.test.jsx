import React from 'react';
import { mount } from 'enzyme';
import Demo from './demo';

describe('BS3 featured: redux integration demo', () => {
  it('should work', () => {
    mount(<Demo />);
  });
});
