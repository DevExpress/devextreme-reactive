import React from 'react';
import { mount } from 'enzyme';
import BasicDemo from './basic';

describe('BS3 column chooser: basic demo', () => {
  it('should work', () => {
    mount(
      <BasicDemo />,
    );
  });
});
