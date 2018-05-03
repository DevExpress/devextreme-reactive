import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import {
  groupRowChecker,
  groupRowLevelKeyGetter,
  groupCollapsedRowsGetter,
  groupedRows,
  expandedGroupRows,
  getColumnExtension,
} from '@devexpress/dx-grid-core';
import { DxPluginHost } from '@devexpress/dx-vue-core';
import { DxIntegratedGrouping } from './integrated-grouping';
import { PluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  groupRowChecker: jest.fn(),
  groupRowLevelKeyGetter: jest.fn(),
  groupCollapsedRowsGetter: jest.fn(),
  groupedRows: jest.fn(),
  expandedGroupRows: jest.fn(),
  getColumnExtension: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 0 }, { id: 1 }],
    grouping: [{ columnName: 'a' }],
    expandedGroups: ['A', 'B'],
    getCellValue: () => { },
  },
  plugins: ['DxGroupingState'],
};

describe('DxIntegratedGrouping', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    groupRowChecker.mockImplementation(() => 'groupRowChecker');
    groupRowLevelKeyGetter.mockImplementation(() => 'groupRowLevelKeyGetter');
    groupCollapsedRowsGetter.mockImplementation(() => 'groupCollapsedRowsGetter');
    groupedRows.mockImplementation(() => 'groupedRows');
    expandedGroupRows.mockImplementation(() => 'expandedGroupRows');
    getColumnExtension.mockImplementation(() => ({}));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide isGroupRow getter', () => {
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxIntegratedGrouping />
          </DxPluginHost >
        );
      },
    });

    expect(getComputedState(tree).isGroupRow)
      .toBe(groupRowChecker);
  });

  it('should provide getRowLevelKey getter', () => {
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxIntegratedGrouping />
          </DxPluginHost >
        );
      },
    });

    expect(getComputedState(tree).getRowLevelKey)
      .toBe(groupRowLevelKeyGetter);
  });

  it('should provide getCollapsedRows getter', () => {
    const deps = {
      getter: {
        getCollapsedRows: () => { },
      },
    };
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={{ ...defaultDeps, ...deps }} />
            <DxIntegratedGrouping />
          </DxPluginHost >
        );
      },
    });

    expect(getComputedState(tree).getCollapsedRows)
      .toBe(groupCollapsedRowsGetter());

    expect(groupCollapsedRowsGetter)
      .toBeCalledWith(deps.getter.getCollapsedRows);
  });

  it('should provide rows getter based on grouping and expandedGroups getters', () => {
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxIntegratedGrouping />
          </DxPluginHost >
        );
      },
    });

    expect(groupedRows)
      .toBeCalledWith(
        defaultDeps.getter.rows,
        defaultDeps.getter.grouping,
        defaultDeps.getter.getCellValue,
        expect.any(Function),
      );

    expect(expandedGroupRows)
      .toBeCalledWith(
        groupedRows(),
        defaultDeps.getter.grouping,
        defaultDeps.getter.expandedGroups,
      );

    expect(getComputedState(tree).rows)
      .toBe(expandedGroupRows());
  });

  it('should provide rows getter based on columnExtensions', () => {
    const columnExtensions = [{ columnName: 'a', criteria: () => { } }];
    mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxIntegratedGrouping
              columnExtensions={columnExtensions}
            />
          </DxPluginHost >
        );
      },
    });

    expect(groupedRows)
      .toBeCalledWith(
        defaultDeps.getter.rows,
        defaultDeps.getter.grouping,
        defaultDeps.getter.getCellValue,
        expect.any(Function),
      );

    groupedRows.mock.calls[0][3]('a');
    expect(getColumnExtension)
      .toBeCalledWith(columnExtensions, 'a');
  });
});
