import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import CustomDataAccessors from './custom-data-accessors';

describe('BS3: custom data accessors demo', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <CustomDataAccessors />,
    );
  });
});
