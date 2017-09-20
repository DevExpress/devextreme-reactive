import React from 'react';
import { mount } from 'enzyme';
import CustomFilterRowDemo from './custom-filter-row';

describe('BS3: custom filter row demo', () => {
  it('should work', () => {
    mount(
      <CustomFilterRowDemo />,
    );
  });
});
