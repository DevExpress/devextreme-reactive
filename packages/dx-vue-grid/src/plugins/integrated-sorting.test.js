import { mount } from '@vue/test-utils';
import { PluginHost } from '@devexpress/dx-vue-core';
import { sortedRows } from '@devexpress/dx-grid-core';
import { IntegratedSorting } from './integrated-sorting';
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
  plugins: ['SortingState'],
};

jest.mock('@devexpress/dx-grid-core', () => ({
  sortedRows: jest.fn(),
}));

describe('IntegratedSorting', () => {
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
          <PluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <IntegratedSorting />
          </PluginHost>
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
