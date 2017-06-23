import React from 'react';
import { mount } from 'enzyme';
import { ControlledDemo } from './controlled';

describe('BS3 column reordering: controlled demo', () => {
  it('should work', () => {
    mount(
      <ControlledDemo />,
    );
  });
});
