import React from 'react';
import { mount } from 'enzyme';
import { mockRaf } from '@devexpress/dx-testing';
import Demo from './local-custom-sorting';

describe('MUI sorting: custom local sorting demo', () => {
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
