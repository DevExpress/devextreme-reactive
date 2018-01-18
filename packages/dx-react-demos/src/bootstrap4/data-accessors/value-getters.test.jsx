import React from 'react';
import { mount } from 'enzyme';
import Demo from './value-getters';

describe('BS4: custom data accessors in columns demo', () => {
  it('should work', () => {
    mount(<Demo />);
  });
});
