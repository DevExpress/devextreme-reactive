import React from 'react';
import { mount } from 'enzyme';
import Demo from './basic';

describe('MUI column chooser: basic demo', () => {
  it('should work', () => {
    mount(<Demo />);
  });
});
