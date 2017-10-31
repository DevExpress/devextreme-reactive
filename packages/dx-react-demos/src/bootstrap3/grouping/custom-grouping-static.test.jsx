import React from 'react';
import { mount } from 'enzyme';
import Demo from './custom-grouping-static';

describe('BS3: custom-grouping-static', () => {
  it('should work', () => {
    mount(<Demo />);
  });
});
