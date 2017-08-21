import React from 'react';
import { mount } from 'enzyme';
import CustomDataAccessors from './custom-data-accessors';

describe('BS3: custom data accessors demo', () => {
  it('should work', () => {
    mount(
      <CustomDataAccessors />,
    );
  });
});
