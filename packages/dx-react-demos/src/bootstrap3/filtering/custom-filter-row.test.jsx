import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import CustomFilterRowDemo from './custom-filter-row';

describe('BS3 filtering: custom filter row demo', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <CustomFilterRowDemo />,
    );
  });
});
