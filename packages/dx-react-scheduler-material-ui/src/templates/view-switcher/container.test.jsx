import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { Container } from './container';

describe('ViewSwitcher', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  describe('Container', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Container className="custom-class">
          <div />
        </Container>
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Container data={{ a: 1 }}>
          <div />
        </Container>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
