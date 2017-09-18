import React from 'react';
import { mount } from 'enzyme';
import CustomLocalFilteringDemo from './custom-local-filtering';

describe('BS3: custom local filtering demo', () => {
  it('should work', () => {
    mount(
      <CustomLocalFilteringDemo />,
    );
  });
});
