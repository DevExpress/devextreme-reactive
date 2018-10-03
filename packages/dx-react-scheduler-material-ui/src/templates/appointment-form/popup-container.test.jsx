import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { PopupContainer } from './popup-container';

describe('AppointmentForm', () => {
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<PopupContainer><div /></PopupContainer>);
    shallow = createShallow({ dive: true });
  });
  describe('PopupContainer', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <PopupContainer data={{ a: 1 }}>
          <div />
        </PopupContainer>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass className to the root element', () => {
      const tree = shallow((
        <PopupContainer className="custom-class">
          <div />
        </PopupContainer>
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.root}`))
        .toBeTruthy();
    });
  });
});
