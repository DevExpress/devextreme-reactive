import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { Layout } from './layout';

describe('Appointment Tooltip', () => {
  let shallow;
  const defaultProps = {
    commandButtonComponent: () => null,
    headComponent: () => null,
    contentComponent: () => null,
    showOpenButton: false,
    showCloseButton: false,
    showDeleteButton: false,
    getAppointmentEndDate: jest.fn(),
    getAppointmentStartDate: jest.fn(),
    getAppointmentTitle: jest.fn(),
    commandButtonIds: {},
  };
  beforeAll(() => {
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
  });
});
