import React from 'react';
import { mount } from 'enzyme';
import Demo from './template-overriding';

it('should work', () => {
  expect(() => { mount(<Demo />); })
    .not.toThrow();
});
