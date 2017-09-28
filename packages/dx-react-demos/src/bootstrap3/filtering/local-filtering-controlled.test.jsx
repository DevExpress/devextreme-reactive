import React from 'react';
import { mount } from 'enzyme';
import Demo from './local-filtering-controlled';

describe('BS3 filtering: controlled local filtering', () => {
  it('should work', () => {
    mount(
      <Demo />,
    );
  });
});
