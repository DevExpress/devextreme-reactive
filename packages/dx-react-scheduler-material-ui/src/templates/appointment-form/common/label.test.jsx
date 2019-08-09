import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { TITLE_LABEL } from '@devexpress/dx-scheduler-core';
import { Label } from './label';

describe('Appointment Form common', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  describe('Label', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Label data={{ a: 1 }} />
      ));

      expect(tree.prop('data'))
        .toMatchObject({ a: 1 });
    });

    it('should pass className to the root element', () => {
      const classes = getClasses(<Label />);
      const tree = shallow((
        <Label className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();

      expect(tree.is(`.${classes.label}`))
        .toBeTruthy();
    });

    it('should pass className to the root element', () => {
      const classes = getClasses(<Label id={TITLE_LABEL} />);
      const tree = shallow((
        <Label id={TITLE_LABEL} />
      ));

      expect(tree.is(`.${classes.label}`))
        .toBeTruthy();
      expect(tree.is(`.${classes.titleLabel}`))
        .toBeTruthy();
    });
  });
});
