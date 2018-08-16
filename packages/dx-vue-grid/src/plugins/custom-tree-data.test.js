import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import {
  customTreeRowLevelKeyGetter,
  customTreeRowIdGetter,
  customTreeRowsWithMeta,
  expandedTreeRows,
  collapsedTreeRowsGetter,
  isTreeRowLeafGetter,
  getTreeRowLevelGetter,
  unwrappedCustomTreeRows,
} from '@devexpress/dx-grid-core';
import { DxPluginHost } from '@devexpress/dx-vue-core';
import { PluginDepsToComponents, getComputedState } from './test-utils';
import { DxCustomTreeData } from './custom-tree-data';

jest.mock('@devexpress/dx-grid-core', () => ({
  customTreeRowLevelKeyGetter: jest.fn(),
  customTreeRowIdGetter: jest.fn(),
  customTreeRowsWithMeta: jest.fn(),
  expandedTreeRows: jest.fn(),
  collapsedTreeRowsGetter: jest.fn(),
  isTreeRowLeafGetter: jest.fn(),
  getTreeRowLevelGetter: jest.fn(),
  unwrappedCustomTreeRows: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 0 }, { id: 1 }],
    expandedRowIds: ['A', 'B'],
    getRowId: () => {},
  },
  plugins: ['DxTreeDataState'],
};

const defaultProps = {
  getChildRows: () => {},
};

describe('DxCustomTreeData', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    customTreeRowLevelKeyGetter.mockImplementation(() => 'customTreeRowLevelKeyGetter');
    customTreeRowIdGetter.mockImplementation(() => 'customTreeRowIdGetter');
    customTreeRowsWithMeta.mockImplementation(() => 'customTreeRowsWithMeta');
    expandedTreeRows.mockImplementation(() => 'expandedTreeRows');
    collapsedTreeRowsGetter.mockImplementation(() => 'collapsedTreeRowsGetter');
    isTreeRowLeafGetter.mockImplementation(() => 'isTreeRowLeafGetter');
    getTreeRowLevelGetter.mockImplementation(() => 'getTreeRowLevelGetter');
    unwrappedCustomTreeRows.mockImplementation(() => 'unwrappedCustomTreeRows');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide rows getter based on getRowId and expandedRowIds getters', () => {
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxCustomTreeData
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });

    expect(customTreeRowsWithMeta)
      .toBeCalledWith(
        defaultDeps.getter.rows,
        defaultProps.getChildRows,
      );

    expect(expandedTreeRows)
      .toBeCalledWith(
        customTreeRowsWithMeta(),
        customTreeRowIdGetter(),
        defaultDeps.getter.expandedRowIds,
      );

    expect(unwrappedCustomTreeRows)
      .toBeCalledWith(expandedTreeRows());

    expect(getComputedState(tree).rows)
      .toBe(unwrappedCustomTreeRows());
  });

  it('should provide isTreeRowLeaf getter', () => {
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxCustomTreeData
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });

    expect(isTreeRowLeafGetter)
      .toBeCalledWith(customTreeRowsWithMeta());

    expect(getComputedState(tree).isTreeRowLeaf)
      .toBe(isTreeRowLeafGetter());
  });

  it('should provide getTreeRowLevel getter', () => {
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxCustomTreeData
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });
    expect(getTreeRowLevelGetter)
      .toBeCalledWith(customTreeRowsWithMeta());

    expect(getComputedState(tree).getTreeRowLevel)
      .toBe(getTreeRowLevelGetter());
  });

  it('should provide getRowLevelKey getter', () => {
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxCustomTreeData
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });

    expect(customTreeRowLevelKeyGetter)
      .toBeCalledWith(
        defaultDeps.getter.getRowLevelKey,
        customTreeRowsWithMeta(),
      );

    expect(getComputedState(tree).getRowLevelKey)
      .toBe(customTreeRowLevelKeyGetter());
  });

  it('should provide getRowId getter based on grouped rows', () => {
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxCustomTreeData
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });
    expect(customTreeRowIdGetter)
      .toBeCalledWith(
        defaultDeps.getter.getRowId,
        customTreeRowsWithMeta(),
      );

    expect(getComputedState(tree).getRowId)
      .toBe(customTreeRowIdGetter());
  });

  it('should provide getCollapsedRows getter', () => {
    const deps = {
      getter: {
        getCollapsedRows: () => {},
      },
    };
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} depsOverrides={deps} />
            <DxCustomTreeData
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });

    expect(collapsedTreeRowsGetter)
      .toBeCalledWith(
        deps.getter.getCollapsedRows,
        expandedTreeRows(),
      );

    expect(getComputedState(tree).getCollapsedRows)
      .toBe(collapsedTreeRowsGetter());
  });
});
