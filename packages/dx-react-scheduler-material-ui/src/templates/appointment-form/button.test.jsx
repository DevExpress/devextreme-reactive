import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { Button } from './button';

describe('Appointment Form', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  describe('Button', () => {
    it('should pass restProps to the root element', () => {
      const tree = shallow((
        <Button className="custom-class" text="title" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });
  });
});
