import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from './test-utils';
import { SearchPanel } from './search-panel';

jest.mock('@devexpress/dx-grid-core', () => ({
  getMessagesFormatter: jest.fn().mockReturnValue(() => {}),
}));

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
  InputComponent: Input,
};

describe('SearchPanel', () => {
  it('should pass correct props to InputComponent', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <SearchPanel {...defaultProps} />
      </PluginHost>
    ));
    expect(tree.find(Input).props().searchValue).toBe('abc');
    expect(tree.find(Input).props().onChangeSearchValue).toEqual(expect.any(Function));
    expect(tree.find(Input).props().getMessage).toEqual(expect.any(Function));
  });
});
