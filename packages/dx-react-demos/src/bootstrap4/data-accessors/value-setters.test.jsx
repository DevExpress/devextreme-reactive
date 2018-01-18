import React from 'react';
import { mount } from 'enzyme';
import Demo from './value-setters';

describe('BS4: custom data accessors demo', () => {
  it('should work', () => {
    mount(<Demo />);
  });
});
