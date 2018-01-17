import React from 'react';
import { mount } from 'enzyme';
import Demo from './template-placeholder';

it('should work', () => {
  expect(() => { mount(<Demo />); })
    .not.toThrow();
});
