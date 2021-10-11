import * as React from 'react';
import { createMount, createShallow } from '@mui/material/test-utils';
import { Layout } from './layout';

describe('Vertical view TimeTable', () => {
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
    cellComponent: jest.fn(),
    rowComponent: jest.fn(),
    formatDate: jest.fn(),
    setCellElementsMeta: jest.fn(),
  };
  let mount;
  let shallow;
  beforeEach(() => {
    mount = createMount();
    shallow = createShallow();
    defaultProps.setCellElementsMeta.mockClear();
  });
  afterEach(() => {
    mount.cleanUp();
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
      const tree = shallow((
        <Layout
          {...defaultProps}
        />
      ));

      expect(tree.find(defaultProps.cellComponent))
        .toHaveLength(4);
      expect(tree.find(defaultProps.rowComponent))
        .toHaveLength(2);
    });
    it('should calls setCellElementsMeta', () => {
      const cell = () => <td />;
      /* eslint-disable-next-line */
      const row = ({ children }) => <tr>{children}</tr>;
      const tree = mount((
        <Layout
          {...defaultProps}
          cellComponent={cell}
          rowComponent={row}
        />
      ));

      expect(defaultProps.setCellElementsMeta)
        .toBeCalledTimes(1);

      tree.setProps({ className: 'a' });

      expect(defaultProps.setCellElementsMeta)
        .toBeCalledTimes(2);
    });
    it('should render timetable and all-day cells and rows', () => {
      const allDayCellComponent = jest.fn();
      const allDayRowComponent = jest.fn();
      const allDayCellsData = [
        [{ startDate: new Date(2018, 6, 7), endDate: new Date(2018, 6, 7) }],
        [{ startDate: new Date(2018, 6, 7), endDate: new Date(2018, 6, 7) }],
      ];
      const cellsData = [
        [{ startDate: new Date(2018, 6, 7, 16), endDate: new Date(2018, 6, 7, 18) }],
        [{ startDate: new Date(2018, 6, 7, 18), endDate: new Date(2018, 6, 7, 20) }],
        [{ startDate: new Date(2018, 6, 7, 16), endDate: new Date(2018, 6, 7, 18) }],
        [{ startDate: new Date(2018, 6, 7, 18), endDate: new Date(2018, 6, 7, 20) }],
      ];

      const tree = shallow((
        <Layout
          {...defaultProps}
          allDayCellComponent={allDayCellComponent}
          allDayRowComponent={allDayRowComponent}
          allDayCellsData={allDayCellsData}
          cellsData={cellsData}
        />
      ));

      expect(tree.find(defaultProps.cellComponent))
        .toHaveLength(4);
      expect(tree.find(defaultProps.rowComponent))
        .toHaveLength(4);
      expect(tree.find(allDayCellComponent))
        .toHaveLength(2);
      expect(tree.find(allDayRowComponent))
        .toHaveLength(2);
    });
  });
});
