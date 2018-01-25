import React from 'react';
import { mount } from 'enzyme';
import Demo from './plugin-host-component';

it('should work', () => {
  expect(() => { mount(<Demo />); })
    .not.toThrow();
});
