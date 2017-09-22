import React from 'react';
import { mount } from 'enzyme';
import Demo from './editors';

describe('BS3: data types formatting demo', () => {
  it('should work', () => {
    mount(
      <Demo />,
    );
  });
});
