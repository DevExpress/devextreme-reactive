import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Sizer } from '@devexpress/dx-react-core';
import {
  getCollapsedGrids,
  TABLE_FLEX_TYPE,
  emptyViewport,
  getScrollLeft,
} from '@devexpress/dx-grid-core';
import { setupConsole } from '@devexpress/dx-testing';
import { VirtualTableLayout } from './virtual-table-layout';

jest.mock('@devexpress/dx-grid-core', () => {
  const actual = jest.requireActual('@devexpress/dx-grid-core');
  jest.spyOn(actual, 'getCollapsedGrids');
  jest.spyOn(actual, 'getColumnWidthGetter');
  jest.spyOn(actual, 'getScrollLeft');
  return actual;
});
jest.mock('./column-group', () => ({
  ColumnGroup: () => null,
}));
jest.mock('@devexpress/dx-react-core', () => {
  const { Component } = jest.requireActual('react');
  return {
    ...jest.requireActual('@devexpress/dx-react-core'),
    Sizer: class extends Component {
      componentDidMount() {
        // eslint-disable-next-line react/prop-types
        const { onSizeChange } = this.props;
        onSizeChange({ width: 400, height: 120 });
      }

      render() {
        const {
          containerComponent: Container,
          onSizeChange,
          scrollTop,
          scrollLeft,
          ...restProps
        } = this.props;
        return (
          <Container {...restProps} />
        );
      }
    },
  };
});

// tslint:disable-next-line: max-classes-per-file
class VirtualTableLayoutWrapper extends React.Component<any, any> {
  state = {
    viewport: emptyViewport,
  };
  setViewport = viewport => this.setState({ viewport });

  render() {
    const { viewport } = this.state;
    return (
      <VirtualTableLayout
        {...this.props}
        setViewport={this.setViewport}
        viewport={viewport}
      />
    );
  }
}

const getBoundingClientRect = () => ({
  height: 50,
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
  viewport: {
    top: 0,
    left: 0,
    width: 400,
    height: 120,
    columns: [[0, 4]],
    rows: [0, 5],
    headerRows: [0, 0],
    footerRows: [0, 0],
  },
  setViewport: jest.fn(),
  loadedRowsStart: 0,
  totalRowCount: 9,
  containerComponent: ({ forwardedRef, ...props }) => <div {...props} />,
  headTableComponent: ({ forwardedRef, ...props }) => <table {...props} />,
  footerTableComponent: ({ forwardedRef, ...props }) => <table {...props} />,
  tableComponent: ({ forwardedRef, ...props }) => {
    (forwardedRef as any).current = { getBoundingClientRect };
    return <table {...props} />;
  },
  headComponent: props => <thead {...props} />,
  bodyComponent: props => <tbody {...props} />,
  rowComponent: ({ forwardedRef }) => {
    (forwardedRef as any)({ getBoundingClientRect });
    return null;
  },
  cellComponent: () => null,
  getCellColSpan: () => 1,
  tableRef: React.createRef<HTMLTableElement>(),
};

describe('VirtualTableLayout', () => {
  let resetConsole;
  beforeEach(() => {
    resetConsole = setupConsole();
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

  it('should provide scrollTop property', () => {
    const scrollTop = 100;
    const tree = shallow((
      <VirtualTableLayout
        {...defaultProps}
        headerRows={defaultProps.bodyRows.slice(0, 1)}
        footerRows={defaultProps.bodyRows.slice(0, 1)}
        scrollTop={scrollTop}
      />
    ));

    expect(tree.find(Sizer).prop('scrollTop'))
      .toEqual(scrollTop);
  });

  it('should provide scrollLeft property', () => {
    const nextColumnId = Symbol('left');
    getScrollLeft.mockImplementation(() => 50);
    const tree = shallow(
      <VirtualTableLayout
        {...defaultProps}
        headerRows={defaultProps.bodyRows.slice(0, 1)}
        footerRows={defaultProps.bodyRows.slice(0, 1)}
        nextColumnId={nextColumnId}
      />,
    );

    expect(tree.find(Sizer).prop('scrollLeft'))
      .toEqual(50);

    expect(getScrollLeft).toBeCalledWith(5, 120, nextColumnId);
  });

  it('should not render width for a flex column', () => {
    const columns = [
      { key: 'col0', width: 100 },
      { key: 'col1', width: 100 },
      { key: 'col_flex', type: TABLE_FLEX_TYPE },
    ];
    const rows = [{ key: 0 }];

    getCollapsedGrids
      .mockImplementationOnce((args) => {
        const result = jest.requireActual('@devexpress/dx-grid-core').getCollapsedGrids(args);

        expect(result.bodyGrid.columns.find(col => col.key === 'col_flex').width)
          .toBe(null);

        return result;
      });

    mount((
      <VirtualTableLayout
        {...defaultProps}
        headerRows={rows}
        columns={columns}
        viewport={{
          ...defaultProps.viewport,
          columns: [[0, 2]],
        }}
      />
    ));
  });

  describe('viewport', () => {
    it('should pass correct viewport at startup', () => {
      const tree = mount((
        <VirtualTableLayout
          {...defaultProps}
          headerRows={defaultProps.bodyRows.slice(0, 2)}
          footerRows={defaultProps.bodyRows.slice(0, 2)}
        />
      ));

      expect(tree.find(defaultProps.containerComponent).props().style)
        .toMatchObject({ height: defaultProps.height });

      expect(getCollapsedGrids).toBeCalledTimes(2);
      expect(getCollapsedGrids.mock.calls[getCollapsedGrids.mock.calls.length - 1][0])
        .toMatchObject({
          viewportLeft: 0,
          containerWidth: 400,
          viewport: {
            columns: [[0, 4]],
            footerRows: [0, 0],
            headerRows: [0, 0],
            rows: [0, 5],
          },
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

    it('should recalculate viewport on scroll', () => {
      const tree = mount((
        <VirtualTableLayout
          {...defaultProps}
          headerRows={defaultProps.bodyRows.slice(0, 1)}
        />
      ));

      simulateScroll(tree, { scrollTop: 100, scrollLeft: 250 });

      const setViewportMock = defaultProps.setViewport.mock;
      expect(setViewportMock.calls[setViewportMock.calls.length - 1][0])
        .toMatchObject({
          top: 100,
          left: 250,
          columns: [[1, 4]],
          footerRows: [0, 0],
          headerRows: [0, 0],
          rows: [2, 4],
        });
    });

    it('should update viewport if column count changed', () => {
      const tree = mount((
        <VirtualTableLayout
          {...defaultProps}
        />
      ));
      const setViewportMock = defaultProps.setViewport.mock;
      const initialCallCount = setViewportMock.calls.length;

      tree.setProps({ columns: defaultProps.columns.slice(0, 3) });

      expect(setViewportMock.calls.length)
        .toBeGreaterThan(initialCallCount);
    });

    it('should not update viewport if it is not changed', () => {
      const tree = mount((
        <VirtualTableLayout
          {...defaultProps}
          bodyRows={defaultProps.bodyRows.slice(0, 4)}
          viewport={{
            ...defaultProps.viewport,
            rows: [0, 2],
          }}
        />
      ));

      tree.setProps({ bodyRows: defaultProps.bodyRows.slice(4, 9) });

      expect(defaultProps.setViewport).not.toHaveBeenCalled();
    });

    describe('scroll bounce', () => {
      const assertRerenderOnBounce = (shouldRerender, scrollArgs) => {
        const tree = mount((
          <VirtualTableLayoutWrapper
            {...defaultProps}
            headerRows={defaultProps.bodyRows.slice(0, 1)}
          />
        ));
        const initialCallsCount = getCollapsedGrids.mock.calls.length;

        simulateScroll(tree, scrollArgs);

        if (shouldRerender) {
          expect(getCollapsedGrids.mock.calls.length).toBeGreaterThan(initialCallsCount);
        } else {
          expect(getCollapsedGrids.mock.calls.length).toBe(initialCallsCount);
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

      it('should normalize scroll position', () => {
        assertRerenderOnBounce(true, {
          scrollLeft: 201,
          clientWidth: 200,
          scrollWidth: 400,
          scrollTop: 0,
        });
      });

      it('should normalize scroll position by 1px only', () => {
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

      getCollapsedGrids
        .mockImplementationOnce((args) => {
          const { getRowHeight } = args;
          expect(getRowHeight(rows[0]))
            .toEqual(defaultProps.estimatedRowHeight);
          expect(getRowHeight(rows[1]))
            .toEqual(10);

          return jest.requireActual('@devexpress/dx-grid-core').getCollapsedGrids(args);
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

      mount((
        <VirtualTableLayout
          {...defaultProps}
          bodyRows={rows}
        />
      ));

      const { getRowHeight } = getCollapsedGrids.mock.calls[0][0];
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

      const tree = mount((
        <VirtualTableLayout
          {...defaultProps}
          bodyRows={rows.slice(0, 2)}
        />
      ));
      tree.setProps({ bodyRows: [rows[0]] });

      const { getRowHeight } = getCollapsedGrids.mock.calls[0][0];
      expect(getRowHeight(rows[1]))
        .toEqual(defaultProps.estimatedRowHeight);
    });
  });
});
