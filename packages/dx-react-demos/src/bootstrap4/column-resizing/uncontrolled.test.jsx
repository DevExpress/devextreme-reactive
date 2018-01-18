import React from 'react';
import { mount } from 'enzyme';
import Demo from './uncontrolled';

describe('BS4 column resizing: uncontrolled demo', () => {
  it('should work', () => {
    mount(<Demo />);
  });
});
