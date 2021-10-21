import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { Layout } from './layout';

describe('Common view DayScale', () => {
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
    cellComponent: () => undefined,
    rowComponent: () => undefined,
    groupingPanelComponent: () => undefined,
    formatDate: jest.fn(),
  };
  beforeAll(() => {
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
    it('should render array of days', () => {
      const cell = () => <td />;
      const tree = shallow((
        <Layout {...defaultProps} cellComponent={cell} />
      ));

      expect(tree.find(cell))
        .toHaveLength(2);
    });
    it('should render groupingPanelComponent', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      expect(tree.find(defaultProps.groupingPanelComponent).exists())
        .toBeTruthy();
    });
  });
});
