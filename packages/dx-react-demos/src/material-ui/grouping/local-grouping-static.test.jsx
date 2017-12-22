import React from 'react';
import { mount } from 'enzyme';
import Demo from './local-grouping-static';

describe('BS3: integrated-grouping-static', () => {
  it('should work', () => {
    mount(<Demo />);
  });
});
