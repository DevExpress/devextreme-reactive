import React from 'react';
import { mount } from 'enzyme';
import Demo from './basic';

describe('BS4 localization demo', () => {
  it('should work', () => {
    mount(<Demo />);
  });
});
