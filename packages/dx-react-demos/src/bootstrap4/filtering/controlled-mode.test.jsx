import React from 'react';
import { mount } from 'enzyme';
import Demo from './controlled-mode';

describe('BS4 filtering: controlled local filtering', () => {
  it('should work', () => {
    mount(<Demo />);
  });
});
