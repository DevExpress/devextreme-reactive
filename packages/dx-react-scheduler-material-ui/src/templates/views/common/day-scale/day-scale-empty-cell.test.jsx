import * as React from 'react';
import { createShallow, getClasses } from '@mui/material/test-utils';
import { DayScaleEmptyCell } from './day-scale-empty-cell';

describe('Vertical view DayScaleEmptyCell', () => {
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<DayScaleEmptyCell />);
    shallow = createShallow({ dive: true });
  });
  describe('Cell', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <DayScaleEmptyCell className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.emptyCell}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <DayScaleEmptyCell data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render children', () => {
      const tree = shallow((
        <DayScaleEmptyCell>
          <div className="child" />
        </DayScaleEmptyCell>
      ));

      expect(tree.find('.child').exists())
        .toBeTruthy();
    });
  });
});
