import React from 'react';
import { mount } from 'enzyme';
import { mockRaf } from '@devexpress/dx-testing';
import Demo from './demo';

describe('MUI featured: remote data demo', () => {
  let resetRaf;
  beforeAll(() => {
    resetRaf = mockRaf();
  });
  beforeEach(() => {
    window.fetch = jest.fn(() => Promise.resolve());
  });
  afterAll(() => {
    resetRaf();
  });

  it('should work', () => {
    mount(<Demo />);
  });
});
