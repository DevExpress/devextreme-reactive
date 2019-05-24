import * as React from 'react';
import { shallow } from 'enzyme';
import { Container } from './container';

describe('TableGroupCell', () => {
  describe('Container', () => {
    it('should have correct classes', () => {
      const tree = shallow(<Container />);

      expect(tree.is('.position-sticky.dx-g-bs4-fixed-group-cell'));
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

    it('should pass custom class to the root element', () => {
      const tree = shallow((
        <Container
          className="custom-class"
        />
      ));

      expect(tree.is('.position-sticky.dx-g-bs4-fixed-group-cell.custom-class'))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Container data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
