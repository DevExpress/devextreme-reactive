import React from 'react';
import { mount } from 'enzyme';
import Demo from './integrated-filtering-controlled';

describe('MUI: local filtering controlled demo', () => {
  it('should work', () => {
    mount(<Demo />);
  });
});
