import React from 'react';
import { createMount } from 'material-ui/test-utils';
import { LocalFilterRowDemo } from './local-filter-row';

describe('Local filter row demo', () => {
  describe('#render', () => {
    test('should work', () => {
      createMount()(
        <LocalFilterRowDemo />,
      );

      expect(true).toBeTruthy();
    });
  });
});
