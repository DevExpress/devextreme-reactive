import React from 'react';
import { mount } from 'enzyme';
import { mockRaf } from '@devexpress/dx-testing';
import Demo from './seamless-immutable';

describe('MUI: seamless-immutable demo', () => {
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
