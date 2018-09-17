import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Layout } from './layout';

describe('Appointment Tooltip', () => {
  let classes;
  let shallow;
  const defaultProps = {
    commandButtonComponent: () => null,
    headComponent: () => null,
    contentComponent: () => null,
    showOpenButton: false,
    showCloseButton: false,
    showDeleteButton: false,
    getAppointmentStartDate: () => new Date('2018-08-17 10:00'),
    getAppointmentEndDate: () => new Date('2018-08-17 11:00'),
    getAppointmentTitle: () => 'a',
    commandButtonIds: {},
  };
  beforeAll(() => {
    classes = getClasses(<Layout {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  describe('Layout', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Layout {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render Head component', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      expect(tree.find(defaultProps.headComponent).exists())
        .toBeTruthy();
    });

    it('should render Content component', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      expect(tree.find(defaultProps.contentComponent).exists())
        .toBeTruthy();
    });

    it('should render appointment dates', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));
      const text = tree.find(`.${classes.text}`);
      expect(text.at(0).props().children)
        .toEqual('10:00 AM');
      expect(text.at(1).props().children)
        .toEqual('11:00 AM');
    });
  });
});
