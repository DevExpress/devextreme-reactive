import React from 'react';
import { mount } from 'enzyme';
import Demo from './controlled';

describe('MUI column resizing: controlled demo', () => {
  it('should work', () => {
    mount(<Demo />);
  });
});
