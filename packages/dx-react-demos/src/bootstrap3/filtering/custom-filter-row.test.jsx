import React from 'react';
import { mount } from 'enzyme';
import Demo from './custom-filter-row';

describe('BS3 filtering: custom filter row', () => {
  it('should work', () => {
    mount(
      <Demo />,
    );
  });
});
