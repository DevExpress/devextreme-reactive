import React from 'react';
import { createMount } from 'material-ui/test-utils';
import { LocalFilteringControlledDemo } from './local-filtering-controlled';

describe('MUI: Local filtering controlled demo', () => {
  test('should work', () => {
    createMount()(
      <LocalFilteringControlledDemo />,
    );

    expect(true).toBeTruthy();
  });
});
