import { mount } from '@vue/test-utils';
import { DxPluginHost } from '@devexpress/dx-vue-core';
import { toggleDetailRowExpanded } from '@devexpress/dx-grid-core';
import { DxRowDetailState } from './row-detail-state';
import { PluginDepsToComponents, executeComputedAction, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  toggleDetailRowExpanded: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 1 }],
  },
};

describe('DxRowDetailState', () => {
  beforeEach(() => {
    toggleDetailRowExpanded.mockImplementation(() => []);
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
            <DxRowDetailState
              expandedRowIds={expandedRowIds}
            />
          </DxPluginHost>
        );
      },
    });

    expect(getComputedState(tree).expandedDetailRowIds)
      .toBe(expandedRowIds);
  });

  it('should call toggleDetailRowExpanded', () => {
    const toggleDetailRowExpandedPayload = { expandedRowIds: [2] };
    const toggleDetailRowExpandedValue = 'new ids';

    toggleDetailRowExpanded.mockImplementation(() => toggleDetailRowExpandedValue);
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxRowDetailState
              expandedRowIds={[1]}
            />
          </DxPluginHost>
        );
      },
    });

    executeComputedAction(tree, (actions) => {
      actions.toggleDetailRowExpanded(toggleDetailRowExpandedPayload);
    });

    expect(tree.find(DxRowDetailState).emitted()['update:expandedRowIds'][0][0])
      .toBe(toggleDetailRowExpandedValue);
    expect(toggleDetailRowExpanded.mock.calls[0][0])
      .toEqual([1]);
    expect(toggleDetailRowExpanded.mock.calls[0][1])
      .toBe(toggleDetailRowExpandedPayload);
  });
});
