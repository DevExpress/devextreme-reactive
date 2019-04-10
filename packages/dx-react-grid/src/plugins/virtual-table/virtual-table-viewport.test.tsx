import * as React from 'react';
import { mount } from 'enzyme';
import { isEdgeBrowser } from '@devexpress/dx-core';
import { PluginHost, Sizer, Template } from '@devexpress/dx-react-core';
import {
  getColumnWidthGetter,
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
  jest.spyOn(actual, 'getRowsRenderBoundary');
  return actual;
});

describe('VirtualTableViewport', () => {
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

    describe('scroll bounce', () => {
      let tableLayoutTemplateMock;
      let Tree;
      beforeEach(() => {
        tableLayoutTemplateMock = jest.fn().mockReturnValue(null);
        Tree = (
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <Template name="tableLayout">
              {tableLayoutTemplateMock}
            </Template>
            <VirtualTableViewport {...defaultProps} />
          </PluginHost>
        );
      });

      afterEach(jest.resetAllMocks);

      const assertRerenderOnBounce = (shouldRerender, scrollArgs) => {
        const tree = mount(Tree);
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
    let Tree;
    beforeEach(() => {
      tableLayoutTemplateMock = jest.fn().mockReturnValue(null);
      Tree = (
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <Template name="tableLayout">
            {tableLayoutTemplateMock}
          </Template>
          <VirtualTableViewport {...defaultProps} />
        </PluginHost>
      );
    });

    afterEach(jest.resetAllMocks);

    it('should pass handler functions', () => {
      mount(Tree);

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

      mount(Tree);

      expect(tableLayoutTemplateMock.mock.calls[0][0])
        .toMatchObject({
          renderRowBoundaries: 'rowsRenderBoundary',
          totalRowCount: 3,
          loadedRowsStart: 'loadedRowsStart',
        });
    });

    it('should pass container dimensions from state', () => {
      mount(Tree);

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

      const tree = mount(Tree);

      tree.find(VirtualTableViewport).setState(gridDimensions);
      tree.update();

      expect(tableLayoutTemplateMock.mock.calls[tableLayoutTemplateMock.mock.calls.length - 1][0])
        .toMatchObject(gridDimensions);
    });

    it('should use getColumnWidthGetter', () => {
      const getColumnWidth = () => 0;
      getColumnWidthGetter.mockImplementation(() => getColumnWidth);

      mount(Tree);

      expect(tableLayoutTemplateMock.mock.calls[0][0].getColumnWidth)
        .toBe(getColumnWidth);
    });
  });

});
