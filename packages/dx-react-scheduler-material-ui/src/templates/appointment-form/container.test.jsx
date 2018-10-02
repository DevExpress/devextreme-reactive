import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Container } from './container';

describe('Appointment Form', () => {
  let shallow;
  let classes;
  beforeAll(() => {
    classes = getClasses(<Container />);
    shallow = createShallow({ dive: true });
  });
  describe('Container', () => {
    it('should pas srest props to the root element', () => {
      const tree = shallow((
        <Container className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });

    it('should render scrolable space element', () => {
      const tree = shallow((
        <Container />
      ));

      expect(tree.find(`.${classes.scrollableSpace}`))
        .toBeTruthy();
    });

    it('should render button grpup element', () => {
      const tree = shallow((
        <Container />
      ));

      expect(tree.find(`.${classes.buttonBgroup}`))
        .toBeTruthy();
    });
  });
});
