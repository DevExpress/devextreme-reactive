import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import ControlledDemo from './controlled';

describe('MUI column resizing: controlled demo', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <ControlledDemo />,
    );
  });
});
