import React from 'react';
import { mount } from 'enzyme';
import EditRowDemo from './edit-row';

describe('BS3: edit row controlled demo', () => {
  it('should work', () => {
    mount(
      <EditRowDemo />,
    );
  });
});
