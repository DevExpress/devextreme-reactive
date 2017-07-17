import React from 'react';
import { mount } from 'enzyme';
import ReduxIntegrationDemo from './demo';

describe('BS3 featured: redux integration demo', () => {
  it('should work', () => {
    mount(
      <ReduxIntegrationDemo />,
    );
  });
});
