import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { Layout, classes } from './layout';

describe('AppointmentForm', () => {
  const defaultProps = {
    isRecurring: false,
    basicLayoutComponent: () => null,
    commandLayoutComponent: () => null,
    recurrenceLayoutComponent: () => null,
  };
  let shallow;
  beforeAll(() => {
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

    it('should render basic form correctly', () => {
      const tree = shallow((
        <Layout {...defaultProps}>
          <div />
        </Layout>
      ));

      expect(tree.find(defaultProps.commandLayoutComponent))
        .toHaveLength(1);
      expect(tree.find(defaultProps.basicLayoutComponent))
        .toHaveLength(1);
      expect(tree.find(defaultProps.recurrenceLayoutComponent))
        .toHaveLength(1);
    });

    it('should pass children to the root component', () => {
      const tree = shallow((
        <Layout {...defaultProps}>
          <div className="child" />
        </Layout>
      ));

      expect(tree.find('.child'))
        .toHaveLength(1);
    });
  });
});
