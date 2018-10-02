import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { Popup } from './popup';

describe('Appointment Form', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  describe('Popup', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Popup className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });
  });
});
