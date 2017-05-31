import React from 'react';
import { createMount } from 'material-ui/test-utils';
import { LocalFilteringControlledDemo } from './local-filtering-controlled';

describe('Local Filtering Controlled Demo', () => {
  describe('#render', () => {
    test('should work', () => {
      createMount()(
        <LocalFilteringControlledDemo />,
      );

      expect(true).toBeTruthy();
    });
  });
});
