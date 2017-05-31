import React from 'react';
import { createMount } from 'material-ui/test-utils';
import { CustomFilterRowDemo } from './custom-filter-row';

describe('Custom filter row demo', () => {
  describe('#render', () => {
    test('should work', () => {
      createMount()(
        <CustomFilterRowDemo />,
      );

      expect(true).toBeTruthy();
    });
  });
});
