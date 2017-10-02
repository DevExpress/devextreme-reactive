import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import Demo from './basic';

describe('BS3 basic demo', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <Demo />,
    );
  });
});
