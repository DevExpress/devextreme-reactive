import React from 'react';
import { createMount } from 'material-ui/test-utils';
import { LocalFilterRowDemo } from './local-filter-row';

describe('MUI: Local filter row demo', () => {
  test('should work', () => {
    createMount()(
      <LocalFilterRowDemo />,
    );

    expect(true).toBeTruthy();
  });
});
