import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { AllDayEditor } from './all-day-editor';

describe('Appointment Form', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  describe('AllDayEditor', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <AllDayEditor className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });
  });
});
