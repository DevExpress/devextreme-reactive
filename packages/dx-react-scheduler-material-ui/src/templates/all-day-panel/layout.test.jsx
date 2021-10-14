import * as React from 'react';
import { getClasses, createMount } from '@devexpress/dx-testing';
import { Layout } from './layout';

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
