import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { ScrollableSpace } from './scrollable-space';

describe('AppointmentForm', () => {
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<ScrollableSpace><div /></ScrollableSpace>);
    shallow = createShallow({ dive: true });
  });
  describe('ScrollableSpace', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <ScrollableSpace data={{ a: 1 }}>
          <div />
        </ScrollableSpace>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass className to the root element', () => {
      const tree = shallow((
        <ScrollableSpace className="custom-class">
          <div />
        </ScrollableSpace>
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.root}`))
        .toBeTruthy();
    });
  });
});
