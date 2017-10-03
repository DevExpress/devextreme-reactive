import React from 'react';
import { mount } from 'enzyme';
import Demo from './basic';

describe('BS3 basic demo', () => {
  it('should work', () => {
    mount(
      <Demo />,
    );
  });
});
