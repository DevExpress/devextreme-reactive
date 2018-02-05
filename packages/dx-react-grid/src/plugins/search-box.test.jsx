import React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from './test-utils';
import { SearchBox } from './search-box';

jest.mock('@devexpress/dx-grid-core', () => ({
  getMessagesFormatter: jest.fn().mockReturnValue(() => {}),
}));

const RootComponent = () => null;

const defaultDeps = {
  plugins: ['Toolbar'],
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
  rootComponent: RootComponent,
};

describe('Searchbox', () => {
  it('should pass correct props to rootComponent', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <SearchBox {...defaultProps} />
      </PluginHost>
    ));
    expect(tree.find(RootComponent).props().searchValue).toBe('abc');
    expect(tree.find(RootComponent).props().changeSearchValue).toEqual(expect.any(Function));
    expect(tree.find(RootComponent).props().getMessage).toEqual(expect.any(Function));
  });
});
