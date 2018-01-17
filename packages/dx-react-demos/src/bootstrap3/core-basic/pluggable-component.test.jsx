import React from 'react';
import { mount } from 'enzyme';
import Demo from './pluggable-component';

it('should work', () => {
  expect(() => { mount(<Demo />); })
    .not.toThrow();
});
