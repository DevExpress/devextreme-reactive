import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Head } from './head';

describe('Appointment Tooltip', () => {
  let classes;
  let shallow;
  const defaultProps = {
    appointment: {},
  };
  beforeAll(() => {
    classes = getClasses(<Head {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  describe('Head', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Head {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.head}`))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Head {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render children', () => {
      const tree = shallow((
        <Head {...defaultProps}>
          <div className="header-content" />
        </Head>
      ));

      expect(tree.find('.header-content').exists()).toBeTruthy();
    });
  });
});
