import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Container } from './container';

describe('AppointmentForm', () => {
  const defaultProps = {
    anchor: React.createRef(),
  };
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<Container><div /></Container>);
    shallow = createShallow({ dive: true });
  });
  describe('Container', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Container data={{ a: 1 }} {...defaultProps}>
          <div />
        </Container>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass className', () => {
      const tree = shallow((
        <Container className="custom-class" {...defaultProps}>
          <div />
        </Container>
      ));

      expect(tree.find('.custom-class').exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.absoluteDiv}`))
        .toHaveLength(2);
    });
  });
});
