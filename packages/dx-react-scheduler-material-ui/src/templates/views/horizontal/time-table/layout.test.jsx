import * as React from 'react';
import { createMount } from '@mui/material/test-utils';
import { Layout } from './layout';

describe('Horizontal view TimeTable ', () => {
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
    cellComponent: () => <td />,
    /* eslint-disable-next-line */
    rowComponent: ({ children }) => <tr>{children}</tr>,
    formatDate: () => undefined,
    setCellElementsMeta: jest.fn(),
  };
  let mount;
  beforeEach(() => {
    mount = createMount();
    defaultProps.setCellElementsMeta.mockClear();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  describe('Layout', () => {
    it('should pass rest props to the root element', () => {
      const tree = mount((
        <Layout {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.find('table').at(0).props().data)
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
    it('should call setCellElementsMeta', () => {
      const tree = mount((
        <Layout
          {...defaultProps}
        />
      ));

      expect(defaultProps.setCellElementsMeta)
        .toBeCalledTimes(1);

      tree.setProps({ className: 'a' });

      expect(defaultProps.setCellElementsMeta)
        .toBeCalledTimes(2);
    });
  });
});
