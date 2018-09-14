import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Layout } from './layout';

describe('AllDayPanel', () => {
  let classes;
  let shallow;
  const defaultProps = {
    allDayPanelRef: () => null,
  };
  beforeAll(() => {
    classes = getClasses(
      <Layout {...defaultProps}>
        <div />
      </Layout>,
    );
    shallow = createShallow({ dive: true });
  });
  describe('Layout', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Layout {...defaultProps} className="custom-class">
          <div />
        </Layout>
      ));

      expect(tree.find('.custom-class'))
        .toBeTruthy();
      expect(tree.find(`.${classes.table}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Layout {...defaultProps} data={{ a: 1 }}>
          <div />
        </Layout>
      ));

      expect(tree.find(`.${classes.table}`).props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render array of days', () => {
      const cell = () => <td />;
      const dayScale = [new Date('2018-07-26'), new Date('2018-07-26')];
      const tree = shallow((
        <Layout {...defaultProps} dayScale={dayScale} cellComponent={cell}>
          <div />
        </Layout>
      ));

      expect(tree.find(cell))
        .toHaveLength(2);
    });
  });
});
