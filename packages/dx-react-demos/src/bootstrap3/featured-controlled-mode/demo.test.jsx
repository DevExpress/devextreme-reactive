import React from 'react';
import { mount } from 'enzyme';
import ControlledModeDemo from './demo';

describe('BS3 featured: uncontrolled mode demo', () => {
  it('should work', () => {
    mount(
      <ControlledModeDemo />,
    );
  });
});
