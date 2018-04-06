import { mount } from '@vue/test-utils';
import { PluginHost } from '@devexpress/dx-vue-core';
import { filteredRows } from '@devexpress/dx-grid-core';
import { IntegratedFiltering } from './integrated-filtering';
import { PluginDepsToComponents } from './test-utils';

const defaultDeps = {
  getter: {
    rows: [{ id: 0 }, { id: 1 }],
    columns: ['a', 'b'],
    getCellValue: jest.fn(),
    isGroupRow: true,
    getRowLevelKey: jest.fn(),
    filterExpression: [{ columnName: 'name' }],
  },
  plugins: ['FilteringState', 'SearchingState'],
};

jest.mock('@devexpress/dx-grid-core', () => ({
  filteredRows: jest.fn().mockReturnValue([{ id: 0 }, { id: 1 }]),
}));

describe('IntegratedFiltering', () => {
  afterEach(() => {
    filteredRows.mockClear();
  });
  it('should exec filteredRows with correct arguments', () => {
    mount({
      render() {
        return (
          <PluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <IntegratedFiltering />
          </PluginHost>
        );
      },
    });
    expect(filteredRows).toHaveBeenCalledTimes(1);

    expect(filteredRows).toBeCalledWith(
      defaultDeps.getter.rows,
      defaultDeps.getter.filterExpression,
      defaultDeps.getter.getCellValue,
      expect.any(Function),
      defaultDeps.getter.isGroupRow,
      defaultDeps.getter.getRowLevelKey,
    );
  });
});
