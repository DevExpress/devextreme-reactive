import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import EditRowControlledDemo from './edit-row-controlled';

describe('BS3: edit row controlled demo', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <EditRowControlledDemo />,
    );
  });
});
