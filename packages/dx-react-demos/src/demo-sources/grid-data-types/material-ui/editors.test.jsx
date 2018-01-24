import React from 'react';
import { mount } from 'enzyme';
import Demo from './editors';

describe('MUI: custom editors demo', () => {
  it('should work', () => {
    mount(<Demo />);
  });
});
