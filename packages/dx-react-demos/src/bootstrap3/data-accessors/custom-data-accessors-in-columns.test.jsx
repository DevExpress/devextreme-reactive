import React from 'react';
import { mount } from 'enzyme';
import CustomDataAccessorsInColumns from './custom-data-accessors-in-columns';

describe('BS3: custom data accessors in columns demo', () => {
  it('should work', () => {
    mount(
      <CustomDataAccessorsInColumns />,
    );
  });
});
