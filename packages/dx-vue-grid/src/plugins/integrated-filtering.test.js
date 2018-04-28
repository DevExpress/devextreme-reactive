import { mount } from '@vue/test-utils';
import { PluginHost } from '@devexpress/dx-vue-core';
import { filteredRows, unwrappedFilteredRows } from '@devexpress/dx-grid-core';
import { DxIntegratedFiltering } from './integrated-filtering';
import { PluginDepsToComponents, getComputedState } from './test-utils';

const defaultDeps = {
  getter: {
    rows: [{ id: 0 }, { id: 1 }],
    filterExpression: [{ columnName: 'a' }],
    getCellValue: () => {},
  },
  plugins: ['DxFilteringState'],
};

jest.mock('@devexpress/dx-grid-core', () => ({
  filteredRows: jest.fn(),
  unwrappedFilteredRows: jest.fn(),
}));

describe('DxIntegratedFiltering', () => {
  beforeEach(() => {
    filteredRows.mockImplementation(() => ({ rows: 'filteredRows' }));
    unwrappedFilteredRows.mockImplementation(() => 'unwrappedFilteredRows');
  });
  afterEach(() => {
    filteredRows.mockClear();
  });
  it('should provide rows getter', () => {
    const tree = mount({
      render() {
        return (
          <PluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxIntegratedFiltering />
          </PluginHost>
        );
      },
    });

    expect(getComputedState(tree).rows)
      .toBe(unwrappedFilteredRows());

    expect(filteredRows)
      .toBeCalledWith(
        defaultDeps.getter.rows,
        defaultDeps.getter.filterExpression,
        defaultDeps.getter.getCellValue,
        expect.any(Function),
      );

    expect(unwrappedFilteredRows)
      .toBeCalledWith(filteredRows());
  });
});
