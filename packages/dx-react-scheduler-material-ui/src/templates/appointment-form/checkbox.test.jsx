import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Checkbox } from './checkbox';

describe('Appointment Form', () => {
  let shallow;
  let classes;
  beforeAll(() => {
    classes = getClasses(<Checkbox />);
    shallow = createShallow({ dive: true });
  });
  describe('Checkbox', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Checkbox className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.container}`))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Checkbox data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
