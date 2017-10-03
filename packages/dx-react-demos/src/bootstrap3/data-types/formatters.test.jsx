import React from 'react';
import { mount } from 'enzyme';
import Demo from './formatters';

describe('BS3: custom editors demo', () => {
  it('should work', () => {
    mount(
      <Demo />,
    );
  });
});
