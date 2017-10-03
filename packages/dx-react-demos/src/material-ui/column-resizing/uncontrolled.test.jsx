import React from 'react';
import { mount } from 'enzyme';
import UncontrolledDemo from './uncontrolled';

describe('MUI column resizing: uncontrolled demo', () => {
  it('should work', () => {
    mount(
      <UncontrolledDemo />,
    );
  });
});
