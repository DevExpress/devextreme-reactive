import React from 'react';
import { mount } from 'enzyme';
import LocalGroupingCustom from './local-grouping-custom';

describe('BS3: grouping with custom', () => {
  it('should work', () => {
    mount(
      <LocalGroupingCustom />,
    );
  });
});
