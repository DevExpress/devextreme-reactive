import React from 'react';
import { mount } from 'enzyme';
import LocalGroupingCustomAdvanced from './local-grouping-custom-advanced';

describe('BS3: grouping with custom advanced', () => {
  it('should work', () => {
    mount(
      <LocalGroupingCustomAdvanced />,
    );
  });
});
