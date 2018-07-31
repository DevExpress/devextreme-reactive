import { mount } from '@vue/test-utils';
import { DxPluginHost } from '@devexpress/dx-vue-core';
import { setupConsole } from '@devexpress/dx-testing';
import { toggleSelection } from '@devexpress/dx-grid-core';
import { PluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';
import { DxSelectionState } from './selection-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  toggleSelection: jest.fn(),
}));

describe('DxSelectionState', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide selection getter', () => {
    const defaultSelection = [1, 2, 3];
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={{}} />
            <DxSelectionState
              selection={defaultSelection}
            />
          </DxPluginHost>
        );
      },
    });

    expect(getComputedState(tree).selection)
      .toBe(defaultSelection);
  });

  it('should call toggleSelection action', () => {
    const defaultSelection = [1, 2, 3];
    const nextSelection = [1, 2];
    const actionPayload = { rowIds: 3 };
    toggleSelection.mockImplementation(() => nextSelection);
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={{}} />
            <DxSelectionState
              selection={defaultSelection}
            />
          </DxPluginHost>
        );
      },
    });

    executeComputedAction(tree, (actions) => {
      actions.toggleSelection(actionPayload);
    });
    expect(tree.find(DxSelectionState).emitted()['update:selection'][0][0]).toBe(nextSelection);

    expect(toggleSelection.mock.calls[0][0])
      .toEqual(defaultSelection);
    expect(toggleSelection.mock.calls[0][1])
      .toEqual(actionPayload);
  });
});
