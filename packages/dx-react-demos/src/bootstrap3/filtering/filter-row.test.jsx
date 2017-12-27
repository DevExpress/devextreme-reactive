import React from 'react';
import { mount } from 'enzyme';
import Demo from './filter-row';

describe('BS3 filtering: local filter row', () => {
  it('should work', () => {
    mount(<Demo />);
  });
});
