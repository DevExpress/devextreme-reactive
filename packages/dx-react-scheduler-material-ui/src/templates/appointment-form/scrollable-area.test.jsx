import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { ScrollableArea } from './scrollable-area';

describe('AppointmentForm', () => {
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<ScrollableArea><div /></ScrollableArea>);
    shallow = createShallow({ dive: true });
  });
  describe('ScrollableArea', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <ScrollableArea data={{ a: 1 }}>
          <div />
        </ScrollableArea>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass className to the root element', () => {
      const tree = shallow((
        <ScrollableArea className="custom-class">
          <div />
        </ScrollableArea>
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.root}`))
        .toBeTruthy();
    });
  });
});
