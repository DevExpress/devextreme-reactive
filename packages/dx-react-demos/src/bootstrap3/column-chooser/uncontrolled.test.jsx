import React from 'react';
import { mount } from 'enzyme';
import Demo from './uncontrolled';

describe('BS3 column chooser: uncontrolled demo', () => {
  it('should work', () => {
    mount(<Demo />);
  });
});
