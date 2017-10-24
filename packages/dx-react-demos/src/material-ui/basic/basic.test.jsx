import React from 'react';
import { mount } from 'enzyme';
import Demo from './basic';

describe('MUI basic demo', () => {
  it('should work', () => {
    mount(<Demo />);
  });
});
