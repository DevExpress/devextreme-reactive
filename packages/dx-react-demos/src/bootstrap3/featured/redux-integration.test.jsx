import React from 'react';
import { mount } from 'enzyme';
import { ReduxIntegrationDemo } from './redux-integration';

describe('BS3 featured: redux integration demo', () => {
  test('should work', () => {
    mount(
      <ReduxIntegrationDemo />,
    );
  });
});
