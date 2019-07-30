import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Layout } from './layout';

describe('AppointmentForm', () => {
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<Layout><div /></Layout>);
    shallow = createShallow({ dive: true });
  });
  describe('ScrollableArea', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Layout data={{ a: 1 }}>
          <div />
        </Layout>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass className to the root element', () => {
      const tree = shallow((
        <Layout className="custom-class">
          <div />
        </Layout>
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.root}`))
        .toBeTruthy();
    });
  });
});
