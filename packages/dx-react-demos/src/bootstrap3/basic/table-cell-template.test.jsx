import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import Demo from './table-cell-template';

describe('BS3: table cell template demo', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <Demo />,
    );
  });
});
