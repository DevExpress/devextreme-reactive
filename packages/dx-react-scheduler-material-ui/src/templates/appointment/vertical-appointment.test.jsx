import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { VerticalAppointment } from './vertical-appointment';

describe('Appointment', () => {
  const defaultProps = {
    getTitle: () => 'title',
    getStartDate: () => new Date('2018-07-27 13:10'),
    getEndDate: () => new Date('2018-07-27 17:10'),
    appointment: {},
  };

  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<VerticalAppointment {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  describe('VerticalAppointment', () => {
    it('should pass classes to the component', () => {
      const tree = shallow((
        <VerticalAppointment {...defaultProps} />
      ));

      expect(tree.find(`.${classes.main}`))
        .toHaveLength(1);
      expect(tree.find(`.${classes.title}`))
        .toHaveLength(1);
      expect(tree.find(`.${classes.textContainer}`))
        .toHaveLength(1);
      expect(tree.find(`.${classes.time}`))
        .toHaveLength(3);
    });
    it('should write title', () => {
      const tree = shallow((
        <VerticalAppointment {...defaultProps} />
      ));

      expect(tree.find(`.${classes.title}`).props().children)
        .toBe('title');
    });
    it('should write appointment information', () => {
      const tree = shallow((
        <VerticalAppointment {...defaultProps} />
      ));

      expect(tree.find(`.${classes.time}`).at(0).props().children)
        .toBe('1:10 PM');
      expect(tree.find(`.${classes.time}`).at(1).props().children)
        .toBe(' - ');
      expect(tree.find(`.${classes.time}`).at(2).props().children)
        .toBe('5:10 PM');
    });
  });
});
