import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import ControlledModeDemo from './demo';

describe('BS3 featured: uncontrolled mode demo', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <ControlledModeDemo />,
    );
  });
});
