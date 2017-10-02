import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import LocalGroupingCustomAdvanced from './local-grouping-custom-advanced';

describe('BS3: grouping with custom advanced', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <LocalGroupingCustomAdvanced />,
    );
  });
});
