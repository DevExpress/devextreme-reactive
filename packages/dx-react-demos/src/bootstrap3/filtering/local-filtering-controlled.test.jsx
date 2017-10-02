import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import Demo from './local-filtering-controlled';

describe('BS3 filtering: controlled local filtering', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <Demo />,
    );
  });
});
