import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { Container, classes } from './container';

describe('TableGroupCell', () => {
  describe('Container', () => {
    let shallow;

    beforeAll(() => {
      shallow = createShallow({ dive: true });
    });

    it('should have correct classes', () => {
      const tree = shallow(<Container />);

      expect(tree.is(`.${classes.wrapper}`));
    });

    it('should pass the className prop to the root element', () => {
      const tree = shallow((
        <Container className="custom-class" />
      ));

      expect(tree.is(`.${classes.wrapper}.custom-class`))
        .toBeTruthy();
    });

    it('should apply style', () => {
      const tree = shallow(<Container position="13px" />);

      expect(tree.prop('style'))
        .toEqual({ left: '13px' });
    });

    it('should render children', () => {
      const tree = shallow((
        <Container>
          <span className="child" />
        </Container>
      ));

      expect(tree.find('.child'))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Container data={{ a: 1 }} />
      ));

      expect(tree.prop('data'))
        .toMatchObject({ a: 1 });
    });
  });
});
