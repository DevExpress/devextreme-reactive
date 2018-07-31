import { mount } from '@vue/test-utils';
import { DxPluginHost } from '@devexpress/dx-vue-core';
import { sortedRows } from '@devexpress/dx-grid-core';
import { DxIntegratedSorting } from './integrated-sorting';
import { PluginDepsToComponents } from './test-utils';

const defaultDeps = {
  getter: {
    rows: [{ id: 0 }, { id: 1 }],
    columns: ['a', 'b'],
    getCellValue: jest.fn(),
    isGroupRow: true,
    getRowLevelKey: jest.fn(),
    sorting: [{ columnName: 'name' }],
  },
  plugins: ['DxSortingState'],
};

jest.mock('@devexpress/dx-grid-core', () => ({
  sortedRows: jest.fn(),
}));

describe('DxIntegratedSorting', () => {
  beforeEach(() => {
    sortedRows.mockImplementation(() => 'sortedRows');
  });

  afterEach(() => {
    sortedRows.mockClear();
  });

  it('should exec sortedRows with correct arguments', () => {
    mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxIntegratedSorting />
          </DxPluginHost>
        );
      },
    });
    expect(sortedRows).toHaveBeenCalledTimes(1);

    expect(sortedRows).toBeCalledWith(
      defaultDeps.getter.rows,
      defaultDeps.getter.sorting,
      defaultDeps.getter.getCellValue,
      expect.any(Function),
      defaultDeps.getter.isGroupRow,
      defaultDeps.getter.getRowLevelKey,
    );
  });
});
