import React from 'react';
import { mount } from 'enzyme';
import Demo from './table-cell-template';

describe('BS3: table cell template demo', () => {
  it('should work', () => {
    mount(
      <Demo />,
    );
  });
});
