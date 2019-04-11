import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { mount } from 'enzyme';
import { isEdgeBrowser } from '@devexpress/dx-core';
import { PluginHost, Sizer, Template } from '@devexpress/dx-react-core';
import {
  getColumnWidthGetter,
  getVisibleRowsBounds,
  getRowsRenderBoundary,
} from '@devexpress/dx-grid-core';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { VirtualTableViewport } from './virtual-table-viewport';

jest.mock('react-dom', () => ({
  findDOMNode: jest.fn(),
}));
jest.mock('@devexpress/dx-core', () => {
  return {
    ...require.requireActual('@devexpress/dx-core'),
    isEdgeBrowser: jest.fn(),
  };
});
jest.mock('@devexpress/dx-react-core', () => {
  const { Component } = require.requireActual('react');
  return {
    ...require.requireActual('@devexpress/dx-react-core'),
    Sizer: class extends React.Component {
      componentDidMount() {
        const { onSizeChange } = this.props;
        onSizeChange({ width: 600, height: 120 });
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
        const { children: propsChildren } = this.props;
        return propsChildren;
      }
    },
  };
});

jest.mock('@devexpress/dx-grid-core', () => {
  const actual = require.requireActual('@devexpress/dx-grid-core');
  jest.spyOn(actual, 'getCollapsedGrid');
  jest.spyOn(actual, 'getColumnWidthGetter');
  jest.spyOn(actual, 'getVisibleRowsBounds');
  jest.spyOn(actual, 'getRowsRenderBoundary');
  return actual;
});

describe('VirtualTableViewport', () => {
  beforeEach(() => {
    getVisibleRowsBounds.mockReturnValue({ start: 0, end: 0 });
  });

  afterEach(jest.resetAllMocks);

  const Container = props => <div {...props} />;
  const defaultDeps = {
    getter: {
      getRowId: row => row.key,
      columns: [
        { key: 'a', column: { name: 'a' } },
        { key: 'b', column: { name: 'b' } },
        { key: 'c', column: { name: 'c' } },
      ],
      tableColumns: [
        { key: 'a', column: { name: 'a' } },
        { key: 'b', column: { name: 'b' } },
        { key: 'c', column: { name: 'c' } },
      ],
      rows: [
        { key: 1 },
        { key: 2 },
        { key: 3 },
      ],
      tableBodyRows: [
        { key: 1 },
        { key: 2 },
        { key: 3 },
      ],
      loadedRowsStart: 'loadedRowsStart',
    },
    action: {
      ensureNextVirtualPage: jest.fn(),
    },
    template: {
      tableLayout: {
        containerComponent: Container,
      },
    },
  };
  const defaultProps = {
    minColumnWidth: 120,
    height: 100,
    estimatedRowHeight: 40,
  };
  const createViewportWithMock = () => {
    const tableLayoutTemplateMock = jest.fn().mockReturnValue(null);
    const Viewport = (
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Template name="tableLayout">
          {tableLayoutTemplateMock}
        </Template>
        <VirtualTableViewport {...defaultProps} />
      </PluginHost>
    );
    return {
      Viewport,
      tableLayoutTemplateMock,
    };
  };

  describe('Sizer container', () => {
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
        .find(Container)
        .prop('onScroll')(eventData);
      tree.update();
    };

    it('should update layout height from props', () => {
      const WrappedViewport = ({ height }) => (
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <VirtualTableViewport height={height} />
        </PluginHost>
      );
      const tree = mount((
        <WrappedViewport height={200} />
      ));
      expect(tree.find(Container).prop('style'))
        .toMatchObject({
          height: '200px',
        });

      tree.setProps({ height: 300 });
      tree.update();

      expect(tree.find(Container).prop('style'))
      .toMatchObject({
        height: '300px',
      });
    });

    it('should apply auto height', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <VirtualTableViewport {...defaultProps} height={'auto'}/>
        </PluginHost>
      ));

      expect(tree.find(Container).prop('style').height)
        .toBeUndefined();
    });

    it('should recompute row render boundaries on scroll', () => {
      const { Viewport, tableLayoutTemplateMock } = createViewportWithMock();
      getVisibleRowsBounds.mockImplementation(({ viewportTop }) => ({
        start: viewportTop,
        end: viewportTop,
      }));
      getRowsRenderBoundary.mockImplementation((_, visibleBounds) => (visibleBounds));
      const tree = mount(Viewport);

      simulateScroll(tree, { scrollTop: 100, scrollLeft: 50 });

      const calls = tableLayoutTemplateMock.mock.calls;
      expect(calls[calls.length - 2][0].renderRowBoundaries)
        .toEqual([0, 0]);

      expect(calls[calls.length - 1][0].renderRowBoundaries)
        .toEqual([100, 100]);
    });

    describe('scroll bounce', () => {
      let tableLayoutTemplateMock;
      let Viewport;
      beforeEach(() => {
        const vp = createViewportWithMock();
        tableLayoutTemplateMock = vp.tableLayoutTemplateMock;
        Viewport = vp.Viewport;
      });

      const assertRerenderOnBounce = (shouldRerender, scrollArgs) => {
        const tree = mount(Viewport);
        const initialCallsCount = tableLayoutTemplateMock.mock.calls.length;

        simulateScroll(tree, scrollArgs);

        if (shouldRerender) {
          expect(tableLayoutTemplateMock.mock.calls.length).toBeGreaterThan(initialCallsCount);
        } else {
          expect(tableLayoutTemplateMock.mock.calls.length).toBe(initialCallsCount);
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

  describe('VirtualTableLayout template', () => {
    let tableLayoutTemplateMock;
    let Viewport;
    beforeEach(() => {
      const vp = createViewportWithMock();
      tableLayoutTemplateMock = vp.tableLayoutTemplateMock;
      Viewport = vp.Viewport;
    });

    it('should pass handler functions', () => {
      mount(Viewport);

      expect(tableLayoutTemplateMock.mock.calls[0][0])
        .toMatchObject({
          blockRefsHandler: expect.any(Function),
          rowRefsHandler: expect.any(Function),
          onUpdate: expect.any(Function),
          getRowHeight: expect.any(Function),
        });
    });

    it('should pass remote data info', () => {
      getRowsRenderBoundary.mockReturnValue('rowsRenderBoundary');

      mount(Viewport);

      expect(tableLayoutTemplateMock.mock.calls[0][0])
        .toMatchObject({
          renderRowBoundaries: 'rowsRenderBoundary',
          totalRowCount: 3,
          loadedRowsStart: 'loadedRowsStart',
        });
    });

    it('should pass container dimensions from state', () => {
      mount(Viewport);

      expect(tableLayoutTemplateMock.mock.calls[0][0])
        .toMatchObject({
          containerHeight: 600,
          containerWidth: 800,
        });
    });

    it('should pass grid dimension from state', () => {
      const gridDimensions = {
        headerHeight: 80,
        bodyHeight: 500,
        footerHeight: 100,
        containerHeight: 900,
        containerWidth: 1000,
        viewportLeft: 200,
      };

      const tree = mount(Viewport);

      tree.find(VirtualTableViewport).setState(gridDimensions);
      tree.update();

      expect(tableLayoutTemplateMock.mock.calls[tableLayoutTemplateMock.mock.calls.length - 1][0])
        .toMatchObject(gridDimensions);
    });

    it('should use getColumnWidthGetter', () => {
      const getColumnWidth = () => 0;
      getColumnWidthGetter.mockImplementation(() => getColumnWidth);

      mount(Viewport);

      expect(tableLayoutTemplateMock.mock.calls[0][0].getColumnWidth)
        .toBe(getColumnWidth);
    });
  });

  describe('row heights', () => {
    let tableLayoutTemplateMock;
    let Viewport;
    beforeEach(() => {
      const vp = createViewportWithMock();
      Viewport = vp.Viewport;
      tableLayoutTemplateMock = vp.tableLayoutTemplateMock;
    });

    it('should specify correct row height at startup', () => {
      expect.hasAssertions();

      const rows = [
        { key: 1 },
        { key: 2, height: 10 },
      ];

      tableLayoutTemplateMock
        .mockImplementation(({ getRowHeight }) => {
          expect(getRowHeight(rows[0]))
            .toEqual(defaultProps.estimatedRowHeight);
          expect(getRowHeight(rows[1]))
            .toEqual(10);
        });

      mount(Viewport);
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

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <VirtualTableViewport {...defaultProps} />
        </PluginHost>
      ));

      mount(Viewport);
      const {
        getRowHeight, rowRefsHandler, onUpdate,
      } = tableLayoutTemplateMock.mock.calls[0][0];
      rows.forEach(rowRefsHandler); // simulate rendering
      onUpdate();

      expect(getRowHeight(rows[0]))
        .toEqual(50);
      expect(getRowHeight(rows[1]))
        .toEqual(50);
    });

    fit('should clear row heights when rows updated', () => {
      const rows = [
        { key: 11 },
        { key: 12 },
      ];
      findDOMNode.mockImplementation(() => ({
        getBoundingClientRect: () => ({
          height: 50,
        }),
      }));

      mount(Viewport);
      const {
        getRowHeight, rowRefsHandler, onUpdate,
      } = tableLayoutTemplateMock.mock.calls[0][0];
      rows.forEach((row) => {
        rowRefsHandler(row, {}); // simulate rendering
      });
      onUpdate();
      rowRefsHandler(rows[0], {}); // row rerendered
      rowRefsHandler(rows[1], null); // row removed
      onUpdate();

      expect(getRowHeight(rows[1]))
        .toEqual(defaultProps.estimatedRowHeight);
    });

    it('should clear row height when headerRows updated', () => {
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
          headerRows={rows.slice(0, 2)}
          bodyRows={rows.slice(2, 1)}
        />
      ));
      tree.setProps({ headerRows: [rows[0]] });

      const { getRowHeight } = getCollapsedGrid.mock.calls[0][0];
      expect(getRowHeight(rows[1]))
        .toEqual(defaultProps.estimatedRowHeight);
    });

    it('should clear row height when footerRows updated', () => {
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
          bodyRows={rows.slice(2, 1)}
          footerRows={rows.slice(0, 2)}
        />
      ));
      tree.setProps({ footerRows: [rows[0]] });

      const calls = getCollapsedGrid.mock.calls;
      const { getRowHeight } = getCollapsedGrid.mock.calls[0][0];
      expect(getRowHeight(rows[1]))
        .toEqual(defaultProps.estimatedRowHeight);
    });
  });

  it('should use getColumnWidthGetter', () => {
    const getColumnWidth = () => 0;
    getColumnWidthGetter.mockImplementationOnce(() => getColumnWidth);

    mount((
      <VirtualTableLayout
        {...defaultProps}
      />
    ));

    expect(getCollapsedGrid.mock.calls[0][0])
      .toMatchObject({
        getColumnWidth,
      });
  });
});
