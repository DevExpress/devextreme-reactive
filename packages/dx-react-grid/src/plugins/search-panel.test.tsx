import * as React from 'react';
import { create } from 'react-test-renderer';
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
    const tree = create((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <SearchPanel {...defaultProps} />
      </PluginHost>
    )).root;
    expect(tree.findByType(Input).props.value).toBe('abc');
    expect(tree.findByType(Input).props.onValueChange).toEqual(expect.any(Function));
    expect(tree.findByType(Input).props.getMessage).toEqual(expect.any(Function));
  });

  it('should not call scroll up on search if data is not remote', () => {
    const tree = create((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SearchPanel
          {...defaultProps}
        />
      </PluginHost>
    ));
    tree.root.findByType(defaultProps.inputComponent).props.onValueChange('a');
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
    const tree = create((
      <PluginHost>
        {pluginDepsToComponents(deps)}
        <SearchPanel
          {...defaultProps}
        />
      </PluginHost>
    ));
    tree.root.findByType(defaultProps.inputComponent).props.onValueChange('a');

    expect(deps.action.scrollToRow)
      .toHaveBeenCalledTimes(1);
    expect(deps.action.scrollToRow.mock.calls[0][0])
      .toBe(TOP_POSITION);
  });
});
