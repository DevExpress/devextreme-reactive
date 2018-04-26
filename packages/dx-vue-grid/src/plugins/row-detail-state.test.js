import { mount } from '@vue/test-utils';
import { PluginHost } from '@devexpress/dx-vue-core';
import { toggleDetailRowExpanded } from '@devexpress/dx-grid-core';
import { RowDetailState } from './row-detail-state';
import { PluginDepsToComponents, executeComputedAction, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  toggleDetailRowExpanded: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 1 }],
  },
};

describe('RowDetailState', () => {
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
          <PluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <RowDetailState expandedRowIds={expandedRowIds} />
          </PluginHost>
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
          <PluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <RowDetailState expandedRowIds={[1]} />
          </PluginHost>
        );
      },
    });

    executeComputedAction(tree, (actions) => {
      actions.toggleDetailRowExpanded(toggleDetailRowExpandedPayload);
    });

    expect(tree.find(RowDetailState).emitted()['update:expandedRowIds'][0][0])
      .toBe(toggleDetailRowExpandedValue);
    expect(toggleDetailRowExpanded.mock.calls[0][0])
      .toEqual([1]);
    expect(toggleDetailRowExpanded.mock.calls[0][1])
      .toBe(toggleDetailRowExpandedPayload);
  });
});
