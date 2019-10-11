import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Layout } from './layout';
import { TicksLayout } from './ticks-layout';

describe('Vertical view TimeScale', () => {
  let classes;
  let shallow;
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
    labelComponent: jest.fn(),
    rowComponent: jest.fn(),
    tickCellComponent: jest.fn(),
    formatDate: () => undefined,
  };
  beforeAll(() => {
    classes = getClasses(<Layout {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  describe('Layout', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Layout {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render its components properly', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      expect(tree.find(`.${classes.timeScale}`).exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.ticks}`).exists())
        .toBeTruthy();
    });
    it('should render array of time labels and TicksLayout', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      const labels = tree.find(defaultProps.labelComponent);
      expect(labels)
        .toHaveLength(3);
      expect(labels.at(0).prop('time'))
        .toBeUndefined();
      expect(labels.at(1).prop('time'))
        .toEqual(expect.any(Date));
      expect(labels.at(2).prop('time'))
        .toBeUndefined();

      expect(tree.find(TicksLayout))
        .toHaveLength(1);
    });
  });
});
