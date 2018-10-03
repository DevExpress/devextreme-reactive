import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { AllDayEditor } from './all-day-editor';

describe('Appointment Form', () => {
  let shallow;
  let classes;
  beforeAll(() => {
    classes = getClasses(<AllDayEditor />);
    shallow = createShallow({ dive: true });
  });
  describe('AllDayEditor', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <AllDayEditor className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.root}`))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <AllDayEditor data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
