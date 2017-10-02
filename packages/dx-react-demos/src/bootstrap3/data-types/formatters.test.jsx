import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import Demo from './formatters';

describe('BS3: custom editors demo', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <Demo />,
    );
  });
});
