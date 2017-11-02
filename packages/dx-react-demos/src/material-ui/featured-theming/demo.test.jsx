import React from 'react';
import { mount } from 'enzyme';
import { mockRaf } from '@devexpress/dx-testing';
import Demo from './demo';

describe('MUI featured: theming demo', () => {
  let resetRaf;
  beforeAll(() => {
    resetRaf = mockRaf();
  });
  afterAll(() => {
    resetRaf();
  });

  it('should work', () => {
    mount(<Demo />);
  });
});
