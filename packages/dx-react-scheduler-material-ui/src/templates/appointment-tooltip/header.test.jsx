import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Header } from './header';

describe('Appointment Tooltip', () => {
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<Header />);
    shallow = createShallow({ dive: true });
  });
  describe('Header', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Header className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.head}`))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Header data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render children', () => {
      const tree = shallow((
        <Header>
          <div className="header-content" />
        </Header>
      ));

      expect(tree.find('.header-content').exists()).toBeTruthy();
    });
  });
});
