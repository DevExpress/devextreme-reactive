import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Wrapper } from './wrapper';

describe('AllDayPanel', () => {
  let classes;
  let shallow;
  const defaultProps = {
    allDayPanelRef: () => null,
    cellsData: [{ startDate: 1 }, { startDate: 2 }],
  };
  beforeAll(() => {
    classes = getClasses(
      <Wrapper {...defaultProps}>
        <div />
      </Wrapper>,
    );
    shallow = createShallow({ dive: true });
  });
  describe('Wrapper', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Wrapper {...defaultProps} className="custom-class">
          <div />
        </Wrapper>
      ));

      expect(tree.find('.custom-class'))
        .toBeTruthy();
      expect(tree.find(`.${classes.wrapper}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Wrapper {...defaultProps} data={{ a: 1 }}>
          <div />
        </Wrapper>
      ));

      expect(tree.find(`.${classes.wrapper}`).props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render children inside', () => {
      const tree = shallow((
        <Wrapper {...defaultProps} data={{ a: 1 }}>
          <div className="child" />
        </Wrapper>
      ));

      expect(tree.find('.child').exists())
        .toBeTruthy();
    });
  });
});
