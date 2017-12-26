import React from 'react';
import { mount } from 'enzyme';
import Demo from './custom-sorting';

describe('BS3 sorting: custom local sorting demo', () => {
  it('should work', () => {
    mount(<Demo />);
  });
});
