import React from 'react';
import { mount } from 'enzyme';
import Demo from './value-getter';

it('should work', () => {
  expect(() => { mount(<Demo />); })
    .not.toThrow();
});
