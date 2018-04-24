import { shallow } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { RowsBlockLayout } from './rows-block-layout';
import { RowLayout } from './row-layout';

const defaultProps = {
  rows: [
    { key: 1, rowId: 1 },
    { key: 2, rowId: 2 },
    { key: 3, rowId: 3 },
  ],
  columns: [
    { key: 'a', column: { name: 'a' } },
    { key: 'b', column: { name: 'b' } },
    { key: 'c', column: { name: 'c' } },
    { key: 'd', column: { name: 'd' } },
  ],
  blockComponent: { name: 'Block', render() { return <div>{this.$slots.default}</div>; } },
  rowComponent: { name: 'Row', render() { return null; } },
  cellComponent: { name: 'Cell', render() { return null; } },
  getCellColSpan: () => 1,
};

describe('RowsBlockLayout', () => {
  let resetConsole;
  beforeEach(() => {
    resetConsole = setupConsole();
  });

  afterEach(() => {
    resetConsole();
  });

  it('should render the "blockComponent"', () => {
    const tree = shallow({
      render() {
        return (
          <RowsBlockLayout
            {...{ attrs: { ...defaultProps } }}
          />
        );
      },
    });

    expect(tree.find(defaultProps.blockComponent).exists());
  });

  it('should render RowLayout for each row', () => {
    expect.hasAssertions();

    const tree = shallow({
      render() {
        return (
          <RowsBlockLayout
            {...{ attrs: { ...defaultProps } }}
          />
        );
      },
    });

    tree.findAll(RowLayout).wrappers.forEach((component, index) => {
      expect(component.props())
        .toMatchObject({
          row: defaultProps.rows[index],
          columns: defaultProps.columns,
          rowComponent: defaultProps.rowComponent,
          cellComponent: defaultProps.cellComponent,
          getCellColSpan: defaultProps.getCellColSpan,
        });
    });
  });
});
