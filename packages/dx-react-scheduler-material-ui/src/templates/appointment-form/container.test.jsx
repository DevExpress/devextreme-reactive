import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Container } from './container';

describe('AppointmentForm', () => {
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<Container><div /></Container>);
    shallow = createShallow({ dive: true });
  });
  describe('Container', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Container data={{ a: 1 }}>
          <div />
        </Container>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass className to the root element', () => {
      const tree = shallow((
        <Container className="custom-class">
          <div />
        </Container>
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.root}`))
        .toBeTruthy();
    });
  });
});
