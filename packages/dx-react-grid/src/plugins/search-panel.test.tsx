import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { TOP_POSITION } from '@devexpress/dx-grid-core';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { SearchPanel } from './search-panel';

const Input = () => null;

const defaultDeps = {
  plugins: ['Toolbar', 'SearchState', 'IntegratedFiltering'],
  getter: {
    searchValue: 'abc',
  },
  action: {
    changeSearchValue: () => {},
    scrollToRow: jest.fn(),
    setSearchPanelRef: jest.fn()
  },
  template: {
    toolbarContent: {},
  },
};
const defaultProps = {
  inputComponent: Input,
};

describe('SearchPanel', () => {
  it('should pass correct props to inputComponent', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <SearchPanel {...defaultProps} />
      </PluginHost>
    ));
    expect(tree.find(Input).props().value).toBe('abc');
    expect(tree.find(Input).props().onValueChange).toEqual(expect.any(Function));
    expect(tree.find(Input).props().getMessage).toEqual(expect.any(Function));
  });

  it('should not call scroll up on search if data is not remote', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SearchPanel
          {...defaultProps}
        />
      </PluginHost>
    ));
    tree.find(defaultProps.inputComponent)
      .prop('onValueChange')('a');

    expect(defaultDeps.action.scrollToRow)
      .not.toHaveBeenCalled();
  });

  it('should scroll up on search if data is remote', () => {
    const deps = {
      ...defaultDeps,
      getter: {
        ...defaultDeps.getter,
        isDataRemote: true,
      },
    };
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(deps)}
        <SearchPanel
          {...defaultProps}
        />
      </PluginHost>
    ));
    tree.find(defaultProps.inputComponent)
      .prop('onValueChange')('a');

    expect(deps.action.scrollToRow)
      .toHaveBeenCalledTimes(1);
    expect(deps.action.scrollToRow.mock.calls[0][0])
      .toBe(TOP_POSITION);
  });
});
