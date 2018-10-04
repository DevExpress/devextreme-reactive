import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { StaticSpace } from './static-space';

describe('AppointmentForm', () => {
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<StaticSpace><div /></StaticSpace>);
    shallow = createShallow({ dive: true });
  });
  describe('StaticSpace', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <StaticSpace data={{ a: 1 }}>
          <div />
        </StaticSpace>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass className to the root element', () => {
      const tree = shallow((
        <StaticSpace className="custom-class">
          <div />
        </StaticSpace>
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.root}`))
        .toBeTruthy();
    });
  });
});
