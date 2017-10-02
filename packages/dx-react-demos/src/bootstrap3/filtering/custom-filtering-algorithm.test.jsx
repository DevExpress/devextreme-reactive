import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import CustomFilteringAlgorithmDemo from './custom-filtering-algorithm';

describe('BS3: custom filtering algorithm demo', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <CustomFilteringAlgorithmDemo />,
    );
  });
});
