import React from 'react';
import { mount } from 'enzyme';
import { UncontrolledDemo } from './uncontrolled';

describe('BS3 column reordering: uncontrolled demo', () => {
  test('should work', () => {
    mount(
      <UncontrolledDemo />,
    );
  });
});
