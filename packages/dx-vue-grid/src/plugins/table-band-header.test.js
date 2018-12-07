import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { DxPluginHost } from '@devexpress/dx-vue-core';
import { tableRowsWithBands } from '@devexpress/dx-grid-core';
import { DxTableBandHeader } from './table-band-header';
import { PluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableRowsWithBands: jest.fn(),
  isHeadingTableCell: jest.fn(),
  isBandedTableRow: jest.fn(),
  isBandedOrHeaderRow: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableHeaderRows: [],
  },
  plugins: ['DxTable', 'DxTableHeaderRow'],
};

const defaultProps = {
  columnBands: [{
    title: 'Band',
    children: [
      { columnName: 'column1' },
      { columnName: 'column2' },
    ],
  }],
};

describe('DxTableBandHeader', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    tableRowsWithBands.mockImplementation(() => 'tableRowsWithBands');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should extend tableHeaderRows', () => {
    const wrapper = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableBandHeader
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });

    expect(getComputedState(wrapper).tableHeaderRows)
      .toBe('tableRowsWithBands');
    expect(tableRowsWithBands)
      .toBeCalledWith(
        defaultDeps.getter.tableHeaderRows,
        defaultProps.columnBands,
        defaultDeps.getter.tableColumns,
      );
  });
});
