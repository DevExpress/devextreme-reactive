import React from 'react';
import { mount } from 'enzyme';
import Demo from './value-setters';

describe('BS3: custom data accessors demo', () => {
  it('should work', () => {
    mount(<Demo />);
  });
});
