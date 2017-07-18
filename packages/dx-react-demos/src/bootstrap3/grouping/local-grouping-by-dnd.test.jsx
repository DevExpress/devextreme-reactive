import React from 'react';
import { mount } from 'enzyme';
import LocalGroupingByDndDemo from './local-grouping-by-dnd';

describe('BS3: grouping by drag\'n\'drop', () => {
  it('should work', () => {
    mount(
      <LocalGroupingByDndDemo />,
    );
  });
});
