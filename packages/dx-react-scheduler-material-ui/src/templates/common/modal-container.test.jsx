import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { ModalContainer } from './modal-container';

describe('Common', () => {
  const defaultProps = {
    ref: React.createRef(),
  };
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<ModalContainer {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  describe('ModalContainer', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <ModalContainer {...defaultProps} className="custom-class">
          <div />
        </ModalContainer>
      ));

      expect(tree.find('.custom-class'))
        .toBeTruthy();
      expect(tree.find(`.${classes.container}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <ModalContainer {...defaultProps} data={{ a: 1 }}>
          <div />
        </ModalContainer>
      ));

      expect(tree.find(`.${classes.container}`).props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render children inside', () => {
      const tree = shallow((
        <ModalContainer {...defaultProps} data={{ a: 1 }}>
          <div className="child" />
        </ModalContainer>
      ));

      expect(tree.find('.child').exists())
        .toBeTruthy();
    });
  });
});
