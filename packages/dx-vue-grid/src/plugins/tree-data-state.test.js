import { mount } from '@vue/test-utils';
import { DxPluginHost } from '@devexpress/dx-vue-core';
import { toggleRowExpanded } from '@devexpress/dx-grid-core';
import { DxTreeDataState } from './tree-data-state';
import { PluginDepsToComponents, executeComputedAction, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  toggleRowExpanded: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 1 }],
  },
};

describe('DxTreeDataState', () => {
  beforeEach(() => {
    toggleRowExpanded.mockImplementation(() => []);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide expandedRowIds getter', () => {
    const expandedRowIds = [1];
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTreeDataState
              expandedRowIds={expandedRowIds}
            />
          </DxPluginHost>
        );
      },
    });

    expect(getComputedState(tree).expandedRowIds)
      .toBe(expandedRowIds);
  });

  it('should call toggleRowExpanded', () => {
    const toggleRowExpandedPayload = { expandedRowIds: [2] };
    const toggleRowExpandedValue = 'new ids';

    toggleRowExpanded.mockImplementation(() => toggleRowExpandedValue);
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTreeDataState
              expandedRowIds={[1]}
            />
          </DxPluginHost>
        );
      },
    });

    executeComputedAction(tree, (actions) => {
      actions.toggleRowExpanded(toggleRowExpandedPayload);
    });

    expect(tree.find(DxTreeDataState).emitted()['update:expandedRowIds'][0][0])
      .toBe(toggleRowExpandedValue);
    expect(toggleRowExpanded.mock.calls[0][0])
      .toEqual([1]);
    expect(toggleRowExpanded.mock.calls[0][1])
      .toBe(toggleRowExpandedPayload);
  });
});
