import { mount } from '@vue/test-utils';
import { getMessagesFormatter } from '@devexpress/dx-grid-core';
import { DxPluginHost } from '@devexpress/dx-vue-core';
import { PluginDepsToComponents } from './test-utils';
import { DxSearchPanel } from './search-panel';

jest.mock('@devexpress/dx-grid-core', () => ({
  getMessagesFormatter: jest.fn().mockReturnValue(() => { }),
}));

const defaultDeps = {
  plugins: ['DxToolbar', 'DxSearchState', 'DxIntegratedFiltering'],
  getter: {
    searchValue: 'abc',
  },
  action: {
    changeSearchValue: () => { },
  },
  template: {
    toolbarContent: {},
  },
};
const defaultProps = {
  inputComponent: { name: 'InputComponent', render() { return null; } },
};

describe('DxSearchPanel', () => {
  beforeEach(() => {
    getMessagesFormatter.mockImplementation(messages => key => (messages[key] || key));
  });
  it('should pass correct props to inputComponent', () => {
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxSearchPanel
              {...{ attrs: { ...defaultProps } }}
              messages={{ data: '123' }}
            />
          </DxPluginHost>
        );
      },
    });

    const input = tree.find(defaultProps.inputComponent);
    expect(input.vm.$attrs.value).toBe(defaultDeps.getter.searchValue);
    expect(input.vm.$listeners.valueChange).toEqual(expect.any(Function));
    expect(input.vm.$attrs.getMessage).toEqual(expect.any(Function));
  });

  it('should pass correct getMessage prop to containerComponent', () => {
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxSearchPanel
              {...{ attrs: { ...defaultProps } }}
              messages={{
                searchPlaceholder: 'Search…',
              }}
            />
          </DxPluginHost>
        );
      },
    });

    const input = tree.find(defaultProps.inputComponent);
    const { getMessage } = input.vm.$attrs;

    expect(getMessage('searchPlaceholder'))
      .toBe('Search…');
  });
});
