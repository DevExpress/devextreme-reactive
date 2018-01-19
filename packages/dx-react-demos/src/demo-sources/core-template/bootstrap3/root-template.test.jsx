import React from 'react';
import { mount } from 'enzyme';
import Demo from './root-template';

it('should work', () => {
  expect(() => { mount(<Demo />); })
    .not.toThrow();
});
