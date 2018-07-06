import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Appointment } from './appointment';

describe('Appointment', () => {
  const defaultProps = {
    top: 0,
    left: 1,
    width: 2,
    height: 3,
    getTitle: () => 'title',
    getStartDate: () => new Date(2018, 6, 7),
    getEndDate: () => new Date(2018, 6, 8),
    appointment: {},
  };

  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<Appointment {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  describe('Appointment', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Appointment {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.appointment}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Appointment {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should define position by props', () => {
      const tree = shallow((
        <Appointment {...defaultProps} />
      ));

      expect(tree.props().style)
        .toEqual({
          transform: `translateY(${defaultProps.top}px)`,
          left: `${defaultProps.left}%`,
          width: `${defaultProps.width}%`,
          height: defaultProps.height,
        });
    });
  });
});
