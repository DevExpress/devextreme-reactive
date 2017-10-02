import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import LocalGroupingWithUI from './local-grouping-with-ui';

describe('BS3: grouping by drag\'n\'drop', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <LocalGroupingWithUI />,
    );
  });
});
