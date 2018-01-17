import React from 'react';
import { mount } from 'enzyme';
import Demo from './parameterized-action';

it('should work', () => {
  expect(() => { mount(<Demo />); })
    .not.toThrow();
});
