import { shallow } from '@vue/test-utils';
import { getTableRowColumnsWithColSpan } from '@devexpress/dx-grid-core';
import { setupConsole } from '@devexpress/dx-testing';
import { RowLayout } from './row-layout';

jest.mock('@devexpress/dx-grid-core', () => ({
  getTableRowColumnsWithColSpan: jest.fn(),
}));

const defaultProps = {
  row: { key: 1, rowId: 1, height: 20 },
  columns: [
    { key: 'a', column: { name: 'a' } },
    { key: 'b', column: { name: 'b' } },
    { key: 'c', column: { name: 'c' } },
    { key: 'd', column: { name: 'd' } },
  ],
  rowComponent: { name: 'Row', render() { return <div>{this.$slots.default}</div>; } },
  cellComponent: { name: 'Cell', render() { return <div/>; } },
  getCellColSpan: () => 1,
};

describe('RowLayout', () => {
  let resetConsole;
  beforeEach(() => {
    resetConsole = setupConsole();
    getTableRowColumnsWithColSpan.mockImplementation(() => defaultProps.columns);
  });

  afterEach(() => {
    resetConsole();
    jest.resetAllMocks();
  });

  it('should render the "rowComponent" with correct properties', () => {
    const tree = shallow({
      render() {
        return (
          <RowLayout
            {...{ attrs: { ...defaultProps } }}
          />
        );
      },
    });

    expect(tree.find(defaultProps.rowComponent).vm.$attrs)
      .toMatchObject({
        tableRow: defaultProps.row,
      });

    expect(tree.find(defaultProps.rowComponent).attributes())
      .toMatchObject({
        style: 'height: 20px;',
      });
  });

  it('should render the "cellComponent" for each column', () => {
    expect.hasAssertions();

    const tree = shallow({
      render() {
        return (
          <RowLayout
            {...{ attrs: { ...defaultProps } }}
          />
        );
      },
    });

    tree.findAll(defaultProps.cellComponent).wrappers.forEach((component, index) => {
      const column = defaultProps.columns[index];
      expect(component.vm.$attrs)
        .toMatchObject({
          tableRow: defaultProps.row,
          tableColumn: column,
        });
    });
  });
});
