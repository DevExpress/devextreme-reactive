import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import LocalGroupingCustom from './local-grouping-custom';

describe('BS3: grouping with custom', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <LocalGroupingCustom />,
    );
  });
});
