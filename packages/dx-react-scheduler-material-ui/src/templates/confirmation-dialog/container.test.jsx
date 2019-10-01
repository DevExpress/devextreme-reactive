import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Container } from './container';

describe('EditRecurrenceMenu', () => {
  const defaultProps = {
    ref: React.createRef(),
  };
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<Container {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  describe('Container', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Container {...defaultProps} className="custom-class">
          <div />
        </Container>
      ));

      expect(tree.find('.custom-class'))
        .toBeTruthy();
      expect(tree.find(`.${classes.container}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Container {...defaultProps} data={{ a: 1 }}>
          <div />
        </Container>
      ));

      expect(tree.find(`.${classes.container}`).props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render children inside', () => {
      const tree = shallow((
        <Container {...defaultProps} data={{ a: 1 }}>
          <div className="child" />
        </Container>
      ));

      expect(tree.find('.child').exists())
        .toBeTruthy();
    });
  });
});
