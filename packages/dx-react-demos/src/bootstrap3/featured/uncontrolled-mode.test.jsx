import React from 'react';
import { mount } from 'enzyme';
import { UncontrolledModeDemo } from './uncontrolled-mode';

describe('BS3 featured: uncontrolled mode demo', () => {
  test('should work', () => {
    mount(
      <UncontrolledModeDemo />,
    );
  });
});
