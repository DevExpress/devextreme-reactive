import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { TicksLayout } from './ticks-layout';

describe('Vertical view TimeScale', () => {
  let shallow;
  let classes;
  const defaultProps = {
    cellsData: [
      [
        { startDate: new Date(2018, 6, 7, 16), endDate: new Date(2018, 6, 7, 18) },
        { startDate: new Date(2018, 6, 8, 16), endDate: new Date(2018, 6, 8, 18) },
      ],
      [
        { startDate: new Date(2018, 6, 7, 18), endDate: new Date(2018, 6, 7, 20) },
        { startDate: new Date(2018, 6, 8, 18), endDate: new Date(2018, 6, 7, 20) },
      ],
    ],
    rowComponent: jest.fn(),
    cellComponent: jest.fn(),
    formatDate: () => undefined,
  };
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<TicksLayout {...defaultProps} />);
  });
  describe('TicksLayout', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <TicksLayout {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.table}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <TicksLayout {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render components properly', () => {
      const tree = shallow((
        <TicksLayout {...defaultProps} />
      ));

      expect(tree.find(defaultProps.rowComponent))
        .toHaveLength(2);
      expect(tree.find(defaultProps.cellComponent))
        .toHaveLength(2);
    });
  });
});
