import React from 'react';
import { mount } from 'enzyme';
import Demo from './uncontrolled';

describe('BS4 column reordering: uncontrolled demo', () => {
  it('should work', () => {
    mount(<Demo />);
  });
});
