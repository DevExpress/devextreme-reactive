import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Content } from './content';

describe('Appointment Tooltip', () => {
  let classes;
  let shallow;
  const defaultProps = {
    appointment: {},
    getAppointmentStartDate: () => new Date('3-09-2018'),
    getAppointmentEndDate: () => new Date('4-09-2018'),
  };
  beforeAll(() => {
    classes = getClasses(<Content {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  describe('Content', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Content {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.content}`))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Content {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render appointment date', () => {
      const tree = shallow((
        <Content {...defaultProps} />
      ));

      expect(tree.find(`.${classes.text}`).at(0).props().children)
        .toEqual('12:00 AM');
      expect(tree.find(`.${classes.text}`).at(1).props().children)
        .toEqual('12:00 AM');
    });
  });
});
