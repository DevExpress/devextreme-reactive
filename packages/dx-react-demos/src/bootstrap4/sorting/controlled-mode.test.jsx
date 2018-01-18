import React from 'react';
import { mount } from 'enzyme';
import Demo from './controlled-mode';

describe('BS4 sorting: custom local sorting demo', () => {
  it('should work', () => {
    mount(<Demo />);
  });
});
