import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { shallow, mount } from 'enzyme';
import { isEdgeBrowser } from '@devexpress/dx-core';
import { Sizer } from '@devexpress/dx-react-core';
import {
  getCollapsedGrid,
  TABLE_FLEX_TYPE,
} from '@devexpress/dx-grid-core';
import { setupConsole } from '@devexpress/dx-testing';
import { VirtualTableLayout } from './virtual-table-layout';

jest.mock('react-dom', () => ({
  findDOMNode: jest.fn(),
}));
jest.mock('@devexpress/dx-core', () => {
  return {
    ...require.requireActual('@devexpress/dx-core'),
    isEdgeBrowser: jest.fn(),
  };
});
jest.mock('@devexpress/dx-grid-core', () => {
  const actual = require.requireActual('@devexpress/dx-grid-core');
  jest.spyOn(actual, 'getCollapsedGrid');
  jest.spyOn(actual, 'getColumnWidthGetter');
  return actual;
});
jest.mock('./column-group', () => ({
  ColumnGroup: () => null,
}));
jest.mock('@devexpress/dx-react-core', () => {
  const { Component } = require.requireActual('react');
  return {
    ...require.requireActual('@devexpress/dx-react-core'),
    Sizer: class extends Component {
      componentDidMount() {
        // eslint-disable-next-line react/prop-types
        const { onSizeChange } = this.props;
        onSizeChange({ width: 400, height: 120 });
      }

      render() {
        const { containerComponent: Container, onSizeChange, ...restProps } = this.props;
        return (
          <Container {...restProps} />
        );
      }
    },
    // tslint:disable-next-line: max-classes-per-file
    RefHolder: class extends Component {
      render() {
        // eslint-disable-next-line react/prop-types
        const { children: propsChildren } = this.props;
        return propsChildren;
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
    { key: 'e', column: { name: 'e' } },
  ],
  minWidth: 400,
  minColumnWidth: 120,
  height: 100,
  estimatedRowHeight: 40,
  bodyRows: [
    { key: 1 },
    { key: 2 },
    { key: 3 },
    { key: 4 },
    { key: 5 },
    { key: 6 },
    { key: 7 },
    { key: 8 },
    { key: 9 },
  ],
  containerComponent: props => <div {...props} />,
  // eslint-disable-next-line react/prop-types
  headTableComponent: ({ tableRef, ...props }) => <table {...props} />,
  // eslint-disable-next-line react/prop-types
  tableComponent: ({ tableRef, ...props }) => <table {...props} />,
  headComponent: props => <thead {...props} />,
  bodyComponent: props => <tbody {...props} />,
  rowComponent: () => null,
  cellComponent: () => null,
  getCellColSpan: () => 1,
  tableRef: React.createRef<HTMLTableElement>(),
};

describe('VirtualTableLayout', () => {
  let resetConsole;
  beforeEach(() => {
    resetConsole = setupConsole();
    findDOMNode.mockImplementation(() => ({
      getBoundingClientRect: () => ({
        height: defaultProps.estimatedRowHeight,
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
      ...props,
    };

    const eventData = {
      target,
      currentTarget: target,
    };

    tree
      .find(Sizer)
      .find(defaultProps.containerComponent)
      .prop('onScroll')(eventData);
    tree.update();
  };

  it('should render correct layout', () => {
    const tree = shallow((
      <VirtualTableLayout
        {...defaultProps}
        headerRows={defaultProps.bodyRows.slice(0, 1)}
        footerRows={defaultProps.bodyRows.slice(0, 1)}
      />
    ));

    expect(tree.find(Sizer).dive())
      .toMatchSnapshot();
  });

  it('should not render width for a flex column', () => {
    const columns = [
      { key: 'col0', width: 100 },
      { key: 'col1', width: 100 },
      { key: 'col_flex', type: TABLE_FLEX_TYPE },
    ];
    const rows = [{ key: 0 }];

    getCollapsedGrid
      .mockImplementationOnce((args) => {
        const result = require.requireActual('@devexpress/dx-grid-core').getCollapsedGrid(args);

        expect(result.columns.find(col => col.key === 'col_flex').width)
          .toBe(null);

        return result;
      });

    mount((
      <VirtualTableLayout
        {...defaultProps}
        headerRows={rows}
        columns={columns}
      />
    ));
  });

  describe('viewport', () => {
    it('should pass correct viewport at startup', () => {
      const tree = mount((
        <VirtualTableLayout
          {...defaultProps}
          headerRows={defaultProps.bodyRows.slice(0, 1)}
          footerRows={defaultProps.bodyRows.slice(0, 1)}
        />
      ));

      expect(tree.find(defaultProps.containerComponent).props().style)
        .toMatchObject({ height: `${defaultProps.height}px` });

      expect(getCollapsedGrid.mock.calls[getCollapsedGrid.mock.calls.length - 3][0])
        .toMatchObject({
          top: 0,
          left: 0,
          height: defaultProps.estimatedRowHeight,
          width: 400,
        });
      expect(getCollapsedGrid.mock.calls[getCollapsedGrid.mock.calls.length - 2][0])
        .toMatchObject({
          top: 0,
          left: 0,
          height: 120 - (defaultProps.estimatedRowHeight * 2),
          width: 400,
        });
      expect(getCollapsedGrid.mock.calls[getCollapsedGrid.mock.calls.length - 1][0])
        .toMatchObject({
          top: 0,
          left: 0,
          height: defaultProps.estimatedRowHeight,
          width: 400,
        });
    });

    it('should pass correct viewport at startup when height is auto', () => {
      const tree = mount((
        <VirtualTableLayout
          {...defaultProps}
          headerRows={defaultProps.bodyRows.slice(0, 1)}
          height="auto"
        />
      ));

      expect(tree.find(defaultProps.containerComponent).props().style)
        .not.toMatchObject({ height: `${defaultProps.height}px` });
    });

    it('should pass correct viewport at on viewport change', () => {
      const tree = mount((
        <VirtualTableLayout
          {...defaultProps}
          headerRows={defaultProps.bodyRows.slice(0, 1)}
        />
      ));

      simulateScroll(tree, { scrollTop: 100, scrollLeft: 50 });
      const calls = getCollapsedGrid.mock.calls;

      expect(getCollapsedGrid.mock.calls[getCollapsedGrid.mock.calls.length - 3][0])
        .toMatchObject({
          top: 0,
          left: 50,
        });
      expect(getCollapsedGrid.mock.calls[getCollapsedGrid.mock.calls.length - 2][0])
        .toMatchObject({
          top: 100,
          left: 50,
        });
      expect(getCollapsedGrid.mock.calls[getCollapsedGrid.mock.calls.length - 1][0])
        .toMatchObject({
          top: 0,
          left: 50,
        });
    });

    describe('scroll bounce', () => {
      const assertRerenderOnBounce = (shouldRerender, scrollArgs) => {
        const tree = mount((
          <VirtualTableLayout
            {...defaultProps}
            headerRows={defaultProps.bodyRows.slice(0, 1)}
          />
        ));
        const initialCallsCount = getCollapsedGrid.mock.calls.length;

        simulateScroll(tree, scrollArgs);

        if (shouldRerender) {
          expect(getCollapsedGrid.mock.calls.length).toBeGreaterThan(initialCallsCount);
        } else {
          expect(getCollapsedGrid.mock.calls.length).toBe(initialCallsCount);
        }
      };

      it('should not re-render on horizontal scroll bounce', () => {
        assertRerenderOnBounce(false, {
          scrollLeft: 200,
          clientWidth: 400,
          scrollWidth: 500,
          scrollTop: 0,
        });
      });

      it('should not re-render on vertical scroll bounce', () => {
        assertRerenderOnBounce(false, {
          scrollTop: 200,
          clientHeight: 400,
          scrollHeight: 500,
          scrollLeft: 0,
        });
      });

      it('should normalize scroll position in the Edge browser', () => {
        isEdgeBrowser.mockReturnValue(true);

        assertRerenderOnBounce(true, {
          scrollLeft: 201,
          clientWidth: 200,
          scrollWidth: 400,
          scrollTop: 0,
        });
      });

      it('should normalize scroll position in the Edge by 1px only', () => {
        isEdgeBrowser.mockReturnValue(true);

        assertRerenderOnBounce(false, {
          scrollLeft: 202,
          clientWidth: 200,
          scrollWidth: 400,
          scrollTop: 0,
        });
      });
    });
  });

  describe('row heights', () => {
    it('should specify correct row height at startup', () => {
      expect.hasAssertions();

      const rows = [
        { key: 1 },
        { key: 2, height: 10 },
      ];

      getCollapsedGrid
        .mockImplementationOnce((args) => {
          const { getRowHeight } = args;
          expect(getRowHeight(rows[0]))
            .toEqual(defaultProps.estimatedRowHeight);
          expect(getRowHeight(rows[1]))
            .toEqual(10);

          return require.requireActual('@devexpress/dx-grid-core').getCollapsedGrid(args);
        });

      mount((
        <VirtualTableLayout
          {...defaultProps}
          bodyRows={rows}
        />
      ));
    });

    it('should store row height when rendered', () => {
      const rows = [
        { key: 1 },
        { key: 2, height: 10 },
      ];

      findDOMNode.mockImplementation(() => ({
        getBoundingClientRect: () => ({
          height: 50,
        }),
      }));

      mount((
        <VirtualTableLayout
          {...defaultProps}
          bodyRows={rows}
        />
      ));

      const { getRowHeight } = getCollapsedGrid.mock.calls[0][0];
      expect(getRowHeight(rows[0]))
        .toEqual(50);
      expect(getRowHeight(rows[1]))
        .toEqual(50);
    });

    it('should clear row height when rows updated', () => {
      const rows = [
        { key: 11 },
        { key: 12 },
      ];

      findDOMNode.mockImplementation(() => ({
        getBoundingClientRect: () => ({
          height: 50,
        }),
      }));

      const tree = mount((
        <VirtualTableLayout
          {...defaultProps}
          bodyRows={rows.slice(0, 2)}
        />
      ));
      tree.setProps({ bodyRows: [rows[0]] });

      const { getRowHeight } = getCollapsedGrid.mock.calls[0][0];
      expect(getRowHeight(rows[1]))
        .toEqual(defaultProps.estimatedRowHeight);
    });
  });
});
