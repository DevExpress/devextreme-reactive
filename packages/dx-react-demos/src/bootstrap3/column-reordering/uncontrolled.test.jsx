import React from 'react';
import { mount } from 'enzyme';
import UncontrolledDemo from './uncontrolled';

describe('BS3 column reordering: uncontrolled demo', () => {
  it('should work', () => {
    mount(
      <UncontrolledDemo />,
    );
  });
});
