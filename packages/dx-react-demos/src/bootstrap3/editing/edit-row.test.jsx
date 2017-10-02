import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import EditRowDemo from './edit-row';

describe('BS3: edit row controlled demo', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <EditRowDemo />,
    );
  });
});
