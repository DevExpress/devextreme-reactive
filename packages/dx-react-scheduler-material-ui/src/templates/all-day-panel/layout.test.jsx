import * as React from 'react';
import { getClasses, createMount } from '@material-ui/core/test-utils';
import { Layout } from './layout';
import { VERTICAL_GROUP_ORIENTATION } from '@devexpress/dx-scheduler-core';

describe('AllDayPanel', () => {
  let classes;
  let mount;
  const defaultProps = {
    setCellElementsMeta: jest.fn(),
    cellsData: [{ startDate: 1 }, { startDate: 2 }],
    formatDate: jest.fn(),
    cellComponent: () => <td />,
    /* eslint-disable-next-line */
    rowComponent: ({ children }) => <tr>{children}</tr>,
  };
  beforeAll(() => {
    classes = getClasses(
      <Layout {...defaultProps}>
        <div />
      </Layout>,
    );
  });
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    jest.resetAllMocks();
    mount.cleanUp();
  });
  describe('Layout', () => {
    it('should pass className to the root element', () => {
      const tree = mount((
        <Layout {...defaultProps} className="custom-class">
          <div />
        </Layout>
      ));

      expect(tree.find('.custom-class'))
        .toBeTruthy();
      expect(tree.find(`.${classes.table}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = mount((
        <Layout {...defaultProps} data={{ a: 1 }}>
          <div />
        </Layout>
      ));

      expect(tree.find(`.${classes.table}`).at(0).props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render array of days', () => {
      const cell = () => <td />;
      const tree = mount((
        <Layout {...defaultProps} cellComponent={cell}>
          <div />
        </Layout>
      ));

      expect(tree.find(cell))
        .toHaveLength(2);
    });
    it('should calls setCellElementsMeta', () => {
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
    it('should render a row for every group if vertical grouping is used', () => {
      const groups = [[
        { id: 1 }, { id: 2 },
      ]];
      const tree = mount((
        <Layout {...defaultProps} groups={groups} groupOrientation={VERTICAL_GROUP_ORIENTATION} />
      ));

      expect(tree.find(defaultProps.rowComponent))
        .toHaveLength(2);
      expect(tree.find(defaultProps.cellComponent))
        .toHaveLength(4);
    });
  });
});
