import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import Demo from './demo';

describe('BS3 featured: theming', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <Demo />,
    );
  });
});
