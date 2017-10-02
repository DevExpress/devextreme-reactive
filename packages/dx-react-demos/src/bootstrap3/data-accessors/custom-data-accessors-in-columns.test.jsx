import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import CustomDataAccessorsInColumns from './custom-data-accessors-in-columns';

describe('BS3: custom data accessors in columns demo', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <CustomDataAccessorsInColumns />,
    );
  });
});
