import * as React from 'react';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import { Layout } from './layout';

describe('Horizontal view TimeTable', () => {
  const defaultProps = {
    tableRef: {
      current: {
        querySelectorAll: jest.fn(),
      },
    },
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
    cellComponent: () => <td />,
    /* eslint-disable-next-line */
    rowComponent: ({ children }) => <tr>{children}</tr>,
    formatDate: () => undefined,
    setCellElements: jest.fn(),
  };
  let classes;
  let mount;
  beforeAll(() => {
    classes = getClasses(<Layout {...defaultProps} />);
  });
  beforeEach(() => {
    mount = createMount();
    defaultProps.setCellElements.mockClear();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  describe('Layout', () => {
    it('should pass className to the root element', () => {
      const tree = mount((
        <Layout {...defaultProps} className="custom-class" />
      ));

      expect(tree.find('.custom-class'))
        .toBeTruthy();
      expect(tree.find(`.${classes.table}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = mount((
        <Layout {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.find(`.${classes.table}`).at(0).props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render array of days', () => {
      const tree = mount((
        <Layout {...defaultProps} />
      ));

      expect(tree.find(defaultProps.cellComponent))
        .toHaveLength(4);
      expect(tree.find(defaultProps.rowComponent))
        .toHaveLength(2);
    });
  });
});
