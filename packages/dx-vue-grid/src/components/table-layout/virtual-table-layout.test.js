import { shallow, mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { getCollapsedGrid } from '@devexpress/dx-grid-core';
import { VirtualTableLayout } from './virtual-table-layout';

jest.mock('@devexpress/dx-grid-core', () => {
  const actual = require.requireActual('@devexpress/dx-grid-core');
  jest.spyOn(actual, 'getCollapsedGrid');
  return actual;
});
jest.mock('./column-group', () => ({
  ColumnGroup: () => null,
}));
jest.mock('@devexpress/dx-vue-core', () => ({
  DxRefHolder: {
    name: 'DxRefHolder',
    render() {
      return this.$slots.default[0];
    },
  },
  DxSizer: {
    name: 'DxSizer',
    render() {
      return this.$scopedSlots.default({ width: 800 });
    },
  },
}));

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
  containerComponent: { render() { return <div>{this.$slots.default}</div>; } },
  headTableComponent: { render() { return <table>{this.$slots.default}</table>; } },
  tableComponent: { render() { return <table>{this.$slots.default}</table>; } },
  headComponent: { render() { return <table>{this.$slots.default}</table>; } },
  bodyComponent: { render() { return <tbody>{this.$slots.default}</tbody>; } },
  rowComponent: { name: 'Row', render() { return <tr>{this.$slots.default}</tr>; } },
  cellComponent: { name: 'Cell', render() { return <td />; } },
  getCellColSpan: () => 1,
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

    // eslint-disable-next-line no-param-reassign
    tree.find(defaultProps.containerComponent).element.target = target;
    // eslint-disable-next-line no-param-reassign
    tree.find(defaultProps.containerComponent).element.currentTarget = target;

    tree.find(defaultProps.containerComponent).vm.$emit('scroll', eventData);
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

    expect(tree.vm.$el)
      .toMatchSnapshot();
  });

  describe('viewport', () => {
    it('should pass correct viewport at startup', () => {
      shallow({
        render() {
          return (
            <VirtualTableLayout
              {...{ attrs: { ...defaultProps } }}
              headerRows={defaultProps.bodyRows.slice(0, 1)}
            />
          );
        },
      });

      expect(getCollapsedGrid.mock.calls[getCollapsedGrid.mock.calls.length - 2][0])
        .toMatchObject({
          top: 0,
          left: 0,
          height: defaultProps.estimatedRowHeight,
          width: 800,
        });
      expect(getCollapsedGrid.mock.calls[getCollapsedGrid.mock.calls.length - 1][0])
        .toMatchObject({
          top: 0,
          left: 0,
          height: defaultProps.height - defaultProps.estimatedRowHeight,
          width: 800,
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

          return require.requireActual('@devexpress/dx-grid-core').getCollapsedGrid(args);
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

    it('should clear row height when rows updated', () => {
      const rows = [
        { key: 11 },
        { key: 12, height: 30 },
      ];

      const tree = mount(VirtualTableLayout, { propsData: { ...defaultProps, headerRows: rows } });
      tree.setProps({ bodyRows: [rows[0]] });

      const { getRowHeight } = getCollapsedGrid.mock.calls[0][0];
      expect(getRowHeight(rows[0]))
        .toEqual(defaultProps.estimatedRowHeight);
      expect(getRowHeight(rows[1]))
        .toEqual(30);
    });

    it('should clear row height when headerRows updated', () => {
      const rows = [
        { key: 11 },
        { key: 12 },
      ];

      const tree = mount(VirtualTableLayout, { propsData: { ...defaultProps, headerRows: rows } });
      tree.setProps({ headerRows: [rows[0]] });

      const { getRowHeight } = getCollapsedGrid.mock.calls[0][0];
      expect(getRowHeight(rows[1]))
        .toEqual(defaultProps.estimatedRowHeight);
    });
  });
});
