import { findDOMNode } from 'react-dom';
import { shallow, mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { VirtualTableLayout } from './virtual-table-layout';
import { getCollapsedGrid } from './virtual-table-utils';

jest.mock('react-dom', () => ({
  findDOMNode: jest.fn(),
}));
jest.mock('./virtual-table-utils', () => {
  const actual = require.requireActual('./virtual-table-utils');
  jest.spyOn(actual, 'getCollapsedGrid');
  return actual;
});
jest.mock('./column-group', () => ({
  ColumnGroup: () => null,
}));
jest.mock('@devexpress/dx-vue-core', () => {
  return {
    // Sizer: ({ children }) => children({ width: 400, height: 100 }),
    Sizer: { name: 'Sizer', render() { return this.$scopedSlots.default({ width: 400, height: 100 }); } },
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
  ],
  containerComponent: { render() { return <div />; } },
  headTableComponent: { render() { return <table />; } },
  tableComponent: { render() { return <table />; } },
  headComponent: { render() { return <table />; } },
  bodyComponent: { render() { return <tbody />; } },
  rowComponent: { name: 'Row', render() { return null; } },
  cellComponent: { name: 'Cell', render() { return null; } },
  getCellColSpan: () => 1,
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

    debugger
    tree.find(defaultProps.containerComponent).element.target = target;
    tree.find(defaultProps.containerComponent).element.currentTarget = target;

    tree.find(defaultProps.containerComponent).vm.$listeners.scroll(eventData);
    // tree.find(defaultProps.containerComponent).trigger('scroll');
    tree.update();
  };

  it('should render correct layout', () => {
    const tree = shallow({
      render() {
        return (
          <VirtualTableLayout
            {...{ attrs: { ...defaultProps } }}
            headerRows={defaultProps.bodyRows.slice(0, 1)}
          />
        );
      },
    });

    expect(tree.find('Sizer'))
      .toMatchSnapshot();
  });

  describe('viewport', () => {
    it('should pass correct viewport at startup', () => {
      const tree = shallow({
        render() {
          return (
            <VirtualTableLayout
              {...{ attrs: { ...defaultProps } }}
              headerRows={defaultProps.bodyRows.slice(0, 1)}
            />
          );
        },
      });

      tree.find('Sizer');

      expect(getCollapsedGrid.mock.calls[getCollapsedGrid.mock.calls.length - 2][0])
        .toMatchObject({
          top: 0,
          left: 0,
          height: defaultProps.estimatedRowHeight,
          width: 400,
        });
      expect(getCollapsedGrid.mock.calls[getCollapsedGrid.mock.calls.length - 1][0])
        .toMatchObject({
          top: 0,
          left: 0,
          height: defaultProps.height - defaultProps.estimatedRowHeight,
          width: 400,
        });
    });

    it('should pass correct viewport at on viewport change', () => {
      const tree = mount({
        render() {
          return (
            <VirtualTableLayout
              {...{ attrs: { ...defaultProps } }}
              headerRows={defaultProps.bodyRows.slice(0, 1)}
            />
          );
        },
      });

      simulateScroll(tree, { scrollTop: 100, scrollLeft: 50 });

      tree.find('Sizer');
      expect(getCollapsedGrid.mock.calls[getCollapsedGrid.mock.calls.length - 2][0])
        .toMatchObject({
          top: 0,
          left: 50,
        });
      expect(getCollapsedGrid.mock.calls[getCollapsedGrid.mock.calls.length - 1][0])
        .toMatchObject({
          top: 100,
          left: 50,
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

          return require.requireActual('./virtual-table-utils').getCollapsedGrid(args);
        });

      mount({
        render() {
          return (
            <VirtualTableLayout
              {...{ attrs: { ...defaultProps } }}
              bodyRows={rows}
            />
          );
        },
      });
    });

    fit('should store row height when rendered', () => {
      const rows = [
        { key: 1 },
        { key: 2, height: 10 },
      ];

      findDOMNode.mockImplementation(() => ({
        getBoundingClientRect: () => ({
          height: 50,
        }),
      }));

      mount({
        render() {
          return (
            <VirtualTableLayout
              {...{ attrs: { ...defaultProps } }}
              bodyRows={rows}
            />
          );
        },
      });

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
          bodyRows={rows}
        />
      ));
      tree.setProps({ bodyRows: [rows[0]] });

      const { getRowHeight } = getCollapsedGrid.mock.calls[0][0];
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
          headerRows={rows}
        />
      ));
      tree.setProps({ headerRows: [rows[0]] });

      const { getRowHeight } = getCollapsedGrid.mock.calls[0][0];
      expect(getRowHeight(rows[1]))
        .toEqual(defaultProps.estimatedRowHeight);
    });
  });
});
