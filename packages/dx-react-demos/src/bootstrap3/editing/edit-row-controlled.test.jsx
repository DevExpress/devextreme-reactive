import React from 'react';
import { mount } from 'enzyme';
import EditRowControlledDemo from './edit-row-controlled';

describe('MUI: edit row controlled demo', () => {
  it('should work', () => {
    mount(
      <EditRowControlledDemo />,
    );
  });
});
