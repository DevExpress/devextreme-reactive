import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Layout } from './layout';

describe('AppointmentForm control', () => {
  const defaultProps = {
    controlButtonComponent: () => null,
    getMessage: jest.fn(),
    commitAppointment: jest.fn(),
    cancelCommit: jest.fn(),
    deleteAppointment: jest.fn(),
  };
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<Layout><div /></Layout>);
    shallow = createShallow({ dive: true });
  });
  describe('Layout', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Layout data={{ a: 1 }} {...defaultProps}>
          <div />
        </Layout>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass className to the root element', () => {
      const tree = shallow((
        <Layout className="custom-class" {...defaultProps}>
          <div />
        </Layout>
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.root}`))
        .toBeTruthy();
    });

    it('should render three Control Buttons', () =>{
      const tree = shallow((
        <Layout className="custom-class" {...defaultProps}>
          <div />
        </Layout>
      ));

      expect(tree.find(defaultProps.controlButtonComponent))
        .toHaveLength(3);
    });

    it('should pass children to the root component', () => {
      const tree = shallow((
        <Layout {...defaultProps}>
          <div />
          <div />
        </Layout>
      ));

      expect(tree.children())
        .toHaveLength(5);
    });
  });
});