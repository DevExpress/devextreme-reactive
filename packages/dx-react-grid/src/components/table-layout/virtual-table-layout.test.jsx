import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { shallow, mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { VirtualTableLayout } from './virtual-table-layout';
import {
  getVisibleRows,
  firstVisibleRowOffset,
} from './virtual-table-utils';

jest.mock('react-dom', () => ({
  findDOMNode: jest.fn(),
}));
jest.mock('./virtual-table-utils', () => {
  const actual = require.requireActual('./virtual-table-utils');
  jest.spyOn(actual, 'getVisibleRows');
  jest.spyOn(actual, 'firstVisibleRowOffset');
  return actual;
});
jest.mock('./column-group', () => ({
  ColumnGroup: () => null,
}));
jest.mock('./row-layout', () => {
  const { Component } = require.requireActual('react');
  return {
    // eslint-disable-next-line react/prefer-stateless-function
    RowLayout: class extends Component {
      render() {
        return null;
      }
    },
  };
});

const defaultProps = {
  columns: [
    { key: 'a', column: { name: 'a' } },
    { key: 'b', column: { name: 'b' } },
    { key: 'c', column: { name: 'c' } },
    { key: 'd', column: { name: 'd' } },
  ],
  minWidth: 400,
  height: 100,
  estimatedRowHeight: 40,
  rows: [
    { key: 1 },
    { key: 2 },
    { key: 3 },
    { key: 4 },
    { key: 5 },
    { key: 6 },
  ],
  containerComponent: props => <div {...props} />,
  headTableComponent: () => null,
  tableComponent: props => <table {...props} />,
  headComponent: () => null,
  bodyComponent: props => <tbody {...props} />,
  rowComponent: () => null,
  cellComponent: () => null,
};

describe('VirtualTableLayout', () => {
  let resetConsole;
  beforeEach(() => {
    resetConsole = setupConsole();
    findDOMNode.mockImplementation(ref => ({
      getBoundingClientRect: () => ({
        height: ref.props.row.height || defaultProps.estimatedRowHeight,
      }),
    }));
  });

  afterEach(() => {
    resetConsole();
    jest.clearAllMocks();
  });

  const simulateScroll = (tree, props) => {
    const target = {
      scrollTop: 0,
      scrollLeft: 0,
      scrollHeight: 1000,
      scrollWidth: 1000,
      clientHeight: 200,
      clientWidth: 200,
      ...props,
    };

    const eventData = {
      target,
      currentTarget: target,
    };

    tree
      .find(defaultProps.containerComponent)
      .prop('onScroll')(eventData);
    tree.update();
  };

  describe('body', () => {
    it('should render ColumnGroup for tableComponent', () => {
      const tree = shallow((
        <VirtualTableLayout
          {...defaultProps}
        />
      ));

      expect(tree.find('ColumnGroup').props())
        .toMatchObject({
          columns: defaultProps.columns,
        });
    });

    it('should pass correct props for getVisibleRows', () => {
      const tree = shallow((
        <VirtualTableLayout
          {...defaultProps}
        />
      ));

      simulateScroll(tree, { scrollTop: 100 });

      expect(getVisibleRows.mock.calls[0])
        .toEqual([defaultProps.rows, 0, defaultProps.height, expect.any(Function)]);
      expect(getVisibleRows.mock.calls[1])
        .toEqual([defaultProps.rows, 100, defaultProps.height, expect.any(Function)]);
    });

    it('should specify correct row height at sturtup', () => {
      let testsPassed = false;

      const rows = [
        { key: 1 },
        { key: 2, height: 10 },
      ];

      getVisibleRows
        .mockImplementationOnce((...args) => {
          const getRowHeight = args[3];
          expect(getRowHeight(rows[0]))
            .toEqual(defaultProps.estimatedRowHeight);
          expect(getRowHeight(rows[1]))
            .toEqual(10);

          testsPassed = true;

          return require.requireActual('./virtual-table-utils').getVisibleRows(...args);
        });

      mount((
        <VirtualTableLayout
          {...defaultProps}
          rows={rows}
        />
      ));

      expect(testsPassed)
        .toBeTruthy();
    });

    it('should store row height when rendered', () => {
      const rows = [
        { key: 1 },
        { key: 2, height: 10 },
      ];

      findDOMNode.mockImplementation(ref => ({
        getBoundingClientRect: () => ({
          height: ref.props.row.height || 50,
        }),
      }));

      mount((
        <VirtualTableLayout
          {...defaultProps}
          rows={rows}
        />
      ));

      const getRowHeight = getVisibleRows.mock.calls[0][3];
      expect(getRowHeight(rows[0]))
        .toEqual(50);
      expect(getRowHeight(rows[1]))
        .toEqual(10);
    });

    it('should store change scrollTop after first visible row height change', () => {
      const tree = mount((
        <VirtualTableLayout
          {...defaultProps}
        />
      ));

      findDOMNode.mockImplementation(ref => ({
        get scrollTop() {
          return 100;
        },
        set scrollTop(value) {
          expect(value).toBe(110);
        },
        getBoundingClientRect: () => ({
          height: ref.props.row.height || 50,
        }),
      }));

      firstVisibleRowOffset.mockReturnValueOnce(10);
      simulateScroll(tree, { scrollTop: 100 });
    });
  });

  describe('header', () => {
    it('should render ColumnGroup for headTableComponent', () => {
      const tree = shallow((
        <VirtualTableLayout
          {...defaultProps}
          headerRows={defaultProps.rows.slice(0, 1)}
        />
      ));

      expect(tree
        .find(defaultProps.headTableComponent)
        .find('ColumnGroup').props())
        .toMatchObject({
          columns: defaultProps.columns,
        });
    });

    it('should render header rows for headTableComponent', () => {
      const tree = shallow((
        <VirtualTableLayout
          {...defaultProps}
          headerRows={defaultProps.rows.slice(0, 1)}
        />
      ));

      expect(tree
        .find(defaultProps.headTableComponent)
        .find('RowLayout'))
        .toHaveLength(1);
    });

    it('should pass height for getVisibleRows', () => {
      const tree = shallow((
        <VirtualTableLayout
          {...defaultProps}
          headerRows={defaultProps.rows.slice(0, 1)}
        />
      ));

      simulateScroll(tree, { scrollTop: 100 });

      expect(getVisibleRows.mock.calls[0][2])
        .toEqual(defaultProps.height - (defaultProps.estimatedRowHeight * 1));
      expect(getVisibleRows.mock.calls[1][2])
        .toEqual(defaultProps.height - (defaultProps.estimatedRowHeight * 1));
    });
  });
});
