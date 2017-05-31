import React from 'react';
import { createMount } from 'material-ui/test-utils';
import { CustomFilterRowDemo } from './custom-filter-row';

describe('MUI: Custom filter row demo', () => {
  test('should work', () => {
    createMount()(
      <CustomFilterRowDemo />,
    );

    expect(true).toBeTruthy();
  });
});
