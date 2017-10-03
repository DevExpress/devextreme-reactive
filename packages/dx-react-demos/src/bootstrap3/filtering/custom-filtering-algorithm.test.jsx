import React from 'react';
import { mount } from 'enzyme';
import CustomFilteringAlgorithmDemo from './custom-filtering-algorithm';

describe('BS3: custom filtering algorithm demo', () => {
  it('should work', () => {
    mount(
      <CustomFilteringAlgorithmDemo />,
    );
  });
});
