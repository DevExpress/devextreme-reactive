import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { OverlayContainer, classes } from './overlay-container';

describe('Common', () => {
  const defaultProps = {
    ref: React.createRef(),
  };
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  describe('OverlayContainer', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <OverlayContainer {...defaultProps} className="custom-class">
          <div />
        </OverlayContainer>
      ));

      expect(tree.find('.custom-class'))
        .toBeTruthy();
      expect(tree.find(`.${classes.container}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <OverlayContainer {...defaultProps} data={{ a: 1 }}>
          <div />
        </OverlayContainer>
      ));

      expect(tree.find(`.${classes.container}`).props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render children inside', () => {
      const tree = shallow((
        <OverlayContainer {...defaultProps} data={{ a: 1 }}>
          <div className="child" />
        </OverlayContainer>
      ));

      expect(tree.find('.child').exists())
        .toBeTruthy();
    });
  });
});
