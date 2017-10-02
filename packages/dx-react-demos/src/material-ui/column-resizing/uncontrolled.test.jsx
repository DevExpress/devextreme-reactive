import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import UncontrolledDemo from './uncontrolled';

describe('MUI column resizing: uncontrolled demo', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <UncontrolledDemo />,
    );
  });
});
