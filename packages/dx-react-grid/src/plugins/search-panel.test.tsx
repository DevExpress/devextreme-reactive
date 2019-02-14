import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
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
});
