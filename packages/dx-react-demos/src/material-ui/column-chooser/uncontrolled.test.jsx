import React from 'react';
import { mount } from 'enzyme';
import Demo from './uncontrolled';

describe('MUI column chooser: uncontrolled demo', () => {
  it('should work', () => {
    mount(<Demo />);
  });
});
